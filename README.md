![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopentorc%2Fupptime%2Fmaster%2Fapi%2Fplatform%2Fuptime.json)
![Uptime](https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fopentorc%2Fupptime%2Fmaster%2Fapi%2Fplatform%2Fresponse-time.json)

# Getting Started

### `npm i`

Note had to install consent manager with this command

### `npm install --legacy-peer-deps @segment/consent-manager`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will also see any lint errors in the console

### Environment Variables

Following environment variables need to be set (only if you intend to use the following features)

- Connect Github Account
- Sign Up / Sign In with Github
- Setting profile and cover photo features

```js
REACT_APP_GITHUB_PROVIDER_NAME; // Provider Name of the Github based OpenID Connect in Cognito
REACT_APP_CLOUDINARY_UPLOAD_PRESET; // The Cloudinary upload preset
REACT_APP_CLOUDINARY_CLOUDNAME; // The Cloudinary cloud name to work with
REACT_APP_CONNECT_GITHUB_ENDPOINT; // The OIDC Shim endpoint
REACT_APP_CONNECT_GITHUB_CLIENTID; // The Client id of the Github App
REACT_APP_CONNECT_GITHUB_SHIM_REDIRECT; // The Redirect URL for the OIDC Shim to redirect to
// after successfully connecting the github account
REACT_APP_CONNECT_GITHUB_APP_REDIRECT; // The Redirect URL for the Github App to redirect to after successful authorization
REACT_APP_APPLY_JOB_ZAPIER_HOOK; // The zapier webhook called when user applies to a job
REACT_APP_PAYMENT_RAILS_ENDPOINT; // The aws api endpoint for creating payment rails URLs
REACT_APP_COGNITO_PAYMENTS_GROUP; // The group of users that are allowed to access payments page
REACT_APP_COGNITO_CUSTOMER_JOB_APPROVED_GROUP; // The group of users that are allowed to access the job opportunities page(s)
REACT_APP_STORYBLOK_API_KEY; //the api key for fetching storybloks api
REACT_APP_COGNITO_ADMIN_GROUP; //Cognito admin group
REACT_APP_COGNITO_GROUP_USER_MANAGERS; //Cognito user management group that can access hidden profiles
REACT_APP_COGNITO_GROUP_JOB_MANAGERS; //Cognito job management group that can administer jobs on customers' behalf
REACT_APP_ALGOLIA_APP_ID;
REACT_APP_ALGOLIA_API_KEY;
REACT_APP_ALGOLIA_INDEX_NAME;
```

### AWS config file

Generate the aws-exports.js file by running amplify push in the platform-id repository...
If you have not set this project locally, then request for the aws-exports.js file from the admins.

# Below this is stuff out of the default

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).
