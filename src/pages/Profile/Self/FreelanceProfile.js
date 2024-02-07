import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";
import styles from "./profiles.module.css";
import { ProfileHeader } from "./elements/ProfileHeader";
import { FREELANCER_CONDITIONAL_DATA, CUSTOMER_CONDITIONAL_DATA } from "./data";
import { USER_TYPES } from "lookup";
import ArticleSecction from "../Articles";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import { useHistory } from "react-router-dom";
import SocialShare from "components/SocialShare";
import { Auth } from "aws-amplify";
import JobsSection from "../JobsSection";

export const FreelanceProfile = ({ appsyncUser, articles }) => {
  const [data, setData] = useState(FREELANCER_CONDITIONAL_DATA.HIDDEN);
  const [cognitoGroups, setCognitoGroups] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (appsyncUser.userType === USER_TYPES.FREELANCER) {
      setData(
        FREELANCER_CONDITIONAL_DATA[appsyncUser.visibility] ||
          FREELANCER_CONDITIONAL_DATA.HIDDEN
      );
    } else {
      setData(
        CUSTOMER_CONDITIONAL_DATA[appsyncUser.visibility] ||
          CUSTOMER_CONDITIONAL_DATA.HIDDEN
      );
    }

    if (appsyncUser.userType === USER_TYPES.CUSTOMER) {
      (async () => {
        try {
          const auth = await Auth.currentSession();

          const groups = auth.getAccessToken().payload["cognito:groups"] || [];
          setCognitoGroups(groups);
        } catch (err) {
          console.log("Error getting current session", err);
        }
      })();
    }
  }, [appsyncUser]);

  const canUserAccessJobOpps = useCallback(() => {
    return cognitoGroups.includes(
      process.env.REACT_APP_COGNITO_CUSTOMER_JOB_APPROVED_GROUP
    );
  }, [cognitoGroups]);

  return (
    <>
      <div className={classNames(styles["freelance-profile"])}>
        <ProfileHeader
          styles={styles}
          appsyncUser={appsyncUser}
          content={data?.accessDescription}
        />
        {appsyncUser.userType === USER_TYPES.CUSTOMER &&
        canUserAccessJobOpps() ? (
          <JobsSection userId={appsyncUser.id} />
        ) : (
          <ArticleSecction articles={articles} appsyncUser={appsyncUser} />
        )}
        <section
          className={classNames(
            "flex flex-col items-center justify-center py-16",
            styles["share-friend"]
          )}
        >
          <div className="mb-4">
            {appsyncUser.userType === USER_TYPES.FREELANCER && (
              <>
                <h2 className="text-3xl mb-6 font-nexa tracking-wider text-electricBlue-700">
                  What's happening at Torc?
                </h2>
                <p className="font-rubik-regular text-xl tracking-wider">
                  Hey {appsyncUser.given_name}. Thanks for your early support of
                  Torc. We have been hard at work building Torc to be the best
                  spot for you to find your next opportunity. Please make sure
                  to join our{" "}
                  <a
                    href="https://discord.gg/H3FSVWG8vf"
                    target="_blank"
                    rel="noreferrer"
                    alt="link to register at our Discord server"
                  >
                    Discord
                  </a>{" "}
                  and connect your account to your Discord user! We use Discord
                  to get more feedback from you and, in addition to this space,
                  to share updates and progress with you!
                </p>
                <p className="font-rubik-regular text-xl tracking-wider mt-6">
                  Check out our new profiles! Let us know what you think about
                  them! We are always looking for feedback! We want to build the
                  best developer profiles and we need your thoughts and
                  opinions!
                </p>
                <div className="tracking-wider mt-6">
                  <p className="font-rubik-regular text-xl">
                    Here's a sneak peak at what's new and coming soon:
                  </p>
                  <ul className="mt-3 list-disc ml-16">
                    <li className="font-rubik-regular text-xl">
                      Link your{" "}
                      <a
                        href="https://discord.gg/H3FSVWG8vf"
                        target="_blank"
                        rel="noreferrer"
                        alt="link to register at our Discord server"
                        className="font-rubik-regular text-electricBlue-700 font-bold hover:underline"
                      >
                        Discord
                      </a>{" "}
                      account to get early access to jobs and communicate with
                      our community!
                    </li>
                    <li className="font-rubik-regular text-xl">
                      Revamped referral program with more ways to earn including
                      $500 for you and $250 for your referral(see below)
                    </li>
                    <li className="font-rubik-regular text-xl">
                      Link your calendar when you are matched with a job to make
                      it easy to schedule interviews!
                    </li>
                    <li className="font-rubik-regular text-xl">
                      Complete skills assessments and coming soon self service
                      skills assessments!
                    </li>
                    <li className="font-rubik-regular text-xl">
                      And much more!
                    </li>
                  </ul>
                </div>
              </>
            )}
            {appsyncUser.userType === USER_TYPES.CUSTOMER && (
              <>
                <h2 className="text-3xl mb-6 font-nexa tracking-wider text-electricBlue-700">
                  Ready to post a job?
                </h2>
                {!canUserAccessJobOpps() && (
                  <p className="font-rubik-regular text-xl tracking-wider">
                    You'll need an active agreement in place to post a job. Not
                    to worry, it's a quick and simple process.{" "}
                    <a
                      className="text-blue-700"
                      href={`https://www.torc.dev/contact?firstname=${appsyncUser.given_name}&lastname=${appsyncUser.family_name}&email=${appsyncUser.email}&reason=hire`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Send us a note
                    </a>{" "}
                    and we'll be in touch to get you set up.
                  </p>
                )}
                {canUserAccessJobOpps() && (
                  <>
                    <p className="font-rubik-regular text-xl tracking-wider">
                      Great, you'll be working with your next developer in no
                      time. You can post a job using the button below or by
                      opening the menu on the right side of your screen.
                    </p>
                    <div className="mt-6">
                      <GetStartedBtn
                        onClick={() =>
                          history.push("/jobs/opportunities/create")
                        }
                        label={"POST A NEW JOB"}
                        smallButton
                        variantBlack
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </section>
        <section
          className={classNames(
            "flex flex-col justify-center pb-16",
            styles["share-friend"]
          )}
        >
          <div className="mb-8">
            <p className="text-3xl mb-6 tracking-wider text-electricBlue-700">
              Have you heard about our{" "}
              <a
                className="font-rubik-regular text-3xl mb-6 font-bold tracking-wider text-electricBlue-700 hover:underline"
                href="https://www.torc.dev/talent/referrals"
                target="_blank"
                rel="noreferrer"
                alt="link to our referral program page"
              >
                referral program
              </a>
              ?
            </p>
            <p className="font-rubik-regular text-xl tracking-wider ">
              The great thing about a marketplace is it keeps getting stronger
              and stronger when everyone is successful—more jobs leads to more
              developers, and more developers means you're able to find a great
              match, faster. Read all about our{" "}
              <a
                className="font-rubik-regular text-electricBlue-700 font-bold hover:underline"
                href="https://www.torc.dev/talent/referrals"
                target="_blank"
                rel="noreferrer"
                alt="link to our referral program page"
              >
                referral program
              </a>
              !
            </p>
            <p className="font-rubik-regular text-xl tracking-wider mt-6">
              We're ready to put our money where our mouth is. If you refer a
              developer or a customer to Torc, we'll give you $500 and your
              referral $250 dollars once they are staffed or sign up as a
              customer!
            </p>
            <p className="font-rubik-regular text-xl tracking-wider mt-6">
              To be eligible for this revenue share, the new developer or
              customer must sign up using your personalized referral code.
            </p>
          </div>
          {appsyncUser && (
            <SocialShare
              referralCode={appsyncUser.referralCode}
              referralCount={appsyncUser.referralCount}
              userType={appsyncUser.userType}
            />
          )}
        </section>
      </div>
    </>
  );
};
