import { useState } from "react";
import classNames from "classnames";
import * as yup from "yup";
import { API, graphqlOperation } from "aws-amplify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./index.module.css";
import backArrow from "images/backArrow.svg";
import UtilsLib from "utils/lib";
import closeIcon from "images/close-icon-blue.svg";
import { MATCH_RATING_REASONS_FORMATTED, NOTE_TYPES } from "lookup";
import Checkbox from "components/FormComponentsNew/Checkbox";
import Error from "components/FormComponentsNew/Error";
import { isEqual } from "lodash";
import { createNote } from "graphql/mutations";

export default function RatingReasonsModal({
  jobId,
  applicationId,
  application,
  onBack,
  onClose,
  selectedRating,
  rating,
  updateJobOppMatchState,
  reasonsForRating,
}) {
  const [updating, setUpdating] = useState(false);

  const addNote = async (noteContent) => {
    if (noteContent) {
      await API.graphql(
        graphqlOperation(createNote, {
          input: {
            applicationId,
            jobOpportunityId: jobId,
            content: noteContent,
            noteType: NOTE_TYPES.CALIBRATION,
          },
        })
      );
    }
  };

  const setMatchRatingAndReasons = async (selectedOptions) => {
    const reasonsForRatingNewValues = Object.keys(selectedOptions).filter(
      (key) => selectedOptions[key]
    );

    if (
      isEqual(reasonsForRating, reasonsForRatingNewValues) &&
      isEqual(selectedRating, rating)
    ) {
      return;
    }

    const attrs = {
      rating: selectedRating,
      reasonsForRating: reasonsForRatingNewValues,
    };

    await UtilsLib.Match.updateMatchRecord(applicationId, jobId, attrs);

    updateJobOppMatchState({ ...application, ...attrs });
  };

  const reasonsForRatingValues =
    reasonsForRating?.reduce((obj, key) => {
      obj[key] = true;
      return obj;
    }, {}) || [];

  const validationOptionsShape = Object.keys(
    MATCH_RATING_REASONS_FORMATTED
  ).reduce((obj, key) => {
    obj[key] = yup.boolean();
    return obj;
  }, {});

  const schema = yup.object().shape({
    selectedOptions: yup
      .object()
      .shape(validationOptionsShape)
      .test(
        "at-least-one-selected",
        "At least one option must be selected",
        (value) => Object.values(value).some((item) => item)
      ),
    noteContent: yup.string().trim(true).required(`Please add some feedback.`),
  });

  const formSchema = {
    resolver: yupResolver(schema),
    defaultValues: {
      noteContent: "",
    },
  };

  if (reasonsForRating) {
    formSchema.defaultValues = {
      ...formSchema.defaultValues,
      selectedOptions: reasonsForRatingValues,
    };
  }

  const methods = useForm(formSchema);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = async ({ selectedOptions, noteContent }) => {
    setUpdating(true);
    await setMatchRatingAndReasons(selectedOptions);
    await addNote(noteContent);
    setUpdating(false);

    onClose();
  };

  if (!applicationId || !jobId) {
    onClose();
  }

  return (
    <>
      <div className="z-20 absolute top-4 right-4">
        <img
          src={closeIcon}
          className="cursor-pointer"
          alt="close"
          onClick={onClose}
        />
      </div>
      <div
        className={classNames(
          "overflow-y-scroll h-full flex flex-col justify-between relative",
          styles.noScrollbar
        )}
      >
        <div
          className={classNames(
            "flex flex-col justify-between h-full overflow-scroll",
            styles.noScrollbar
          )}
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <div className="min-w-[35vw] flex flex-col mt-14 pl-8 pr-14 mb-4">
                  <p className="font-nexa font-bold text-2xl text-electricBlue-500">
                    Let us know what you think about the candidate
                  </p>

                  <p
                    className="font-rubik-regular text-base mt-2"
                    style={{
                      width: "90%",
                    }}
                  >
                    Select the reasons why...
                  </p>
                  <div className="flex flex-wrap gap-y-5 gap-x-4 mt-4 self-center">
                    {Object.keys(MATCH_RATING_REASONS_FORMATTED).map(
                      (key, index) => (
                        <div
                          key={`${key}_${index}`}
                          className="flex justify-between items-center gap-2"
                        >
                          <Checkbox id={`selectedOptions[${key}]`} />
                          <label className="font-semibold whitespace-normal w-[100px]">
                            {MATCH_RATING_REASONS_FORMATTED[key]}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                  {errors.selectedOptions && (
                    <Error message={errors.selectedOptions.message} />
                  )}

                  <p className="font-nexa font-bold text-2xl text-electricBlue-500 mt-4">
                    Additional Feedback
                  </p>

                  <textarea
                    className={classNames(
                      "w-full block h-24 border-2 border-black p-2 rounded-xs overflow-hidden autoResize"
                    )}
                    id="noteContent"
                    name="noteContent"
                    {...register("noteContent")}
                  />
                  {errors.noteContent && (
                    <Error message={errors.noteContent.message} />
                  )}
                </div>
              </>

              <div className="border-t border-gray-600 w-full py-3 mb-2">
                <div className="flex justify-between">
                  <button
                    className="sml:ml-12 ml-4 font-bold sm:text-sm text-xs border-0 rounded shadow-sm flex items-center justify-center py-2 px-3"
                    onClick={onBack}
                  >
                    <img
                      alt="back arrow"
                      src={backArrow}
                      className="w-3 h-3 mr-2"
                    />
                    BACK
                  </button>
                  <button
                    className={classNames(
                      "mr-4 py-2 px-6 bg-electricBlue-500 text-white font-bold",
                      { "animate-pulse": updating }
                    )}
                    style={{
                      borderRadius: "61px",
                    }}
                    disabled={updating}
                  >
                    {updating ? "SAVING..." : "CONFIRM"}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
