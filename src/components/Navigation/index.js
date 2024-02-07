import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({ showButtons = true }) => {
  return (
    <nav className="relative z-10 flex overflow-hidden h-[6.5rem] flex-col justify-end">
      <div className="relative w-full h-[6.5rem]">
        <div className="relative z-10 w-full h-2 bg-[#202021]" />
        {showButtons && (
          <>
            <div
              className="absolute left-auto top-0 right-0 bottom-auto z-100 inline-block w-full h-full bg-right-top bg-auto bg-no-repeat bg-scroll "
              style={{
                backgroundImage:
                  "url('https://assets.website-files.com/62d58156c55f234fb9376ebe/631c91be94d7efa5590d52e6_login-nav-wrapper.svg')",
              }}
            />
            <div className="inline-flex absolute top-0 right-0 w-[23.1875rem] h-[4.5rem] pl-5 justify-center bg-transparent bg-none bg-auto bg-repeat bg-scroll">
              <Link className="w-auto group" to="/login">
                <div className="relative z-20 w-auto h-2 rounded bg-brandPrimary invisible group-hover:visible" />
                <div className="mt-[1.1875rem] inline-block">
                  <h6 className="transition-all cursor-pointer text-white leading-[1.375rem] hover:text-brandPrimary">
                    Login
                  </h6>
                </div>
              </Link>
              <div className="w-0.5 h-[1.625rem] mt-6 mx-[3.25rem] bg-white" />
              <Link className="w-auto group" to="/signup">
                <div className="relative z-20 w-auto h-2 rounded bg-brandPrimary invisible group-hover:visible" />
                <div className="mt-[1.1875rem] inline-block">
                  <h6 className="transition-all cursor-pointer text-white leading-[1.375rem] hover:text-brandPrimary">
                    Sign up
                  </h6>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  showButtons: PropTypes.bool,
};

export default Navigation;
