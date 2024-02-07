import classNames from "classnames";
import { Image } from "semantic-ui-react";
import HoverTooltip from "components/HoverTooltip";
import styles from "./badges.module.css";
import moment from "moment";

const BadgeElement = ({ badge }) => {
  return (
    <HoverTooltip
      className={classNames(styles["badges__wrapper"])}
      tracking={{ type: "badge", badgeName: badge.name }}
      hoverText={
        <div className="mx-auto mb-4 bg-white rounded-[16px] shadow-md relative">
          <div className="bg-gray-100 w-full h-14 absolute top-[-16px] z-0"></div>
          <img
            className="rounded-full mx-auto mt-4 w-20 h-20 after:bg-gray-200 after:w-6 after:h-4 z-10 sticky"
            alt="Badge"
            src={badge.image}
          />
          <div className="text-center mt-4">
            <h3 className="font-bold text-lg">{badge.name}</h3>
            <p className="text-gray-600">
              Unlocked on {moment(badge.issuedOn).format("MMMM DD")}
            </p>
            <hr className="my-4" />
            <p className="text-gray-800">{badge.description}</p>
          </div>
        </div>
      }
    >
      <Image
        src={badge.image}
        alt={`Level: ${badge.count} | ${badge.name}`}
        key={badge.entityId}
        className={classNames(
          "md:p-3 lg:p-0 mb-3 min-w-[75px] lg:min-w-[48px]",
          styles["badge"]
        )}
      />
    </HoverTooltip>
  );
};

const Badges = ({ badges }) => {
  return (
    <div
      id="badges-div"
      className="flex flex-wrap sm:gap-3 md:gap-3 lg:gap-3 gap-3"
    >
      {badges.map((badge, i) => (
        <BadgeElement key={i} badge={badge} />
      ))}
    </div>
  );
};

export default Badges;
