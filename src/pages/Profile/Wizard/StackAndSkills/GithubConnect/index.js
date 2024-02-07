import { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

import { ReactComponent as GithubIcon } from "images/Social_Github.svg";
import DisconnectGithubConfirmation from "./DisconnectGithubConfirmation";
import useEditing from "hooks/useEditing";
import { disconnectGithub } from "graphql/autoMutations";
import CustomCard from "components/CustomCard";

function GithubConnect({ user, githubRef, className, dispatchUserUpdated }) {
  const [connecting, setConnecting] = useState(false);
  const [confirmGithubDisconnect, setConfirmGithubDisconnect] = useState(false);
  const history = useHistory();
  const isGitHubConnected = user?.socialLinks?.find(
    (ele) => ele.type === "GITHUB"
  );
  const hasOlderToken = user?.githubAccessToken?.startsWith("ghu_");

  const {
    isLoading: disconnecting,
    mutate: disconnectWithGithub,
    resetState: resetEditState,
    mutateError: disconnectError,
    mutateSuccess: disconnectSuccess,
  } = useEditing({}, "", [], disconnectGithub);

  const checkSession = async () => {
    try {
      const session = await Auth.currentSession();

      return session;
    } catch (e) {
      if (e === "No current user") {
        history.push("/login");
      }

      return;
    }
  };

  const connectWithGithub = async () => {
    setConnecting(true);

    const session = await checkSession();
    const jwt = session.getIdToken().getJwtToken();
    const endpoint = process.env.REACT_APP_CONNECT_GITHUB_ENDPOINT;

    const clientId = encodeURIComponent(
      process.env.REACT_APP_CONNECT_GITHUB_CLIENTID
    );

    const shimRedirect = encodeURIComponent(
      process.env.REACT_APP_CONNECT_GITHUB_SHIM_REDIRECT
    );

    const scope = encodeURIComponent("read:user repo user:email");
    const appRedirect = process.env.REACT_APP_CONNECT_GITHUB_APP_REDIRECT;

    const state = window.btoa(
      JSON.stringify({ jwt, redirect_uri: appRedirect })
    );

    const url = `${endpoint}?client_id=${clientId}&redirect_uri=${shimRedirect}&scope=${scope}&response_type=code&state=${state}`;

    window.location.href = url;
  };

  const handleDisconnectWithGithub = () => {
    resetEditState();
    setConfirmGithubDisconnect(true);
  };

  const handleOnClose = async () => {
    if (disconnectSuccess) {
      user.socialLinks = user.socialLinks.filter((l) => l.type !== "GITHUB");
      dispatchUserUpdated(user);
    }
    setConfirmGithubDisconnect(false);
  };

  return (
    <div className={className} ref={githubRef}>
      <div className="flex justify-left mb-24">
        <CustomCard
          label="GitHub"
          title="What data will we use?"
          body={
            "We consolidate stats based on your Top Languages, Issues Created, PR's Submitted, Issue Comments, PR's Reviewed, Commits Pushed, and Repositories Created"
          }
          action={
            isGitHubConnected
              ? "Disconnect your GitHub Account"
              : !hasOlderToken
              ? isGitHubConnected
                ? hasOlderToken
                : "Connect your GitHub Account"
              : "Re-Connect Github"
          }
          onClick={
            !isGitHubConnected ? connectWithGithub : handleDisconnectWithGithub
          }
          disabled={
            (connecting || disconnecting ? true : false) ||
            (!hasOlderToken && isGitHubConnected)
          }
          icon={<GithubIcon />}
        />
      </div>
      {confirmGithubDisconnect && (
        <DisconnectGithubConfirmation
          onClose={handleOnClose}
          onSubmit={disconnectWithGithub}
          isSuccess={disconnectSuccess}
          errorMessage={disconnectError}
        />
      )}
    </div>
  );
}

export default GithubConnect;
