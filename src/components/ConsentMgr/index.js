import React from "react";
import { ConsentManager } from "@segment/consent-manager";

const termsURL = "https://www.torc.dev/cookie-policy";

const CloseBehavior = [{ ACCEPT: "accept" }, { DENY: "deny" }];

const bannerContent = (
  <span>
    We use cookies (and other similar technologies) to collect data to improve
    your experience on our site.
    <br />
    By using our website, you’re agreeing to the collection of data as described
    in our{" "}
    <a href={termsURL} target="_blank" rel="noopener noreferrer">
      Cookie Policy
    </a>
    .
  </span>
);
const bannerSubContent = "You can manage your preferences here!";
const bannerActionsBlock = ({ acceptAll, denyAll }) => (
  <div>
    <button
      className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      type="button"
      onClick={acceptAll}
      id="AllowAll"
    >
      Allow all
    </button>{" "}
    <button
      className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      type="button"
      onClick={denyAll}
      id="DenyAll"
    >
      Deny all
    </button>
  </div>
);
const preferencesDialogTitle = "Website Cookie Preferences";
const preferencesDialogContent = (
  <div>
    <p>
      Torc uses data collected by cookies and JavaScript libraries to improve
      your browsing experience, analyze site traffic, deliver personalized
      advertisements, and increase the overall performance of our site.
    </p>
    <p>
      By using our website, you’re agreeing to our{" "}
      <a href={termsURL} target="_blank" rel="noopener noreferrer">
        Cookie Policy
      </a>
      .
    </p>
    <p>
      The table below outlines how we use this data by category. To opt out of a
      category of data collection, select “No” and save your preferences.
    </p>
  </div>
);
const cancelDialogTitle = "Are you sure you want to cancel?";
const cancelDialogContent = (
  <div>
    Your preferences have not been saved. By continuing to use our website,
    you’re agreeing to our{" "}
    <a href={termsURL} target="_blank" rel="noopener noreferrer">
      Website Data Collection Policy
    </a>
    .
  </div>
);

const ConsentMgrPopup = (props) => {
  return (
    <div className="flex items-center justify-center">
      <ConsentManager
        writeKey="YEvefF0kjbIVyROFyEZ5QQZMNgWWwKgH"
        bannerContent={bannerContent}
        bannerSubContent={bannerSubContent}
        bannerActionsBlock={bannerActionsBlock}
        bannerHideCloseButton={props.bannerHideCloseButton}
        preferencesDialogTitle={preferencesDialogTitle}
        preferencesDialogContent={preferencesDialogContent}
        cancelDialogTitle={cancelDialogTitle}
        cancelDialogContent={cancelDialogContent}
        closeBehavior={CloseBehavior.ACCEPT}
        bannerAsModal={props.bannerAsModal}
        defaultDestinationBehavior="imply"
      />
    </div>
  );
};

export default ConsentMgrPopup;
