import { useState, useEffect } from "react";
import classNames from "classnames";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";

const PaymentRails = ({ email, referenceId }) => {
  const [widgetLink, setWidgetLink] = useState(null);
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const session = await Auth.currentSession();

        const jwt = session.getIdToken().getJwtToken();

        const res = await fetch(process.env.REACT_APP_PAYMENT_RAILS_ENDPOINT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            email,
            referenceId,
          }),
        });

        const data = await res.json();

        if (data?.paymentRailsSignedURL) {
          setWidgetLink(data.paymentRailsSignedURL);
        } else {
          setError(data?.description);
          console.log("Payment rails error", data);
        }
      } catch (error) {
        setError(error.message);
        console.dir(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [email, referenceId]);

  useEffect(() => {
    const heightListener = (e) => {
      setIsLoading(false);
      document
        .getElementById("PaymentWidget")
        ?.scrollIntoView({ behavior: "smooth" });
      e?.data?.document?.height && setHeight(e.data.document.height);
    };
    window.addEventListener("message", heightListener);

    return () => window.removeEventListener("message", heightListener);
  }, [height]);

  return (
    <div className="flex justify-center w-full">
      <div className={classNames("max-w-5xl w-full")}>
        {error && (
          <div className="mt-10 font-bold text-lg text-red-400">
            <p>
              Could not initialize the payment info. The following Payment Rails
              error occured:
            </p>
            <p className="w-max mt-6 px-2 bg-red-500 text-white">{error}</p>
          </div>
        )}
        <div id="PaymentWidget" className="p-4 md:p-10 lg:px-0 w-full">
          {isLoading && (
            <div className="flex justify-center items-center h-96">
              <span className="loader"></span>
            </div>
          )}
          <iframe
            title="PaymentWidget"
            id="payment-rails-wdiget"
            scrolling="no"
            frameBorder="0"
            height={height}
            width="100%"
            src={widgetLink}
            style={{ minHeight: "400px" }}
          >
            {" "}
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default PaymentRails;

PaymentRails.propTypes = {
  email: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
};
