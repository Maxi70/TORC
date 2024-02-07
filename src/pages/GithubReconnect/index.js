import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import Header from "components/Header";
import githubIcon from "images/github_icon.png";
import { useAuth } from "GlobalAuthContext";

function GithubReConnect() {
  const [connecting, setConnecting] = useState(false);
  const history = useHistory();

  const auth = useAuth();
  const hasOlderToken = auth?.user?.githubAccessToken?.startsWith("ghu_");

  if (!hasOlderToken) {
    history.push("/");

    return null;
  }

  const connectWithGithub = async () => {
    let session;
    try {
      session = await Auth.currentSession();
    } catch (e) {
      if (e === "No current user") {
        history.push("/login");
      }

      return;
    }

    setConnecting(true);

    const jwt = session.getIdToken().getJwtToken();

    const endpoint = process.env.REACT_APP_CONNECT_GITHUB_ENDPOINT;
    const clientId = encodeURIComponent(
      process.env.REACT_APP_CONNECT_GITHUB_CLIENTID
    );
    const shimRedirect = encodeURIComponent(
      process.env.REACT_APP_CONNECT_GITHUB_SHIM_REDIRECT
    );
    const scope = encodeURIComponent("read:user repo user:email");
    const appRedirect =
      new URL(process.env.REACT_APP_CONNECT_GITHUB_APP_REDIRECT).origin + "/#/";
    const state = window.btoa(
      JSON.stringify({ jwt, redirect_uri: appRedirect })
    );
    const url = `${endpoint}?client_id=${clientId}&redirect_uri=${shimRedirect}&scope=${scope}&response_type=code&state=${state}`;
    window.location.href = url;
  };

  const skipForNow = () => {
    const today = new Date();
    localStorage.setItem(
      "github_reconnect",
      JSON.stringify({
        expiresIn: today.setDate(today.getDate() + 7),
      })
    );

    history.push("/");
  };

  return (
    <>
      <Header
        backgroundStyle={{
          background: "linear-gradient(135deg, #E5AB8E 0%, #F4D675 100%)",
        }}
      />
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <h3 className="text-blue-800 font-nexa text-xl md:text-2xl mb-4">
          Re-Connect your Github
        </h3>

        <p className="font-rubik-regular leading-relaxed tracking-wider max-w-2xl mx-auto">
          We changed the way we access your Github data - our app permissions
          are no longer broad in scope and contain only those permission scopes
          that we need to crunch insights for you.
          <br />
          <br />
          We thus require you to accept these new permissions to allow us to
          continue to generate the latest statistics for your profile and
          improve the appeal of your profile to potential recruiters.
        </p>

        <div className="mt-10 mb-10">
          <button
            className={classNames(
              styles.githubConnect,
              "flex items-center justify-center w-full",
              connecting ? "animation-pulse" : ""
            )}
            onClick={connectWithGithub}
            disabled={connecting ? true : false}
          >
            <img alt="github" src={githubIcon} />
            <div className="font-rubik-regular ml-4">Re-Connect Github</div>
          </button>
        </div>

        <div className="mt-8 flex justify-center flex-col items-center">
          <button
            className="text-electricBlue-500 font-rubik-regular font-bold text-sm hover:opacity-75 focus:opacity-75 mb-2"
            onClick={skipForNow}
          >
            Skip for now
          </button>
        </div>
      </div>
    </>
  );
}

export default GithubReConnect;
