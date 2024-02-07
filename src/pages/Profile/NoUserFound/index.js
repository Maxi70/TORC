import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";
import styles from "./NoUserFound.module.css";
import Footer from "components/Footer";
import TorcHorizontalLogo from "images/logo-no-beta.png";

function NoUserFound(props) {
  const { username } = useParams();
  useEffect(() => {
    document.title = `Torc - ${username} not found`;
  }, [username]);

  return (
    <div
      className={classNames(
        styles["bg-gradient"],
        "relative inset-0 mix-blend-multiply"
      )}
    >
      <div className="rect328 flex items-center justify-center pt-36 pb-96 px-4 min-h-screen">
        <div
          className={classNames(
            "ui",
            "middle",
            "aligned",
            "stackable",
            "centered",
            "grid",
            styles.container
          )}
        >
          <div className="max-w-4xl shadow p-16 mx-auto flex flex-col items-center justify-between bg-white rounded">
            <img
              alt="logo"
              className="w-52 max-w-full"
              src={TorcHorizontalLogo}
            />
            <div className="bg-white w-11/12">
              <div className="mb-6">
                <label className="mt-3 font-rubik-regular block tracking-wider text-base mb-2 ml-2">
                  Unfortunately we couldn't find a profile for {username}.
                </label>
                <label className="mt-3 font-rubik-regular block tracking-wider text-base mb-2 ml-2">
                  Would you like to return your{" "}
                  <Link
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    alt="your dashboard"
                    to="/dashboard"
                  >
                    profile page?{" "}
                  </Link>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NoUserFound;
