import { useEffect, useState } from "react";
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import UtilsLib from "utils/lib";
import SelfProfile from "pages/Profile/Self";
import ForgotPassword from "pages/Auth/ForgotPassword";
import PublicProfile from "pages/Profile/Public";
import LogIn from "pages/Auth/Login";
import VerificationCode from "pages/Auth/VerificationCode";
import SignUp from "pages/Auth/Signup";
import Wizard from "pages/Profile/Wizard";
import CustomerWizard from "pages/Profile/CustomerWizard";
import Generic404Page from "pages/Generic404Page";
import MissingInfo from "pages/MissingInfo";
import { REFERRAL_TYPES, USER_TYPES } from "lookup";
import { AuthProvider, useAuth } from "./GlobalAuthContext";
import Logo from "images/logo-no-beta.png";
import NoUserFound from "pages/Profile/NoUserFound";
import JobsList from "pages/Jobs/List";
import JobsSingle from "pages/Jobs/Single";
import PaymentInfo from "pages/PaymentInfo";
import ListJobOpps from "pages/Jobs/Opportunities/Listing";
import CreateEditJobOpps from "pages/Jobs/Opportunities/CreateEdit";
import JobsPreview from "pages/Jobs/Opportunities/Preview";
import JobsSaved from "pages/Jobs/Opportunities/Saved";
import JobsConfirmation from "pages/Jobs/Opportunities/Confirmation";
import JobsDeleted from "pages/Jobs/Opportunities/Deleted";
import JobsMatches from "pages/Jobs/Matches";
import MatchedJob from "pages/Jobs/Matches/MatchedJob";
import WithConsentManager from "components/common/HOC/withConsentManager";
import ApplicationsReview from "pages/Jobs/ApplicantReview";
import Settings from "pages/Settings";
import GithubReConnect from "pages/GithubReconnect";
import MatchList from "pages/Jobs/Opportunities/MatchList";
import Finalists from "pages/Jobs/Finalist";

/**
 * Component that displays loading indicator
 * Meant to be used for when authentication state is being determined
 */
function LoadingPage() {
  return (
    <div className="flex pt-24">
      <div className="m-auto">
        <div className="animate-pulse">
          <img src={Logo} alt="logo" width="188" height="auto" />
        </div>
      </div>
    </div>
  );
}

/**
 * Component that redirects to custom domain
 */
function LandingPage() {
  window.location.href = "https://www.torc.dev/";
  return null;
}

function JobReferralRedirect({
  jobId,
  jobReferrerCode,
  loggedUserReferralCode,
}) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (jobReferrerCode !== loggedUserReferralCode) {
        await UtilsLib.Referral.createRecord({
          jobOpportunityId: jobId,
          jobReferrerCode,
          referralType: REFERRAL_TYPES.JOB,
        });
      }

      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) {
    return <Redirect to={`/jobs/matches/${jobId}`} />;
  }

  return <LoadingPage />;
}

function UserReferralRedirect({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      await UtilsLib.Referral.createRecord({
        referralType: REFERRAL_TYPES.USER,
      });
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) {
    return children;
  }

  return <LoadingPage />;
}

/**
 * <Route /> component, but overridden to:
 * - only allow users that are authenticated to access the path
 * - display loading indicator while auth state is determined
 */
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  // If the app is still determining the auth state of the user
  // OR
  // If the app received information from pre sign in / sign up phase
  // and we are still processing that info
  // => Show loading indicator
  if (auth.isLoading || auth.oAuthCustomState) {
    return <LoadingPage />;
  }

  // These fields are currently required before user
  // can start using the app
  // So - if user visits any route, redirect them back to
  // the page where they can provide this info
  const promptForRequiredFields = (location) => {
    if (location.pathname !== "/more-info-needed") {
      if (auth.user.userType === USER_TYPES.UNKNOWN) {
        return true;
      }

      if (!auth.user.username) {
        return true;
      }
    }

    return false;
  };

  // We have switched from Github App to Github Oauth
  // This function checks for tokens from Github App
  // and instructs that user be prompted to re-connect their github
  // accounts to Github Oauth instead
  const promptForGithubReconnect = (location) => {
    if (location.pathname !== "/github-reconnect") {
      // Github App tokens start with ghu_ whereas oauth starts with gho_
      if (auth.user.githubAccessToken?.startsWith("ghu_")) {
        // Have we reminded the user before?
        const reminder = localStorage.getItem("github_reconnect");

        if (reminder) {
          try {
            const { expiresIn } = JSON.parse(reminder);

            if (new Date(expiresIn) < new Date()) {
              localStorage.removeItem("github_reconnect");
              return true;
            }
          } catch (error) {
            // Looks like the data may not be in the right format. Reset and prompt
            localStorage.removeItem("github_reconnect");

            return true;
          }
        } else {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (auth.user) {
          if (promptForRequiredFields(location)) {
            return (
              <Redirect
                to={{
                  pathname: "/more-info-needed",
                }}
              />
            );
          } else if (promptForGithubReconnect(location)) {
            return (
              <Redirect
                to={{
                  pathname: "/github-reconnect",
                }}
              />
            );
          }
          const jobReferral = localStorage.getItem("jobReferral");
          if (
            jobReferral &&
            auth.user.userType === USER_TYPES.FREELANCER &&
            auth.user.username
          ) {
            try {
              const jsonReferral = JSON.parse(jobReferral);
              const { jobId, jobReferrerCode } = jsonReferral;
              if (jobId && jobReferrerCode) {
                return (
                  <JobReferralRedirect
                    jobId={jobId}
                    jobReferrerCode={jobReferrerCode}
                    loggedUserReferralCode={auth.user.referralCode}
                  />
                );
              }
            } catch (err) {
              console.log("invalid jobReferral format");
            }
          }

          const userReferral = localStorage.getItem("userReferral");
          if (userReferral && auth.user.username) {
            return <UserReferralRedirect>{children}</UserReferralRedirect>;
          }
          return children;
        }

        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { retUrl: location },
            }}
          />
        );
      }}
    />
  );
}

/**
 * <Route /> component, but overridden to:
 * - only allow users that are not authenticated to access the path
 * - display loading indicator while auth state is determined
 */
function PublicRouteOnly({ children, ...rest }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <LoadingPage />;
  }

  return (
    <Route
      {...rest}
      render={({ match }) => {
        if (auth.user) {
          if (
            auth.user.userType === USER_TYPES.FREELANCER &&
            auth.user.username
          ) {
            const { params, path } = match || {};
            if (
              path.startsWith("/j/") &&
              params?.jobId &&
              params?.referralCode
            ) {
              return (
                <JobReferralRedirect
                  jobId={params.jobId}
                  jobReferrerCode={params.referralCode}
                  loggedUserReferralCode={auth.user?.referralCode}
                />
              );
            }
          }
          return (
            <Redirect
              to={{
                pathname: "/dashboard",
              }}
            />
          );
        }
        return children;
      }}
    />
  );
}

/**
 * <Route /> component, but overriden to:
 * - display loading indicator while auth state is determined
 */
function OverriddenRoute({ children, ...rest }) {
  const auth = useAuth();

  if (auth.isLoading) {
    return <LoadingPage />;
  }

  return <Route {...rest} render={() => children} />;
}

/**
 * <ScrollToTop /> component - that scrolls the window to the top
 * each time the route changes
 */
function ScrollToTop(props) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
}

// handle referral redirect from shared job link or referral link
function ReferralRedirect() {
  const { referralCode, referralSource, jobId } = useParams();
  if (referralCode) {
    const referralParams = {};
    if (jobId) {
      referralParams.jobId = jobId;
      referralParams.jobReferrerCode = referralCode;
      localStorage.setItem("jobReferral", JSON.stringify(referralParams));
    } else {
      referralParams.userReferrerCode = referralCode;
      localStorage.setItem("userReferral", JSON.stringify(referralParams));
    }
  }

  return (
    <Redirect
      to={`/signup?referralCode=${referralCode}${
        referralSource ? `&refSource=${referralSource}` : ""
      }${jobId && referralCode ? `&type=freelancer` : ""}`}
    />
  );
}

/**
 * The main Router component
 */
function Main() {
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    const loadingScreen = document?.getElementById("loading_screen");
    if (loadingScreen) {
      //added the if condition for local development, where there's a bug that can happen
      //where it will re-run this block of code despite the fact that react has already removed this element
      document?.body?.removeChild(loadingScreen);
    }
    setPageLoaded(true);
  }, []);

  if (!pageLoaded) {
    return null;
  }

  return (
    <>
      {process.env.REACT_APP_BLOCK_WEB_CRAWLERS === "true" && (
        <Helmet>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
      )}
      <AuthProvider>
        <HashRouter>
          <ScrollToTop>
            <WithConsentManager>
              <Switch>
                {/* Only accessible to non authenticated users */}
                <PublicRouteOnly path="/login" exact>
                  <LogIn />
                </PublicRouteOnly>
                <PublicRouteOnly path="/signup" exact>
                  <SignUp />
                </PublicRouteOnly>
                <PublicRouteOnly path="/r/:referralCode/:referralSource" exact>
                  <ReferralRedirect />
                </PublicRouteOnly>
                <PublicRouteOnly
                  path="/j/:jobId/:referralCode/:referralSource"
                  exact
                >
                  <ReferralRedirect />
                </PublicRouteOnly>

                <PublicRouteOnly path="/forgot-password" exact>
                  <ForgotPassword />
                </PublicRouteOnly>

                {/* Only accessible to authenticated users */}

                {/* these are the routes to redirect to the dashboard */}
                <PrivateRoute path="/" exact>
                  <Redirect to="/dashboard" />
                </PrivateRoute>
                <PrivateRoute path="/profile" exact>
                  <Redirect to="/dashboard" />
                </PrivateRoute>
                <PrivateRoute path="/dash" exact>
                  <Redirect to="/dashboard" />
                </PrivateRoute>
                <PrivateRoute path="/dashboard" exact>
                  <SelfProfile />
                </PrivateRoute>

                <PrivateRoute path="/profile/wizard/:stepNumber" exact>
                  <Wizard />
                </PrivateRoute>
                <PrivateRoute path="/profile/customer/wizard/:stepNumber" exact>
                  <CustomerWizard />
                </PrivateRoute>
                <PrivateRoute path="/more-info-needed" exact>
                  <MissingInfo />
                </PrivateRoute>
                <PrivateRoute path="/payments" exact>
                  <PaymentInfo />
                </PrivateRoute>

                <PrivateRoute path="/jobs/matches" exact>
                  <JobsMatches />
                </PrivateRoute>
                <PrivateRoute path="/jobs/matches/:id" exact>
                  <MatchedJob />
                </PrivateRoute>
                <PrivateRoute path="/jobs/opportunities/create" exact>
                  <CreateEditJobOpps />
                </PrivateRoute>
                <PrivateRoute path="/jobs/opportunities/:id/edit" exact>
                  <CreateEditJobOpps />
                </PrivateRoute>
                <PrivateRoute
                  path={[
                    "/jobs/opportunities/:id/saved",
                    "/jobs/opportunities/saved",
                  ]}
                  exact
                >
                  <JobsSaved />
                </PrivateRoute>
                <PrivateRoute
                  path={[
                    "/jobs/opportunities/deleted",
                    "/jobs/opportunities/:id/deleted",
                  ]}
                  exact
                >
                  <JobsDeleted />
                </PrivateRoute>
                <PrivateRoute path="/jobs/opportunities/:id/confirmation" exact>
                  <JobsConfirmation />
                </PrivateRoute>
                <PrivateRoute path="/jobs/opportunities/:id/preview" exact>
                  <JobsPreview />
                </PrivateRoute>

                <PrivateRoute path="/jobs/opportunities" exact>
                  <ListJobOpps />
                </PrivateRoute>
                <PrivateRoute path="/jobs/applications/:jobId">
                  <ApplicationsReview />
                </PrivateRoute>
                <PrivateRoute path="/jobs/:jobId/matches">
                  <MatchList />
                </PrivateRoute>
                <PrivateRoute path="/settings">
                  <Settings />
                </PrivateRoute>
                <PrivateRoute path="/github-reconnect">
                  <GithubReConnect />
                </PrivateRoute>
                <PrivateRoute path="/jobs/finalists/:jobId">
                  <Finalists />
                </PrivateRoute>
                <PrivateRoute path="/jobs/calibrations/:jobId">
                  <Finalists isCalibration />
                </PrivateRoute>

                {/* Accessible to both authenticated and non authenticated users */}
                <OverriddenRoute path="/nouserfound/:username" exact>
                  <NoUserFound />
                </OverriddenRoute>
                <OverriddenRoute path="/verification" exact>
                  <VerificationCode />
                </OverriddenRoute>
                <OverriddenRoute path="/profile/:username" exact>
                  <PublicProfile />
                </OverriddenRoute>
                <OverriddenRoute path="/NotFound">
                  <Generic404Page />
                </OverriddenRoute>
                <OverriddenRoute path="/www" exact>
                  <LandingPage />
                </OverriddenRoute>
                <OverriddenRoute path="/jobs" exact>
                  <Redirect to="/jobs/roles" />
                </OverriddenRoute>
                <OverriddenRoute path="/jobs/roles/:jobId" exact>
                  <JobsSingle />
                </OverriddenRoute>
                <OverriddenRoute path="/jobs/roles" exact>
                  <JobsList />
                </OverriddenRoute>

                {/* Catch 'em all! */}
                <Redirect to="/NotFound" />
              </Switch>
            </WithConsentManager>
          </ScrollToTop>
        </HashRouter>
      </AuthProvider>
    </>
  );
}

export default Main;
