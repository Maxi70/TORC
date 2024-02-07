/**
 * Global auth context - provides the authorization state of the current user for the entire app
 * !IMPORTANT
 * - All updates to the currently authenticated user should be handled by this context. Exported functions:
 * - `useAuthDispatch()` provides the context to dispatch action types, that will change the state of the authenticated user
 * - `useAuth()` provides the context about the authenticated user. This return:
 *    - isLoading => (Boolean) Are we still determining the current authentication state of the user? `true` is yes, `false` otherwise
 *    - user => (Object) If user is authenticated, this will contain an object with different keys and values. Otherwise this is `null`
 *   other attributes are also present in the state but that need not be of concern to the hook subscribers
 */

import { createContext, useReducer, useContext, useEffect } from "react";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { getMe } from "graphql/queries";
import {
  GLOBAL_AUTH_ACTION_TYPES,
  OAUTH_CUSTOM_STATE_TYPES,
  USER_TYPES,
} from "lookup";
import { updateUser } from "graphql/mutations";

// Handles the auth state
const AuthContext = createContext(null);
// Handles the updates to the auth state
const AuthDispatchContext = createContext(null);

// Determine if a user is currently logged in
async function detectLoggedInUser() {
  try {
    const loggedInUser = await API.graphql(graphqlOperation(getMe));

    return loggedInUser.data.getMe;
  } catch (e) {
    // No user is logged in - nothing to do
    return null;
  }
}

// Reducer for the auth state manangement
function authReducer(state, action) {
  switch (action.type) {
    // When the app loads / when user refreshes the page
    // this is the first event fired
    // Here, we set the current authentication state of the user
    case GLOBAL_AUTH_ACTION_TYPES.APP_INITIALIZED:
      return {
        ...state,
        isLoading: false,
        user: action.user,
      };

    // When user signs in, this event fires
    // Here, we are storing the details of the signed in user
    case GLOBAL_AUTH_ACTION_TYPES.USER_SIGNEDIN:
      return {
        ...state,
        user: action.user,
      };

    // When user signs out, this event fires
    // Here we are clearing the details of the user
    case GLOBAL_AUTH_ACTION_TYPES.USER_SIGNEDOUT:
      return {
        ...state,
        user: null,
      };

    // If any component updates the user details, this event fires
    // It basically updates the entire user object
    case GLOBAL_AUTH_ACTION_TYPES.USER_UPDATED:
      return {
        ...state,
        user: action.user,
      };

    // If user signed up through social account, this event fires
    // AFTER the user has logged in, and if we have details to pass
    // from BEFORE sign in / sign up to AFTER login (example - the user type selected during sign up)
    case GLOBAL_AUTH_ACTION_TYPES.OAUTH_CUSTOM_STATE:
      return {
        ...state,
        oAuthCustomState: action.oAuthCustomState,
      };

    // When the required attributes (user type, username and referrer code) are updated, this event fires
    case GLOBAL_AUTH_ACTION_TYPES.SET_REQUIRED_ATTRIBUTES:
      const updatedState = {};
      if (action.userType) {
        updatedState.userType = action.userType;
      }
      if (action.username) {
        updatedState.username = action.username;
      }
      if (action.referrerCode) {
        updatedState.referrerCode = action.referrerCode;
      }
      if (action.agreedToTerms) {
        updatedState.agreedToTerms = action.agreedToTerms;
      }
      if (action.agreedToMarketing) {
        updatedState.agreedToMarketing = action.agreedToMarketing;
      }
      if (action?.location) {
        updatedState.location = action.location;
      }
      if (action?.company) {
        updatedState.company = action?.companyDetails?.name || action?.company;
      }
      return {
        ...state,
        user: {
          ...state.user,
          ...updatedState,
        },
        oAuthCustomState: null,
      };
    default:
      throw new Error(`Unknown global auth action type: ${action.type}`);
  }
}

const INITIAL_AUTH_STATE = {
  isLoading: true,
  user: null,
  oAuthCustomState: null,
};

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

// Context provider, that encapsulates all routes
export function AuthProvider({ children }) {
  const [authentication, dispatch] = useReducer(
    authReducer,
    INITIAL_AUTH_STATE
  );

  // Function to handle changes to the auth state
  const handleAuthChanges = async ({ payload: { event, data } }) => {
    switch (event) {
      case "signIn":
        const user = await detectLoggedInUser();

        dispatch({
          type: GLOBAL_AUTH_ACTION_TYPES.USER_SIGNEDIN,
          user,
        });
        break;
      case "signOut":
      case "oAuthSignOut":
        dispatch({
          type: GLOBAL_AUTH_ACTION_TYPES.USER_SIGNEDOUT,
        });
        break;
      case "customOAuthState":
        // This happens when user signs in through social account
        // If there is any information we need to pass from the before sign in / sign up state
        // to after login state, this is it.
        // The api used to sign in / sign up through social does not allow for any additional
        // values to be passed during sign up / sign in, and thus we use `customOAuthState`
        // to transfer these values to the post login state, where the app can process it
        // We cannot process this immediately though - the details of the logged in user
        // may not yet be available. So we dispatch this event - and handle it later
        // in a useEffect() function further ahead
        dispatch({
          type: GLOBAL_AUTH_ACTION_TYPES.OAUTH_CUSTOM_STATE,
          oAuthCustomState: data,
        });
        break;
      default: {
        console.log("Unknown amplify hub event", event, data);
      }
    }
  };

  // This function processes the information passed BEFORE sign in / sign up
  //
  const handleCustomOAuthState = async () => {
    let action;
    const { user, oAuthCustomState } = authentication;

    try {
      action = JSON.parse(oAuthCustomState);
    } catch (e) {
      console.log("Error parsing custom oauth state", e);
      return;
    }

    // First - is there a user type already set
    if (user.userType && user.userType !== USER_TYPES.UNKNOWN) {
      // User type is alreay set. Nothing to do
      dispatch({
        type: GLOBAL_AUTH_ACTION_TYPES.SET_REQUIRED_ATTRIBUTES,
        userType: action.payload.userType,
      });
    }

    if (action.type === OAUTH_CUSTOM_STATE_TYPES.SET_USER_TYPE) {
      // We have received the selected user type - update the user detail
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: user.id,
            userType: action.payload.userType,
          },
        })
      );

      dispatch({
        type: GLOBAL_AUTH_ACTION_TYPES.SET_REQUIRED_ATTRIBUTES,
        userType: action.payload.userType,
      });

      return action.payload.userType;
    } else {
      // The <PrivateRoute /> should handle this scenario - it should redirect to user type selection page
      // Why so?
      // We have login and signup pages. In both, user can login / signup through social
      // but in both cases, we have the same api call `federatedSignIn()`, which signs up the user
      // if they didn't previously.
      // This means, that in the login page, even if user has not signed up earlier, they can simply
      // login using social and are signed up + logged in
      // Now - while sign up page has a step prior to sign up, where user needs to select user type,
      // login page has no such step.
      // Thus, if user uses sign up page to sign up using social, the IF condition handles storing the
      // user type of the user in the db
      // but if user uses login page to signs up using social - we have to prompt the user after sign in
      // to select the user type... <PrivateRoute /> redirects to the page containing the prompt
    }
  };

  // On app load, proceed to determine if we have a user that is logged in
  useEffect(() => {
    (async () => {
      const user = await detectLoggedInUser();

      dispatch({
        type: GLOBAL_AUTH_ACTION_TYPES.APP_INITIALIZED,
        user,
      });
    })();

    // Setup an auth state change listener, to capture events from amplify
    Hub.listen("auth", handleAuthChanges);

    return () => {
      Hub.remove("auth", handleAuthChanges);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When there is a custom oauth state as well as logged in user info
  // we need to process the oauth state
  useEffect(() => {
    let { user, oAuthCustomState } = authentication;

    if (!user || !oAuthCustomState) {
      return;
    }

    (async () => {
      await handleCustomOAuthState();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authentication]);

  return (
    <AuthContext.Provider value={authentication}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
