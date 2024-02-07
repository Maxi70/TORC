import Input from "components/FormComponents/Input";
import { useForm } from "react-hook-form";
import WizBtn from "components/buttons/WizardProgress/WizardProgress";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import TextArea from "components/FormComponents/TextArea";
import logo from "images/Iconmark.png";
import InfoPopover from "components/FormComponents/InfoPopover";
import { useEffect, useRef, useState } from "react";
import CloudinaryWidget from "components/CloudinaryWidget";
import ImageViewer from "components/ImageViewer";
import TimezoneSelect from "components/FormComponents/TimezoneSelect";
import FormError from "components/FormComponents/FormError";
import CountrySelect from "components/FormComponents/CountrySelect";
import { isValidUrl } from "helpers/utils";

export default function AboutCompany({
  user,
  prevStep,
  nextStep,
  updateProfile,
}) {
  const [saving, setSaving] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      timezone: { label: "", value: "" },
    },
  });

  const scrollRef = useRef();

  const watchLogo = watch("logo");

  const onSubmit = async (_data) => {
    setSaving(true);

    // Save in db
    try {
      const attributesToUpdate = {
        id: user.id,
        companyDetails: {
          address: {
            city: _data?.city?.trim() ?? _data.city,
            country: _data?.country?.trim() ?? _data.country,
            line1: _data?.line1?.trim() ?? _data.line1,
            line2: _data?.line2?.trim() ?? _data.line2,
            postalCode: _data?.postalCode?.trim() ?? _data.postalCode,
            state: _data?.state?.trim() ?? _data.state,
          },
          bio: _data?.bio.trim() ?? _data.bio,
          logo: _data.logo,
          name: _data?.name.trim() ?? _data.name,
          tagline: _data?.tagline?.trim() ?? _data.tagline,
          timezone: _data.timezone,
          url: _data?.url?.trim() ?? _data.url,
        },
      };

      await updateProfile(attributesToUpdate);

      nextStep();
      return;
    } catch (error) {
      console.log("Appsync save error", error);
      setSaving(false);
    }
  };

  const handleCompanyLogoUpload = (cloudinaryPublicId) => {
    setValue("logo", cloudinaryPublicId, { shouldDirty: true });
  };

  useEffect(() => {
    let companyName;
    let timezone;
    let address;

    // Legacy attribute - use it if new attribute does not have a name yet
    if (user.company && !user.companyDetails?.name) {
      companyName = user.company;
    } else {
      companyName = user.companyDetails?.name;
    }

    if (!user.companyDetails?.timezone) {
      timezone = { label: "", value: "" };
    } else {
      timezone = user.companyDetails?.timezone;
    }

    if (user.companyDetails?.address) {
      address = user.companyDetails.address;
    } else {
      address = {};
    }

    reset(
      {
        ...user.companyDetails,
        ...address,
        name: companyName,
        timezone,
      } || {
        name: companyName,
        ...address,
        timezone,
      }
    );

    // scrollRef.current?.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    //   inline: "nearest",
    // });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto px-4" ref={scrollRef}>
      <div className="flex flex-row justify-between w-full mb-4">
        <WizBtn onClick={prevStep}>Back</WizBtn>
        <WizBtn onClick={nextStep}>Skip</WizBtn>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <p className="font-nexa text-2xl text-blue-800">
          Tell everyone a little about your company
        </p>
        <Section>
          <label className="font-bold">
            Company name<span className="text-red-500">*</span>
          </label>
          <Input
            {...register(`name`, {
              minLength: {
                value: 2,
                message: "Company name must be at least 2 characters.",
              },
              required: "Company name is required.",
            })}
          />
          <FormError>{errors.name?.message}</FormError>
        </Section>
        <Section>
          <label className="font-bold">
            About company
            <InfoPopover>
              Please add a description of your company. This will be visible to
              developers and helps to attract more applicants to your jobs.
            </InfoPopover>
          </label>
          <TextArea {...register(`bio`)} />
        </Section>
        <Section>
          <label className="font-bold">Company website</label>
          <Input
            {...register(`url`, {
              validate: (value) =>
                value
                  ? isValidUrl(value) || "Please provide a valid web url"
                  : true,
            })}
          />
          <FormError>{errors.url?.message}</FormError>
        </Section>

        <Section>
          <label className="font-bold">Company address</label>
          <Input {...register(`line1`)} placeholder="Line 1" />
          <Input {...register(`line2`)} placeholder="Line 2" />
          <div className="grid grid-cols-2 gap-4">
            <Input {...register(`city`)} placeholder="City" />
            <Input {...register(`state`)} placeholder="State / Region" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input {...register(`postalCode`)} placeholder="Postal Code" />
            <CountrySelect name="country" control={control} />
          </div>
        </Section>

        <Section>
          <label className="font-bold">Primary timezone</label>
          <TimezoneSelect name="timezone" control={control} />
        </Section>

        <h2 className="font-nexa font-bold text-purple-800 text-xl">
          Company logo
        </h2>
        <p>Please ensure photos stay under 3 MB.</p>

        <div className="flex flex-col items-center gap-4">
          {watchLogo ? (
            <div className="w-64 mt-12 flex justify-center">
              <ImageViewer objectKey={watchLogo} radius={5} />
            </div>
          ) : (
            <div
              className="bg-gray-100 p-8"
              style={{ borderRadius: `10000px` }}
            >
              <img src={logo} className="w-36 h-36" alt="" />
            </div>
          )}
          <CloudinaryWidget
            onUpload={handleCompanyLogoUpload}
            identifier="company-logo-upload"
            label="Upload a company logo"
            minImageWidth={144}
            minImageHeight={144}
            imageDimension="144 pixels wide by 144 pixels tall"
            resourceType="image"
          />
        </div>

        <GetStartedBtn
          className="mt-12 mb-20 self-start"
          label={saving ? "SAVING..." : "CONTINUE"}
          onClick={() => {}}
          disabled={saving}
        />
      </form>
    </div>
  );
}

function Section({ children, className = `` }) {
  return <div className={`flex flex-col gap-2` + className}>{children}</div>;
}
