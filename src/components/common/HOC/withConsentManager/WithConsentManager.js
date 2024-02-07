import React from "react";

import ConsentMgrPopup from "components/ConsentMgr";

function WithConsentManager({ children }) {
  return (
    <>
      {children}

      <ConsentMgrPopup
        bannerAsModal
        defaultDestinationBehavior="enable"
        initalPreferences={{ Functional: true }}
      />
    </>
  );
}

export default WithConsentManager;
