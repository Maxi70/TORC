import { useEffect, useState } from "react";
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
import { JOB_TYPES, LOCATION_TYPES, MONTHS, getYearsList } from "../utils";

const createCareerSchema = Yup.object().shape({
  companyName: Yup.string().required("Required"),
  description: Yup.string(),

  title: Yup.string().required("Required"),
  startDateMonth: Yup.string().required("Required"),
  startDateYear: Yup.string().required("Required"),
  endDateMonth: Yup.string().required("Required"),

  // full time, part time, self employed
  format: Yup.string().required("Required"),

  // on site, remote, hybrid
  locationType: Yup.string().required("Required"),

  stack: Yup.string().required("Required"),
});

const CreateEdit = ({ isLoading, handleClose, onSubmit, experience }) => {
  const [yearLimit, setYearLimit] = useState();
  const methods = useForm({
    resolver: yupResolver(createCareerSchema),
    defaultValues: experience
      ? {
          ...experience,
          startDateMonth: moment(experience?.startDate).format("MMMM"),
          startDateYear: moment(experience?.startDate).format("YYYY"),
          endDateMonth:
            experience?.endDate === null
              ? "Present"
              : moment(experience?.endDate).format("MMMM"),
          endDateYear: experience?.endDate
            ? moment(experience?.endDate).format("YYYY")
            : "",
        }
      : {
          endDateMonth: "Present",
        },
    mode: "all",
  });

  const { watch } = methods;

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
            {experience ? "Edit" : "Create"} work experience
          </h4>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit, (err) =>
                console.error(err)
              )}
            >
              <div className="grid grid-cols-2 gap-7 w-[664px] mb-6">
                <DefaultInput id="title" label="Job Title" />
                <DefaultInput id="companyName" label="Company name" />

                <div className="grid grid-cols-2 gap-7">
                  <Select id="startDateMonth" label="Start month ">
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
                    disabled={
                      !watch("startDateYear") || !watch("startDateMonth")
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
                <Select id="format" label="Format">
                  <option value="">Please select</option>
                  {Object.entries(JOB_TYPES).map(([k, v]) => (
                    <option key={k} value={v}>
                      {k}
                    </option>
                  ))}
                </Select>
                <Select id="locationType" label="Location type">
                  <option value="">Please select</option>
                  {Object.entries(LOCATION_TYPES).map(([k, v]) => (
                    <option key={k} value={v}>
                      {k}
                    </option>
                  ))}
                </Select>
                <DefaultInput
                  fullWidth={true}
                  className="col-span-2"
                  id="stack"
                  label="Stacks, technologies, tools"
                />
                <TextArea
                  label="Intro paragraph"
                  id="description"
                  className="col-span-2"
                  subtext="Provide a summary to introduce yourself. This is your chance to sell yourself for future job opportunities and tell employers why you're the developer they've been looking for."
                />
              </div>
              <div className="flex justify-end gap-6">
                <PrimaryBtn
                  disabled={isLoading}
                  label={isLoading ? "Please wait..." : "Submit"}
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
