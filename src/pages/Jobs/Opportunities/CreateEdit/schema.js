import * as yup from "yup";

export const schema = (RATE_CONFIG, isAdmin) =>
  yup.object().shape({
    jobLengthInWeeks: yup
      .number()
      .min(4, `Please select a contract length of at least 4 weeks.`)
      .max(52, "Please provide a maximum contract length of no more than 52")
      .required(`Please select a contract length.`)
      .typeError(`Please select a contract length.`),
    requiredPositions: yup
      .number()
      .min(1, `Please select required positions of at least 1`)
      .max(25, "Please provide a maximum positions of no more than 25")
      .required(`Please select required positions.`)
      .typeError(`Please select required positions.`),
    jobTypeId: yup.string().required(`Please select a job role.`),
    minRate: yup
      .number()
      .min(
        RATE_CONFIG.min,
        `Please provide rate of at least ${RATE_CONFIG.min}.`
      )
      .max(
        RATE_CONFIG.max,
        `Please provide a maximum rate of no more than ${RATE_CONFIG.max}`
      )
      .required("Please provide a min rate")
      .typeError("Please provide a min rate"),
    maxRate: yup
      .number()
      .min(
        RATE_CONFIG.min,
        `Please provide rate of at least ${RATE_CONFIG.min}.`
      )
      .max(
        RATE_CONFIG.max,
        `Please provide a maximum rate of no more than ${RATE_CONFIG.max}`
      )
      .required("Please provide a max rate")
      .typeError("Please provide a max rate"),
    overview: yup
      .string()
      .required(`Please provide a job overview.`)
      .min(80, "Please provide an overview of at least 80 characters"),
    regions: yup
      .array()
      .of(yup.object().shape({ name: yup.string() }))
      .min(1, `Please select at least one region.`),
    requirements: yup
      .string()
      .required(`Please provide job requirements.`)
      .min(80, "Please provide requirements of at least 80 characters"),
    responsibilities: yup
      .string()
      .required(`Please provide job responsibilities.`)
      .min(80, "Please provide responsibilities of at least 80 characters"),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          id: yup.string().required(),
          infoUrl: yup.string().required(),
          name: yup.string().required(),
          type: yup
            .object()
            .shape({
              id: yup.string().required(),
              name: yup.string().required(),
            })
            .required(),
        })
      )
      .min(1, `Please select at least one skill.`),
    startDate: yup
      .date(`Please select a start date.`)
      .typeError(`Please select a start date.`),
    timeOverlap: yup
      .number()
      .typeError(`Please select a working time overlap.`),
    timeCommitment: yup
      .mixed()
      .oneOf([`PARTTIME`, `FULLTIME`], `Please choose a time commitment`),
    timezone: yup
      .object()
      .shape({
        label: yup.string().required("Please select a primary time zone"),
        value: yup.string().required("Please select a primary time zone"),
      })
      .required("Please select a primary time zone"),
    title: yup.string().required(`Please provide a job title.`),
    customerOwnerId: yup.string(),
    organization: yup.string().when("isAdmin", {
      is: true,
      then: yup.string().required("Please enter an organization"),
      otherwise: yup.string(),
    }),
    isAdmin: yup.boolean().default(isAdmin),
    shortDescription: yup
      .string()
      .trim()
      .required("Please provide a Short Description"),
  });
