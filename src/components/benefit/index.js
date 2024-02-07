import React from "react";
import arrow from "../../images/blue-arrow-up.svg";
import PropTypes from "prop-types";
import styles from "./benefit.module.css";
import classNames from "classnames";
import BeardedMan from "images/BeardedComputerUser.png";
import CloudsAndRocket from "images/clouds-and-rocket.png";
import CloudsAndRocketMobile from "images/clouds-and-rocket-mobile.png";

// TODO: this is a bit un-DRY (wet?)

export function BenefitFreelancer() {
  return (
    <React.Fragment>
      <h2 className="font-nexa font-bold text-2xl center mb-6">
        Enjoy the benefits of joining today!
      </h2>
      <Benefit
        title="Work? Simple."
        text="Find high-quality work that’s already been vetted and matched to your skills, and save time during the hiring process with pre-recorded video interviews."
      />
      <Benefit
        title="Your career? Yours."
        text="Build a freelance career working on jobs that challenge you with support from the Torc Community."
      />
      <Benefit
        title="100% remote. Work from anywhere."
        text="Torc offers 100% remote working opportunities. We welcome freelancers from most parts of the world, regardless of your country of origin."
      />
      <img className="mt-8" src={BeardedMan} alt="Bearded computer user" />
    </React.Fragment>
  );
}

export function BenefitEnterprise() {
  return (
    <React.Fragment>
      <h2 className="font-nexa font-bold text-2xl center mb-6">
        Enjoy the benefits of joining today!
      </h2>
      <Benefit
        title="Access the best."
        text="Post your jobs directly on the platform for vetted Torc developers to view and apply."
      />
      <Benefit
        title="Get the right talent, right away."
        text="Vetted talent, focused skill sets, and developer profiles with real-world productivity data mean you’ll get the right talent right away."
      />
      <Benefit
        title="Hire with confidence."
        text="Not only do we hand-scout and vet Torc developers, we also offer a 2-week trial. If it’s not the right fit, we’re happy to help you find a developer who is."
      />
      {/* desktop image adhered to left edge */}
      <img
        className="hidden md:block md:w-7/12 md:pr-16 md:left-0 md:absolute"
        src={CloudsAndRocket}
        alt="clouds and a stylized rocket"
      />
      {/* mobile image is not */}
      <img
        src={CloudsAndRocketMobile}
        alt="clouds and a stylized rocket"
        className="md:hidden"
      />
    </React.Fragment>
  );
}

export function Benefit({ title, text }) {
  return (
    <div className="grid grid-cols-6 gap-4 mb-8 max-w-xl">
      <div
        className={classNames(
          "col-span-1 rounded flex p-2 self-start justify-self-end rotate-90",
          styles.checkCircle
        )}
      >
        <img
          alt="white check"
          src={arrow}
          style={{
            transform: "rotate(90deg)",
          }}
        />
      </div>
      <div className="col-span-5">
        <div className="font-rubik-regular font-bold text-xl mb-2">{title}</div>
        <div className="font-rubik-regular font-base">{text}</div>
      </div>
    </div>
  );
}

Benefit.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
