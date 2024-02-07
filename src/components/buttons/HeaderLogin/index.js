import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import loginIcon from "images/login_button.png";
import { ReactComponent as Bars } from "images/new/bars.svg";
import MemberName from "components/MemberName";
import ImageViewer from "components/ImageViewer";
import { Icon } from "semantic-ui-react";
import placeholderProfileImg from "../../../images/placeholderProfile.png";

const HeaderLoginButton = ({
  name,
  text,
  type,
  familyName,
  onClick,
  headshotKey,
  jobRole,
  showMenu,
}) => {
  return (
    <>
      {!name ? (
        <div className="flex items-center cursor-pointer">
          <Link to="/login?retUrl=%2Fprofile%2Fwizard%2F1">
            <img
              className="inline-block h-4 w-4 mr-[9.32px]"
              src={loginIcon}
              alt="avatar"
              width={19}
              height={20}
            />
            <span className="font-nexa-bold inline-block tracking-wider text-left font-bold not-italic text-white">
              {text}
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="mr-4">
            <div className={"flex items-center justify-end"}>
              <span className="font-nexa-bold inline-block tracking-wider text-left font-bold not-italic text-white">
                <MemberName
                  name={`${name} ${familyName.slice(0, 1)}.`}
                  type={type}
                />
              </span>
            </div>
            <div className="text-gray-400 text-xs text-right">
              {jobRole ? `${jobRole.title} at ${jobRole.companyName}` : ""}
            </div>
          </div>
          <div className="w-8 rounded overflow-hidden mr-7">
            {headshotKey ? (
              <ImageViewer
                objectKey={headshotKey}
                placeholder={<Icon name="user circle" size="massive" />}
                radius={5}
              />
            ) : (
              <img src={placeholderProfileImg} alt="placeholder" />
            )}
          </div>
          {showMenu && (
            <div onClick={onClick} className="cursor-pointer">
              <Bars />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HeaderLoginButton;

HeaderLoginButton.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
};
