#!/bin/bash

echo "###########################################################"
echo "copying .npmrc file to home dir"
cp .npmrc ~

echo "###########################################################"
echo "installing amplify"
npm install -g @aws-amplify/cli --unsafe-perm=true --allow-root

export AWS_REGION=${AWSREGION}
export AWS_ACCESS_KEY_ID=${AWS_KEY}
export AWS_SECRET_ACCESS_KEY=${AWS_KEY_SECRET}

echo "###########################################################"
echo "installing config wrapper CLI"
npm i -g @opentorc/config-wrapper

echo "###########################################################"
echo "importing amplify environment"

echo "build environment param 1: $1"

environment=$1

if [[ "$environment" != "staging" ]] && [[ "$environment" != "master" ]] && [[ "$environment" != "demo" ]]
then
  environment="develop"
fi

if [[ "$environment" == "master" ]] 
then
  environment="production"
fi

echo "pulling environment: $environment"

config-wrapper saveParamsFile -o .env -e $environment -s frontend
set -o allexport; source .env; set +o allexport
cat .env

config-wrapper saveParamsFile -o .env_common -e $environment -s common
set -o allexport; source .env_common; set +o allexport
cat .env_common

echo "###########################################################"
echo "current env"
env

echo "###########################################################"
echo "Setting up web crawler instructions (robots.txt)"
if [[ "$REACT_APP_BLOCK_WEB_CRAWLERS" == "true" ]]; then
  cp "src/robots.block.txt" "public/robots.txt"
  echo "Copied robots.block.txt"
fi

echo "###########################################################"
echo "installing deps via npm"
npm i --legacy-peer-deps

echo "###########################################################"
echo "intializing amplify config"
./scripts/init.sh
pwd 
ls -al
ls -al src
rm .env
rm .env_common


echo "###########################################################"
echo "running app build"
npm run build
