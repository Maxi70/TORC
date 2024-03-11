// Adds the rounded shape + the purple end matter to the end of your page.

import { /*Link,*/ Redirect } from "react-router-dom";
// import Button from "components/FormComponents/Button";
import { useCallback, useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export default function JobPageWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [cognitoGroups, setCognitoGroups] = useState([]);

  const canUserAccessJobOpps = useCallback(() => {
    return cognitoGroups.includes(
      process.env.REACT_APP_COGNITO_CUSTOMER_JOB_APPROVED_GROUP
    );
  }, [cognitoGroups]);

  // Fetch groups the logged in user belongs to
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const auth = await Auth.currentSession();

        const groups = auth.getAccessToken().payload["cognito:groups"] || [];

        if (isMounted) {
          setCognitoGroups(groups);
          setLoading(false);
        }
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return null;
  } else if (!canUserAccessJobOpps()) {
    return <Redirect to="/NotFound" />;
  }

  return (
    // <div style={{ background: `#6321be` }}>
    <div>
      <div className="w-full relative">
        <div
          className="absolute top-0 left-0 w-full bg-white"
          style={{ height: `calc(100% - 20rem)` }}
        />

        {/* <div
          className="absolute inset-0 bg-white"
          style={{
            clipPath: `circle(200vw at 50% calc(100% - 200vw))`,
          }}
        /> */}

        <div className="relative" style={{ zIndex: 2 }}>
          {children}
        </div>
      </div>
      {/* <div className="mx-auto max-w-4xl font-nexa text-white px-4 py-24 flex flex-col gap-4 items-start">
        <p className="text-5xl font-bold font-nexa">
          See all your jobs in one place.
        </p>
        <p className="text-lg font-nexa">
          See what jobs you've posted, and check their status!
        </p>

        <Link to="/jobs/opportunities" className="mt-4">
          <Button white>View my jobs</Button>
        </Link>
      </div> */}
    </div>
  );
}
