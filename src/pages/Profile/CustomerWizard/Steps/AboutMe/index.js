import { useEffect, useReducer, useRef, useState } from "react";
import { Form, Message } from "semantic-ui-react";
import infoReducer from "./reducer";
import * as actionTypes from "./actionTypes";
import { SOCIAL_LINK_TYPES } from "lookup";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import WizBtn from "components/buttons/WizardProgress/WizardProgress";
import InfoPopover from "components/FormComponents/InfoPopover";
import "../../CustomerWizard.css";
import classNames from "classnames";
import { extractUsernameFromUrl, isValidUrl } from "helpers/utils";
import SearchLocations from "components/Locations";
import CustomInput from "components/CustomInput";

// Form input that works as a Controlled Input. Temporary / Meant to replace input components under common folder

const FIELDS = {
  LOCATION: "locale",
  TAGLINE: "tagline",
  BIO: "bio",
  SOCIALLINKS: "socialLinks",
  ROLE: "jobRole",
};

const SOCIALLINKS = {
  TWITTER: {
    key: SOCIAL_LINK_TYPES.TWITTER,
    label: "Twitter",
  },
  INSTAGRAM: {
    key: SOCIAL_LINK_TYPES.INSTAGRAM,
    label: "Instagram",
  },
  LINKEDIN: {
    key: SOCIAL_LINK_TYPES.LINKEDIN,
    label: "LinkedIn",
  },
  FACEBOOK: {
    key: SOCIAL_LINK_TYPES.FACEBOOK,
    label: "Facebook",
  },
  PORTFOLIO: {
    key: SOCIAL_LINK_TYPES.PORTFOLIO,
    label: "Personal website",
  },
  CALENDAR: {
    key: SOCIAL_LINK_TYPES.CALENDAR,
    label: "Calendar link",
  },
};

const INITIALSTATE = {
  locale: "",
  tagline: "",
  jobRole: "",
  bio: "",
  socialLinks: [
    {
      type: SOCIAL_LINK_TYPES.TWITTER,
      value: "",
    },
    {
      type: SOCIAL_LINK_TYPES.INSTAGRAM,
      value: "",
    },
    {
      type: SOCIAL_LINK_TYPES.LINKEDIN,
      value: "",
    },
    {
      type: SOCIAL_LINK_TYPES.FACEBOOK,
      value: "",
    },
    {
      type: SOCIAL_LINK_TYPES.CALENDAR,
      value: "",
    },
    {
      type: SOCIAL_LINK_TYPES.PORTFOLIO,
      value: "",
    },
  ],
  location: {
    id: null,
    name: null,
    state_id: null,
    state_code: null,
    state_name: null,
    country_id: null,
    country_code: null,
    country_name: null,
    latitude: null,
    longitude: null,
    wikiDataId: null,
  },
};

function Info({ user, updateProfile, nextStep, prevStep }) {
  const [state, dispatch] = useReducer(infoReducer, INITIALSTATE);
  const [savingChanges, setSavingChanges] = useState(false);
  const [portfolioFormatError, setPortfolioFormatError] = useState(false);
  const [calendarFormatError, setCalendarFormatError] = useState(false);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);
  const scrollRef = useRef(null);

  const locationRef = useRef();
  // Update field values
  const onValueChange = (field, value) => {
    if (field === FIELDS.LOCATION) {
      dispatch({
        type: actionTypes.LOCATION_UPDATED,
        value,
      });
    } else if (field === FIELDS.TAGLINE && value.length <= 60) {
      dispatch({
        type: actionTypes.TAGLINE_UPDATED,
        value,
      });
    } else if (field === FIELDS.BIO && value.length <= 1000) {
      dispatch({
        type: actionTypes.BIO_UPDATED,
        value,
      });
    } else if (field === FIELDS.ROLE) {
      dispatch({
        type: actionTypes.ROLE_UPDATED,
        value,
      });
    }
  };

  const getIconForSocialNetwork = (key) => {
    switch (key) {
      case SOCIAL_LINK_TYPES.TWITTER:
      case SOCIAL_LINK_TYPES.INSTAGRAM:
      case SOCIAL_LINK_TYPES.LINKEDIN:
      case SOCIAL_LINK_TYPES.FACEBOOK:
      case SOCIAL_LINK_TYPES.HASHNODE:
        return true;
      default:
        return false;
    }
  };

  const updateSocialProfile = (key, value) => {
    dispatch({
      type: actionTypes.SOCIAL_PROFILE_UPDATED,
      key,
      value,
    });
  };

  const updateInfo = async (event) => {
    event.preventDefault();

    const locationInput = document.getElementById("locationSearch").value;
    if (!location || !locationInput) {
      locationRef.current.scrollIntoView({ behavior: "smooth" });
      return setLocationError(true);
    }
    // Validate social links field field
    let portfolioFormatValid = true;
    let calendarFormatValid = true;

    const attributes = { ...state };

    attributes.socialLinks.forEach((s) => {
      if (s.type === SOCIAL_LINK_TYPES.PORTFOLIO) {
        if (s.value && s.value.length > 0) {
          if (!isValidUrl(s.value)) {
            portfolioFormatValid = false;
          }
        }
      } else if (s.type === SOCIAL_LINK_TYPES.CALENDAR) {
        if (s.value && s.value.length > 0) {
          if (!isValidUrl(s.value)) {
            calendarFormatValid = false;
          }
        }
      }
    });

    // Format social links - retain only the username
    attributes.socialLinks = attributes.socialLinks.map((s) => ({
      value: extractUsernameFromUrl(s.value, s.type),
      type: s.type,
    }));

    // Format the location field for the backend
    attributes.location = {
      locationId: location.id,
      cityName: location.name,
      stateId: location.state_id,
      stateCode: location.state_code,
      stateName: location.state_name,
      countryId: location.country_id,
      countryCode: location.country_code,
      countryName: location.country_name,
      latitude: location.latitude,
      longitude: location.longitude,
      wikiDataId: location.wikiDataId,
    };

    if (!portfolioFormatValid) {
      setPortfolioFormatError(true);

      return;
    } else {
      // Clear any previous errors, if any
      setPortfolioFormatError(false);
    }

    if (!calendarFormatValid) {
      setCalendarFormatError(true);

      return;
    } else {
      // Clear any previous errors, if any
      setCalendarFormatError(false);
    }

    setSavingChanges(true);

    const attributesToUpdate = { id: user.id, ...attributes };
    // to remove white space before saving to the db
    attributesToUpdate.bio = attributes.bio.trim();
    attributesToUpdate.tagline = attributes.tagline.trim();
    attributesToUpdate.jobRole = attributesToUpdate.jobRole.trim();

    for (let social of attributesToUpdate.socialLinks) {
      if (typeof social?.value === "string") {
        social.value = social.value.trim();
      }
    }

    try {
      await updateProfile(attributesToUpdate);

      nextStep();
    } catch (error) {
      console.log("Error when updating profile info", error);
      setSavingChanges(false);
    }
  };

  const getPlaceholderForSocialNetwork = (key) => {
    switch (key) {
      case SOCIAL_LINK_TYPES.TWITTER:
        return "Enter your Twitter username";
      case SOCIAL_LINK_TYPES.INSTAGRAM:
        return "Enter your Instagram username";
      case SOCIAL_LINK_TYPES.LINKEDIN:
        return "Enter your LinkedIn username";
      case SOCIAL_LINK_TYPES.FACEBOOK:
        return "Enter your Facebook username";
      case SOCIAL_LINK_TYPES.PORTFOLIO:
        return "Enter your Personal Website URL";
      case SOCIAL_LINK_TYPES.CALENDAR:
        return "Enter your Public Calendar URL";
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.EXISTING_DATA_FETCHED,
      user,
    });
  }, [user]);

  // Set the location on load, if it has an initial value
  useEffect(() => {
    if (state.location.id) {
      setLocation(state.location);
    }
  }, [state.location]);

  useEffect(() => {
    if (location) {
      setLocationError(false);
    }
  }, [location]);

  return (
    <div className="max-w-2xl mx-auto px-4" ref={scrollRef}>
      <div className="flex flex-row justify-between w-full mb-4">
        <WizBtn onClick={prevStep}>Back</WizBtn>
        <WizBtn onClick={nextStep}>Skip</WizBtn>
      </div>
      <div className="mt-12 max-w-6xl">
        <h2 className="text-blue-800 font-nexa text-xl md:text-2xl mb-4">
          Tell everyone about yourself
        </h2>
        <form
          size="large"
          onSubmit={updateInfo}
          className="flex flex-col gap-4"
        >
          <Form.Field>
            <label className="font-rubik-regular font-bold tracking-wider ml-3">
              Headline
              <InfoPopover>
                What’s something interesting that will draw developers to your
                profile and establish credibility? How about “Olympic athlete
                turned product manager” or “Let’s play golf while we write
                code.” Those will get you some attention!
              </InfoPopover>
            </label>
            <CustomInput
              value={state.tagline}
              attribute="tagline"
              onChange={onValueChange}
            />
          </Form.Field>
          <div className="flex justify-end text-xs mr-6 font-rubik-regular">
            {state.tagline.length} / 60
          </div>
          <Form.Field>
            <label className="font-rubik-regular font-bold tracking-wider ml-3">
              Job title
            </label>
            <CustomInput
              value={state.jobRole}
              attribute="jobRole"
              onChange={onValueChange}
            />
          </Form.Field>
          <Form.Field>
            <label className="font-rubik-regular font-bold tracking-wider ml-3">
              About me
              <InfoPopover>
                While this section is optional, we suggest at least a couple
                sentences telling people about yourself. A few thought starters:
                <li>What you do</li>
                <li>How long you’ve been doing it</li>
                <li>What role you play in hiring decisions</li>
                <li>Any tips you can share for future job candidates</li>
              </InfoPopover>
            </label>
            <CustomInput
              isTextarea
              label="Intro paragraph"
              rows="9"
              value={state.bio}
              attribute="bio"
              onChange={onValueChange}
            />
          </Form.Field>
          <div className="flex justify-end text-xs mr-6 font-rubik-regular">
            {state.bio.length} / 1000
          </div>
          <Form.Field>
            <div className="flex">
              <label className="font-rubik-regular font-bold tracking-wider ml-3">
                Location
              </label>
              <InfoPopover>Tooltip text for location field</InfoPopover>
            </div>
            <div ref={locationRef} />
            <SearchLocations location={location} setLocation={setLocation} />
            {locationError && (
              <div className="font-rubik-regular text-red-500">
                Location is required.
              </div>
            )}
          </Form.Field>
          <h4 className="font-nexa font-bold text-purple-800 text-xl mb-6 mt-16">
            Social and Professional Accounts
          </h4>
          <div className="flex flex-col gap-4">
            {Object.keys(SOCIALLINKS).map((k) => {
              const s = state.socialLinks?.find(
                (l) => l.type === SOCIALLINKS[k].key
              ) || {
                type: SOCIALLINKS[k].key,
                value: "",
              };

              return (
                <Form.Field key={SOCIALLINKS[k].key}>
                  <label className="font-rubik-regular font-bold tracking-wider ml-3 flex flex-row items-center">
                    <span
                      className={classNames(
                        SOCIALLINKS[k].key === SOCIAL_LINK_TYPES.CALENDAR &&
                          "mr-2"
                      )}
                    >
                      {SOCIALLINKS[k].label}
                    </span>
                    {SOCIALLINKS[k].key === SOCIAL_LINK_TYPES.CALENDAR && (
                      <InfoPopover>
                        Please enter your public calendar link where Torc
                        placement team will be able to see your calendar to
                        facilitate scheduling interviews. This link is not
                        shared outside of Torc without your permission.
                        <br />
                        <br />
                        <a
                          className="text-bluepurple hover:text-black transition-color transition font-bold"
                          href="https://calendly.com/"
                          alt="calendly"
                          data-cy="calendly"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Calendly{" "}
                        </a>
                        has a great free tier if you do not have an existing
                        tool.
                      </InfoPopover>
                    )}
                  </label>
                  <CustomInput
                    value={s.value}
                    onChange={(e) => {
                      updateSocialProfile(SOCIALLINKS[k].key, e.target.value);
                    }}
                    social={getIconForSocialNetwork(SOCIALLINKS[k].key)}
                    socialBypass
                    placeholder={getPlaceholderForSocialNetwork(
                      SOCIALLINKS[k].key
                    )}
                  ></CustomInput>
                  {/* Specific to PORTFOLIO and Calendar fields */}
                  {((SOCIALLINKS[k].key === SOCIAL_LINK_TYPES.PORTFOLIO &&
                    portfolioFormatError) ||
                    (SOCIALLINKS[k].key === SOCIAL_LINK_TYPES.CALENDAR &&
                      calendarFormatError)) && (
                    <Message negative>
                      <p>Please provide a valid web url</p>
                    </Message>
                  )}
                </Form.Field>
              );
            })}
          </div>

          <GetStartedBtn
            className="mt-12 mb-20 self-start"
            label={!savingChanges ? "CONTINUE" : "SAVING..."}
            loading={savingChanges}
            onClick={updateInfo}
          />
        </form>
      </div>
    </div>
  );
}

export default Info;
