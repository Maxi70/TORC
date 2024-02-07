import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form, Message } from "semantic-ui-react";
import { SOCIALLINKS, SOCIAL_LINK_TYPES } from "lookup";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ResumeUpload from "../Resume";

import "../forms.css";
import ProfileCoverPicture from "./ProfileCoverPicture";
import Location from "components/FormInputs/Location";
import Email from "components/FormInputs/Email";
import { standardObject } from "./standardObject";
import DefaultInput from "components/FormInputs/DefaultInput";
import { extractUsernameFromUrl, isValidUrl } from "helpers/utils";
import { formatLocation, unformatLocation } from "../utils";
import Bio from "components/FormInputs/Bio";
import Phone from "components/FormInputs/Phone";

function Profile({
  user,
  setInfoSaved,
  profileRef,
  profileCoverPictureRef,
  save,
  setSavingChanges,
  updateProfile,
}) {
  const [portfolioFormatError, setPortfolioFormatError] = useState(false);
  const [location, setLocation] = useState(
    user.location ? unformatLocation(user.location) : undefined
  );

  const validationSchema = Yup.object().shape(standardObject);
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      given_name: user.given_name,
      family_name: user.family_name,
      email: user.email,
      tagline: user.tagline,
      bio: user.bio,
      location: user.location,
      whatsAppAllowed: user.phone?.whatsAppAllowed,
    },
    mode: "all",
  };
  const methods = useForm(formOptions);
  const { getFieldState } = methods;

  const updateInfo = async (event) => {
    event.preventDefault();
    const attributes = {};

    attributes.bio = attributes.bio.trim();
    attributes.tagline = attributes.tagline.trim();

    attributes.socialLinks = formatSocialLinks(attributes.socialLinks);

    setPortfolioFormatError(false);
    setSavingChanges(true);

    const attributesToUpdate = { id: user.id, ...attributes };

    try {
      await updateProfile(attributesToUpdate);
      setInfoSaved(true);
    } catch (error) {
      console.log("Error when updating profile info", error);
      setSavingChanges(false);
    }
  };

  const getSocialLink = (k) =>
    user.socialLinks?.find((l) => l.type === SOCIALLINKS[k].key) || {
      type: SOCIALLINKS[k].key,
      value: "",
    };

  const formatSocialLinks = (socialLinks) => {
    let portfolioFormatValid = true;
    ///refactor this code, could be easier
    socialLinks.forEach((s) => {
      if (s.type === SOCIAL_LINK_TYPES.PORTFOLIO) {
        if (s.value && s.value.length > 0) {
          if (!isValidUrl(s.value)) {
            portfolioFormatValid = false;
          }
        }
      }
    });
    if (!portfolioFormatValid) {
      setPortfolioFormatError(true);
      return;
    }

    // Format social links - retain only the username
    return socialLinks.map((s) => ({
      value: extractUsernameFromUrl(s.value, s.type).trim(),
      type: s.type,
    }));
  };

  const updateSocialLinks = (key, value) => {
    const newValue = user?.socialLinks ? [...user.socialLinks] : [];
    const index = newValue.findIndex((el) => el.type === key);

    if (index === -1) {
      newValue.push({ type: key, value });
    }
    //key exists, but value is blank, remove it from socialLinks
    else if (value.length === 0) {
      newValue.splice(index, 1);
    } else newValue[index].value = value;
    save({ socialLinks: formatSocialLinks(newValue) }, true);
  };

  const updatePhone = (key, value) => {
    save({ phone: { ...user.phone, [key]: value } }, true);
  };

  const handleBlur = ({ target }) => {
    const key = target.id;
    const value = target.value !== "" ? target.value.trim() : target.value;
    if (getFieldState(key).error || key === "locationSearch" || key === "")
      return;
    if (Object.keys(SOCIALLINKS).find((v) => v === key))
      return updateSocialLinks(key, value.trim());
    if (key === "phone") return updatePhone("number", value);
    if (key === "whatsAppAllowed") return updatePhone(key, target.checked);
    save({ [key]: value }, true);
  };

  useEffect(() => {
    if (!location?.id || user?.location?.locationId === location?.id) return;
    save({ location: formatLocation(location) }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div ref={profileRef} className="pb-64">
      <h1 className="mb-[1vh]">Professional profile</h1>
      <div className="b1 mb-8">Add your personal details.</div>
      <FormProvider {...methods}>
        <form
          className="sm:w-2/4 w-full flex flex-col sm:gap-12 gap-8"
          onSubmit={updateInfo}
          onBlur={handleBlur}
        >
          <DefaultInput id="given_name" label="First name" />
          <DefaultInput id="family_name" label="Last name" />
          <Email disabled={true} />
          <Location location={location} setLocation={setLocation} />

          <DefaultInput
            id={SOCIAL_LINK_TYPES.LINKEDIN}
            label={SOCIALLINKS.LINKEDIN.label}
            defaultValue={getSocialLink("LINKEDIN").value}
            subtext="Username"
          />
          <DefaultInput
            id="tagline"
            label="Headline"
            subtext='Provide a brief headline or a catchy phrase that best describes you.
            For example, "All things Android" or "Addicted to Gatsby, React, and
            pizza.'
          />
          <Bio />
          <ResumeUpload user={user} save={save} />
          <ProfileCoverPicture
            profileCoverPictureRef={profileCoverPictureRef}
            user={user}
            save={save}
          />
          <div className="sm:mb-6">
            <h5 className="mb-6">Add your contact information.</h5>
            <Phone user={user} handleChange={handleBlur} />
          </div>
          <h5>Add your professional accounts.</h5>
          {Object.keys(SOCIALLINKS)
            .filter((s) => s !== SOCIAL_LINK_TYPES.LINKEDIN)
            .map((k) => {
              return (
                <Form.Field key={SOCIALLINKS[k].key}>
                  <DefaultInput
                    id={SOCIALLINKS[k].key}
                    label={SOCIALLINKS[k].label}
                    defaultValue={getSocialLink(k).value}
                    subtext="https://..."
                  />
                  {SOCIALLINKS[k].key === SOCIAL_LINK_TYPES.PORTFOLIO &&
                    portfolioFormatError && (
                      <Message negative>
                        <p>Please provide a valid web url</p>
                      </Message>
                    )}
                </Form.Field>
              );
            })}
        </form>
      </FormProvider>
    </div>
  );
}

export default Profile;
