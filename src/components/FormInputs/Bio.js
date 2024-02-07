import Error from "components/FormComponentsNew/Error";
import Textarea from "components/FormComponentsNew/Textarea";
import { useFormContext } from "react-hook-form";

const Bio = () => {
  const { formState, watch } = useFormContext();
  const { errors } = formState;

  const bioValue = watch("bio") ?? "";

  return (
    <div>
      <Textarea
        id="bio"
        label="Intro paragraph"
        subtext="Provide a summary to introduce yourself. This is your chance to
      sell yourself for future job opportunities and tell employers why
      you're the developer they've been looking for."
      />

      <div className="flex justify-end text-xs mr-6 font-rubik-regular">
        {bioValue.length} / 1000
      </div>
      <Error
        message={errors?.bio?.message}
        className="whitespace-pre-line sm:text-xs leading-[1.5]"
      />
    </div>
  );
};

export default Bio;
