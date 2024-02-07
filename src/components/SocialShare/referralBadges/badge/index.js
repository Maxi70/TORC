import classNames from "classnames";
import logo from "../../../../images/socialShare/TorcLogo.svg";

const titles = {
  1: "Referral Newbie",
  3: "Full Profile Access",
  10: "Referral Apprentice",
  25: "Referral Star",
  50: "Referral Extraordinaire",
};

const Badge = ({ earned, number }) => {
  const earnedStyle = {
    background: "linear-gradient(135deg, #CC4040 0%, #701FD8 100%)",
    zIndex: 1,
  };
  const notEarnedStyle = {
    background: "white",
    border: "2px solid rgba(64, 78, 204, 1)",
    zIndex: 1,
  };
  return (
    <div className="flex flex-col items-center pt-10">
      <div
        className={classNames(
          "w-12 h-12 rounded text-lg font-bold flex items-center justify-center",
          !earned && "border-bluepurple text-bluepurple"
        )}
        style={earned ? earnedStyle : notEarnedStyle}
      >
        {earned ? (
          <img alt="badge" src={logo} />
        ) : (
          <div className="border-bluepurple text-bluepurple z-20">{number}</div>
        )}
      </div>
      <p
        className={classNames(
          earned ? "font-bold" : "font-normal",
          "pt-4 text-bluepurple"
        )}
      >
        {titles[number]}
      </p>
    </div>
  );
};

export default Badge;
