import { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import PrimaryBtn from "components/buttons/Primary";

const Success = ({ isForgotPasswordPage }) => {
  const history = useHistory();
  const timeOutRef = useRef();

  useEffect(() => {
    timeOutRef.current = setTimeout(() => {
      history.push("/");
    }, 5000);

    return () => {
      clearTimeout(timeOutRef.current);
    };
  }, [history]);
  return (
    <div className="large-section container-left">
      <h1 className="mb-8">Success!</h1>
      <div className="b1">
        {isForgotPasswordPage
          ? "Your password has been reset."
          : "You verified your account."}
        <br />
      </div>
      <Link to="/">
        <PrimaryBtn label="Start Here!" />
      </Link>
    </div>
  );
};

Success.propTypes = {
  isForgotPasswordPage: PropTypes.bool,
};

export default Success;
