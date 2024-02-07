import classNames from "classnames";
import { useState } from "react";
import Badge from "./badge";

const ReferrallBadges = ({ referralCount }) => {
  const numbers = [1, 3, 10, 25, 50];
  const [badgeIndex, setBadgeIndex] = useState(0);

  const referralText =
    referralCount > 0
      ? `${referralCount} of your friends have joined`
      : "Invite friends to earn badges";

  const changeIndex = (num) => {
    setBadgeIndex((prev) => prev + num);
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="mt-20 font-nexa font-bold text-xl">{referralText}</p>
          {/* hidden until needed */}
          {/* <button
            className="font-rubik-regular font-bold text-electricBlue text-base tracking-wider px-6 py-2"
            style={{
              border: "2px solid #4330D5",
              borderRadius: "30px",
            }}
          >
            SEE YOUR REFERRALS
          </button> */}
        </div>
      </div>
      <div className="relative  w-full">
        <div className="w-full h-1 bg-bluepurple absolute top-1/2 left-0 transform -translate-y-1/2" />
        <div className="flex" style={{ zIndex: 1 }}>
          <div className="md:flex justify-between w-full lg:px-10 px-4 hidden">
            <Badge number={1} earned={referralCount >= 1} />
            <Badge number={3} earned={referralCount >= 3} />
            <Badge number={10} earned={referralCount >= 10} />
            <Badge number={25} earned={referralCount >= 25} />
            <Badge number={50} earned={referralCount >= 50} />
          </div>
          <div
            className="md:hidden flex justify-between items-center w-full px-10"
            style={{
              zIndex: 1,
            }}
          >
            <button
              onClick={() => changeIndex(-1)}
              className={classNames(
                numbers[badgeIndex - 1] ? "visible" : "invisible",
                "grid place-items-center w-8 h-8 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white border-2 hover:bg-bluepurple hover:text-white border-bluepurple text-bluepurple mb-3"
              )}
            >
              &lt;
            </button>
            <Badge
              number={numbers[badgeIndex]}
              earned={referralCount >= numbers[badgeIndex]}
            />
            <button
              onClick={() => changeIndex(1)}
              className={classNames(
                numbers[badgeIndex + 1] ? "visible" : "invisible",
                "grid place-items-center w-8 h-8 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white hover:bg-bluepurple hover:text-white border-2 border-bluepurple text-bluepurple mb-3"
              )}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferrallBadges;
