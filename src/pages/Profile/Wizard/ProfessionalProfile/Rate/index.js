import { FormProvider, useForm } from "react-hook-form";

import RateSlider from "components/FormInputs/RateSlider";
import { useEffect } from "react";

const Rate = ({ user, className, rateRef, save, setDisabled }) => {
  const methods = useForm({
    defaultValues: {
      range: user?.ratePerHour?.value || 0,
    },
  });

  const { watch } = methods;

  const rangeValue = watch("range");

  useEffect(() => {
    if (rangeValue === 0) setDisabled(true);
    else setDisabled(false);
  }, [rangeValue, setDisabled]);

  const { control } = methods;

  return (
    <div className={className} ref={rateRef}>
      <div className="b1 mb-2">
        Add your expected hourly rate in U.S. Dollars (USD)
      </div>
      <p className="b2">
        Adjust the slider to indicate your rate. We use this only to help match
        you with open jobs.
      </p>
      <div className="b4">
        You'll be able to adjust this rate when you apply to specific jobs.
      </div>
      <FormProvider {...methods}>
        <form className="sm:w-2/3 w-4/5 mx-auto">
          <RateSlider
            control={control}
            defaultValue={user?.ratePerHour?.value ?? 0}
            save={save}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default Rate;
