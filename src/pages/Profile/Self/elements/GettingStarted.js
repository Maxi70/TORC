import classNames from "classnames";
import React from "react";
import { Image } from "semantic-ui-react";

import styles from "./GettingStarted.module.css";
import computerImage from "images/computer.png";

export const GettingStarted = ({ content }) => {
  return (
    <section
      className={classNames(
        "relative overflow-hidden flex justify-center items-center flex-col md:flex-row px-6 py-24 pt-32 md:py-32 md:pt-48 bg-dawn-grad",
        "full-width",
        styles["getting-started"]
      )}
    >
      <div
        className={classNames(
          "flex justify-center w-full pt-0 flex-col md:flex-row bg-white shadow border-2 border-zestygreen border-solid",
          styles["getting-started--wrapper"]
        )}
      >
        <div
          className={classNames(
            "flex justify-center items-center p-12 bg-zestygreen"
          )}
        >
          <Image src={computerImage} />
        </div>
        <div className="flex flex-col justify-center p-12">
          <h2 className="text-3xl mb-6">{content.header}</h2>
          {content.body &&
            content.body.length > 0 &&
            content.body.map((text, idx) => (
              <p key={idx} className="pb-6">
                {text}
              </p>
            ))}
          <p className="">{content.list.header}</p>
          {content.list.items && content.list.items.length > 0 && (
            <ul className="list-disc pl-7">
              {content.list.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};
