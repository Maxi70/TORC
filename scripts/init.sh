#!/bin/bash
set -e
IFS='|'

# source .env


REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
AWSCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"accessKeyId\":\"${AWS_KEY}\",\
\"secretAccessKey\":\"${AWS_KEY_SECRET}\",\
\"region\":\"${AWS_REGION}\",\
\"AmplifyAppId\":\"${AWS_APP_ID}\"\
}"
AMPLIFY="{\
\"projectName\": \"platform-frontend\",\
\"envName\":\"${USER_BRANCH}\",\
\"appId\":\"${AWS_APP_ID}\"\
}"
PROVIDERS="{\
\"awscloudformation\":${AWSCONFIG}\
}"
AUTHCONFIG="{\
\"googleClientId\":\"${AMPLIFY_GOOGLE_CLIENT_ID}\",\
\"googleAppIdUserPool\":\"${AMPLIFY_GOOGLE_CLIENT_ID}\",\
\"googleAppSecretUserPool\":\"${AMPLIFY_GOOGLE_CLIENT_SECRET}\",\
\"userPoolId\": \"${AMPLIFY_USERPOOL_ID}\",\
\"webClientId\": \"${AMPLIFY_WEBCLIENT_ID}\",\
\"nativeClientId\": \"${AMPLIFY_NATIVECLIENT_ID}\",\
\"identityPoolId\": \"${AMPLIFY_IDENTITYPOOL_ID}\"\
}"
CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCONFIG\
}"

echo $AMPLIFY
echo $FRONTEND
echo $PROVIDERS
echo $CATEGORIES

amplify --version

# amplify init \
# --amplify $AMPLIFY \
# --frontend $FRONTEND \
# --categories $CATEGORIES \
# --yes
echo "###########################################################"
echo "executing amplify pull --amplify $AMPLIFY --frontend $FRONTEND --providers $PROVIDERS --categories $CATEGORIES --yes"

amplify pull \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--categories $CATEGORIES \
--yes

cat src/aws-exports.js