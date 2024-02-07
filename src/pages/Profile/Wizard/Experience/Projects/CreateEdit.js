import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import DefaultInput from "components/FormInputs/DefaultInput";
import Modal from "components/Modal";
import { ReactComponent as Close } from "images/new/1-button-close.svg";
import PrimaryBtn from "components/buttons/Primary";
import TextArea from "components/FormComponentsNew/Textarea";
import Select from "components/FormComponentsNew/Select";
import { MONTHS, getYearsList } from "../utils";

const WORK_TYPES = {
  Project: "PROJECT",
  "Case Study": "CASESTUDY",
};

const createProjectSchema = Yup.object().shape({
  workType: Yup.string().required("Required"),
  title: Yup.string().required("Required"),
  client: Yup.string().nullable(),
  startDateMonth: Yup.string(),
  startDateYear: Yup.string(),
  endDateMonth: Yup.string(),

  // NOTE: optional since no endDate denotes project/case study is ongoing
  link: Yup.string(),
  stack: Yup.string().nullable(),
  description: Yup.string(),
});

/**
 * The Create form for adding a new project
 *
 * @param {function} param0.handleClose - callback to close the modal
 * @param {function} param0.onSubmit - callback to submit the form
 */
const CreateEdit = ({ isLoading, handleClose, onSubmit, project }) => {
  const [yearLimit, setYearLimit] = useState();

  const { handleSubmit, watch, reset, ...methods } = useForm({
    resolver: yupResolver(createProjectSchema),
    defaultValues: project
      ? {
          ...project,
          startDateMonth: project?.startDate
            ? moment(project?.startDate).format("MMMM")
            : "",
          startDateYear: project?.startDate
            ? moment(project?.startDate).format("YYYY")
            : "",
          endDateMonth:
            project?.endDate === null
              ? "Present"
              : moment(project?.endDate).format("MMMM"),
          endDateYear: project?.endDate
            ? moment(project?.endDate).format("YYYY")
            : "",
        }
      : {
          endDateMonth: "Present",
        },
    mode: "all",
  });

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) reset();
  }, [methods.formState.isSubmitSuccessful, reset]);

  const workType = watch("workType");
  const watchStartDateYear = watch("startDateYear");
  const watchStartDateMonth = watch("startDateMonth");
  const watchEndDateMonth = watch("endDateMonth");

  useEffect(() => {
    if (!watchStartDateYear || !watchStartDateMonth || !watchEndDateMonth)
      return;
    const startDateMonth = MONTHS.find(
      (m) => m.name === watchStartDateMonth
    )?.index;
    const endDateMonth = MONTHS.find(
      (m) => m.name === watchEndDateMonth
    )?.index;

    setYearLimit(
      new Date().getFullYear() -
        (startDateMonth > endDateMonth
          ? watchStartDateYear
          : watchStartDateYear - 1)
    );
  }, [watchStartDateYear, watchStartDateMonth, watchEndDateMonth]);
  return (
    <Modal>
      <div className="bg-white p-8 rounded-sm pt-8 px-[104px]">
        <div className="relative">
          <h4 className="mb-6">
            {project ? "Edit" : "Add"} a project or case study.
          </h4>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit, (err) => console.error(err))}
            >
              <div className="grid grid-cols-2 gap-7 w-[664px] mb-6">
                <Select
                  id="workType"
                  label="Work type"
                  wrapperClasses="col-span-2"
                  subtext="Pick a work type"
                >
                  <option value="">Please select</option>
                  {Object.entries(WORK_TYPES).map(([k, v]) => (
                    <option key={k} value={v}>
                      {k}
                    </option>
                  ))}
                </Select>
                {!!workType && (
                  <>
                    {workType === "PROJECT" && (
                      <>
                        <DefaultInput id="title" label="Project title" />
                        <DefaultInput id="client" label="Client" />
                      </>
                    )}
                    {workType === "CASESTUDY" && (
                      <DefaultInput
                        className="col-span-2"
                        id="title"
                        label="Case study title"
                      />
                    )}
                    <div className="grid grid-cols-2 gap-7">
                      <Select id="startDateMonth" label="Start month">
                        <option value="">Month</option>
                        {MONTHS.map(({ name, index }) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                      <Select id="startDateYear" label="Start year">
                        <option value="">Year</option>
                        {getYearsList()}
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-7">
                      <Select
                        id="endDateMonth"
                        label={
                          watch("endDateMonth") === "Present"
                            ? "End date"
                            : "End month"
                        }
                      >
                        <option value="Present">Present</option>
                        {MONTHS.map(({ name, index }) => (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        ))}
                      </Select>
                      {watch("endDateMonth") !== "Present" && (
                        <Select id="endDateYear" label="End year">
                          <option value="">Year</option>
                          {getYearsList(yearLimit)}
                        </Select>
                      )}
                    </div>
                    <DefaultInput
                      fullWidth={true}
                      className="col-span-2"
                      id="link"
                      label="Link to project"
                    />
                    {workType === "PROJECT" && (
                      <DefaultInput
                        fullWidth={true}
                        className="col-span-2"
                        id="stack"
                        label="Stacks, technologies, tools"
                      />
                    )}
                    <TextArea
                      label="Description"
                      id="description"
                      className="col-span-2"
                      subtext="Provide a summary to introduce yourself. This is your chance to sell yourself for future job opportunities and tell employers why you're the developer they've been looking for."
                    />
                  </>
                )}
              </div>
              <div className="flex justify-end gap-6">
                <PrimaryBtn
                  disabled={isLoading}
                  label={isLoading ? "Loading..." : "Submit"}
                />
              </div>
            </form>
          </FormProvider>
          <Close
            className="absolute right-[-64px] top-0 cursor-pointer"
            onClick={handleClose}
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateEdit;

CreateEdit.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
