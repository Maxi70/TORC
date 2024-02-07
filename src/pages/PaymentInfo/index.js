import React, { useCallback, useEffect, useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import { useAuth } from "GlobalAuthContext";
import PaymentRails from "components/PaymentRails";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

function PaymentInfo() {
  const { user } = useAuth();
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [cognitoGroups, setCognitoGroups] = useState([]);

  const canUserAccessPayments = useCallback(() => {
    return cognitoGroups.includes(process.env.REACT_APP_COGNITO_PAYMENTS_GROUP);
  }, [cognitoGroups]);

  // Fetch groups the logged in user belongs to
  useEffect(() => {
    (async () => {
      try {
        const auth = await Auth.currentSession();

        const groups = auth.getAccessToken().payload["cognito:groups"] || [];

        setCognitoGroups(groups);
        setLoading(false);
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();
  }, []);

  if (loading) {
    // return null;
    return <div></div>;
  } else if (!canUserAccessPayments()) {
    history.push("/NotFound");
    return null;
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header
        backgroundStyle={{
          background: "linear-gradient(165deg, #F4D675 0%, #83D9BB 100%)",
        }}
        pageHeader={
          <div className="flex flex-col md:flex-row justify-center">
            <div className="flex-grow flex flex-row items-start max-w-5xl p-4 lg:px-0p-4 md:p-10 lg:px-0">
              <div className="mx-4">
                <div className="font-nexa font-bold tracking-wide text-4xl md:text-6xl">
                  My payments
                </div>
                <div className="font-rubik-regular tracking-wide text-lg md:text-xl my-4 mb-12 max-w-5xl">
                  A payout method and tax form are required in order to be paid.
                  Once complete, getting paid is a breeze! At any time, you can
                  modify your payment method, submit a new tax form, and review
                  your payments and payment status below.
                </div>
              </div>
            </div>
          </div>
        }
      />

      <PaymentRails email={user.email} referenceId={user.id} />

      <Footer />
    </div>
  );
}

export default PaymentInfo;
