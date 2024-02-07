import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import URLS from "utils/urls";
import Input from "components/FormComponentsNew/Input";
import PrimaryBtn from "components/buttons/Primary";
import torcLogo from "images/logo.svg";
import RadioButton from "components/FormComponentsNew/RadioButton";

const Newsletter = () => {
  const [firstStepValid, setFirstStepValid] = useState(false);
  const [selectOption, setSelectOption] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const validationSchema = Yup.object().shape({
    nlFirstname: Yup.string().required("Firstname is required"),
    nlEmail: Yup.string().email().required("Email is required"),
    radio: Yup.bool(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const methods = useForm(formOptions);
  const { register, handleSubmit, formState, setValue } = methods;
  const { isValid } = formState;

  const onSubmit = async (e) => {
    setIsLoading(true);
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          email: e.nlEmail.toUpperCase(),
          firstname: e.nlFirstname,
          type: e.type,
          source: e.source,
          site: e.site,
        }),
      };
      await fetch(URLS.ZAPIER, requestOptions);

      setSubscribed(true);
    } catch (error) {
      setError(true);
    }
  };

  const handleSelectType = (value) => {
    setSelectOption(value);
    setValue("type", value);
  };

  return (
    <div className="relative z-10 overflow-hidden sm:h-64 h-fit bg-grey-800">
      <div className="relative w-full flex flex-col">
        <div className="relative w-full h-6 bg-brandSecondary" />
        <div className="mt-[-1rem] flex">
          <div className="w-full rounded-tr-[8px] bg-grey-800 relative" />
          <div className="relative gap-2 mt-[-0.5rem] flex items-center justify-center sm:px-10 px-5 bg-brandSecondary left-auto top-0 right-0 bottom-auto flex-none h-14 sm:h-17 rounded-bl-[8px]">
            <div className="font-nexa-regular text-base sm:text-lg text-white tracking-[-0.69px]">
              The physics of work.
              <span className="font-nexa-light"> Powered by</span>
            </div>
            <img alt="torc" width={24} height={24} src={torcLogo} />
          </div>
        </div>
      </div>
      <div className="container-large">
        {error ? (
          <div className="text-functionalDanger text-center p-14 tracking-[-0.031rem] text-lg">
            An error ocurred. Please try again later
          </div>
        ) : !subscribed ? (
          <>
            <h6 className="mb-[25px] mt-0 text-white">
              {!firstStepValid
                ? "Subscribe to our newsletter."
                : "Please choose an option below so we can personalize your content:"}
            </h6>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit, () => setIsLoading(false))}
              >
                <div className="flex gap-6 sm:flex-row flex-col w-full mb-12 sm:items-center">
                  {!firstStepValid && (
                    <>
                      <div className="sm:w-2/5 w-full text-base">
                        <Input
                          id="nlFirstname"
                          type="text"
                          label="First name"
                          placeholder="Enter your first name"
                          bgColor="grey-800"
                          labelColor="white"
                          inputColor="white"
                          borderColor="grey-300"
                        />
                      </div>
                      <div className="sm:w-3/5 w-full text-base">
                        <Input
                          id="nlEmail"
                          type="email"
                          label="Email"
                          placeholder="Enter your email"
                          bgColor="grey-800"
                          inputColor="white"
                          labelColor="white"
                          borderColor="grey-300"
                        />
                      </div>
                      <PrimaryBtn
                        type="button"
                        disabled={!isValid}
                        label={isLoading ? "Please wait..." : "Submit"}
                        onClick={() => setFirstStepValid(true)}
                      />
                    </>
                  )}
                  {firstStepValid && (
                    <div className="flex justify-center w-full gap-8 sm:flex-row flex-col">
                      <RadioButton
                        handleClick={() => handleSelectType(1)}
                        selected={selectOption === 1}
                        text="I'm a company looking to hire"
                        className="!text-white"
                      />
                      <RadioButton
                        handleClick={() => handleSelectType(2)}
                        selected={selectOption === 2}
                        text="I'm a developer looking for jobs"
                        className="!text-white"
                      />

                      <PrimaryBtn
                        type="submit"
                        disabled={!isValid || !selectOption}
                        label={isLoading ? "Please wait..." : "Subscribe"}
                      />
                      <input
                        id="type"
                        name="type"
                        hidden
                        {...register("type")}
                      />

                      <input
                        id="site"
                        name="site"
                        hidden
                        value={1}
                        {...register("site")}
                      />
                      <input
                        id="source"
                        name="source"
                        hidden
                        value={1}
                        {...register("source")}
                      />
                    </div>
                  )}
                </div>
              </form>
            </FormProvider>
          </>
        ) : (
          <div className="text-white text-center p-14 tracking-[-0.031rem] text-lg">
            Thanks for subscribing. Great content is coming your way!
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
