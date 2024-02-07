import { useState, useEffect, useRef, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useDebounce } from "usehooks-ts";
import { useAuth } from "GlobalAuthContext";
import moment from "moment";
import classNames from "classnames";

import { yupResolver } from "@hookform/resolvers/yup";
import { API, graphqlOperation, Auth } from "aws-amplify";

import Footer from "components/Footer";
import Header from "components/Header";
import Select from "components/FormComponents/Select";
import Radio from "components/FormComponents/Radio";
import Input from "components/FormComponents/Input";
import Button from "components/FormComponents/Button";
import SkillSearch from "components/FormComponents/SkillSearch";
import InfoPopover from "components/FormComponents/InfoPopover";
import TimezoneSelect from "components/FormComponents/TimezoneSelect";
import Textarea from "components/FormComponentsNew/Textarea";
import {
  getJobOpportunity,
  getUsersByCompany,
  listJobTypes,
  generateJobShortDescription,
} from "graphql/queries";
import { createJobOpportunity, updateJobOpportunity } from "graphql/mutations";
import FormError from "components/FormComponents/FormError";
import RegionSearch from "components/FormComponents/RegionSearch";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownEditor from "components/FormComponents/MarkdownEditor";
import ConfirmationModal from "./ConfirmationModal";
import JobPageWrapper from "pages/Jobs/Opportunities/JobPageWrapper";
import { DRAFT_JOB_KEY, JOB_OPPORTUNITY_STATUSES } from "lookup";
import rightArrow from "images/right-arrow.png";
import { ReactComponent as OpenAIICon } from "images/openai-icon.svg";
import { schema } from "./schema";

const RATE_CONFIG = {
  min: 1,
  max: 300,
  defaultMin: 45,
  defaultMax: 150,
};

const SHORT_DESCRIPTION_VALIDATION_FIELDS = [
  "jobTypeId",
  "title",
  "overview",
  "skills",
  "responsibilities",
  "requirements",
  "regions",
];

export default function CreateEditJobOpps() {
  const history = useHistory();
  const params = useParams();
  const { user } = useAuth();

  const isCancelled = useRef();
  const [initializingForm, setInitializingForm] = useState(true);
  const [formData, setFormData] = useState({
    organization: "",
    overview: "",
    responsibilities: `* bullet one\n* bullet two\n* bullet three\n`,
    requirements: `* bullet one\n* bullet two\n* bullet three\n`,
    timezone: { label: "", value: "" },
    minRate: RATE_CONFIG.defaultMin,
    maxRate: RATE_CONFIG.defaultMax,
    requiredPositions: 1,
    jobLengthInWeeks: 12,
    customerOwnerId: "",
    regions: [
      { name: "Africa" },
      { name: "Asia" },
      { name: "Australia" },
      { name: "Eastern Europe" },
      { name: "North America" },
      { name: "South America" },
      { name: "Western Europe" },
    ],
    shortDescription: "",
  });
  const [jobTypes, setJobTypes] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [confirmingAction, setConfirmingAction] = useState(false);
  const [saveAsPreview, setSaveAsPreview] = useState(false);
  const [saveAsDraft, setSaveAsDraft] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [fetchedJobTypes, setFetchedJobTypes] = useState(false);
  const [cognitoGroups, setCognitoGroups] = useState([]);
  const [requiredPositions, setRequiredPositions] = useState(
    formData.requiredPositions || 1
  );
  const [jobLengthInWeeks, setJobLengthInWeeks] = useState(
    formData.jobLengthInWeeks || 12
  );
  const [customerOwners, setCustomerOwners] = useState([]);
  const [shortDescriptionObj, setShortDescriptionObj] = useState({ words: 0 });
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isGeneratedDescription, setIsGeneratedDescription] = useState(false);
  const options = ["LIMITED", "PUBLIC", "PRIVATE"];
  const [visibility, setVisibility] = useState("");

  const overviewRef = useRef();
  const responsibilitiesRef = useRef();
  const requirementsRef = useRef();
  const skillsRef = useRef();
  const timeZoneRef = useRef();

  // Fetch groups the logged in user belongs to
  useEffect(() => {
    (async () => {
      try {
        const auth = await Auth.currentSession();

        const groups = auth.getAccessToken().payload["cognito:groups"] || [];
        setCognitoGroups(groups);
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();
  }, []);

  const isAdmin = useCallback(() => {
    return (
      cognitoGroups.includes(process.env.REACT_APP_COGNITO_ADMIN_GROUP) ||
      cognitoGroups.includes(process.env.REACT_APP_COGNITO_GROUP_JOB_MANAGERS)
    );
  }, [cognitoGroups]);

  const handleChange = (event) => {
    setVisibility(event.target.value);
  };

  const fetchExistingJobOpp = async (id) => {
    try {
      const res = await API.graphql(
        graphqlOperation(getJobOpportunity, { id })
      );

      if (!res?.data?.getJobOpportunity) history.push("/404");

      const existingJobOpp = postFetchFormat(res.data.getJobOpportunity);
      // Fetch any unsaved changes
      let draftData = localStorage.getItem(DRAFT_JOB_KEY);

      draftData = JSON.parse(draftData);
      let unsavedData;

      if (draftData) unsavedData = draftData.find((d) => d.id === id);

      if (!unsavedData) unsavedData = {};
      else if (!isCancelled.current) setHasUnsavedChanges(true);

      if (!isCancelled.current) {
        setFormData({ ...existingJobOpp, ...unsavedData });
        setInitializingForm(false);
      }
    } catch (err) {
      console.log("Error when fetching existing job opportunity");
      console.log(err);
    }
  };

  const fetchDraftJobOpp = () => {
    let draftData = localStorage.getItem(DRAFT_JOB_KEY);
    if (!isCancelled.current) {
      if (draftData) {
        draftData = JSON.parse(draftData);
        // Look for the record where there's no id
        const newData = draftData.find((d) => !d.id);

        if (newData) {
          // Timezone has changed from a string to object data type.
          // Provide backward compatibility
          if (newData.timezone && !newData.timezone.value) {
            newData.timezone = { label: "", value: "" };
          }
          setFormData(newData);
        }
      }
      setInitializingForm(false);
    }
  };

  const methods = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema(RATE_CONFIG, isAdmin())),
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    trigger,
    watch,
    resetField,
    clearErrors,
    formState: { errors, isDirty },
  } = methods;

  const watchOrganization = watch("organization");
  const debounceOrganization = useDebounce(watchOrganization, 1000);

  const save = async (_data) => {
    const data = { ..._data };

    data.minRate = { currency: "USD", value: data.minRate };
    data.maxRate = { currency: "USD", value: data.maxRate };
    delete data.isAdmin;

    data.regions = data.regions?.map((region) => region.name);

    data.startDate = data.startDate
      ? moment(data.startDate).format(`YYYY-MM-DD`)
      : null;

    // Ensure that we don't pass empty string
    data.timeOverlap = data.timeOverlap || null;

    // If there's no status set, set it to DRAFT
    if (!formData.status) {
      data.status = JOB_OPPORTUNITY_STATUSES.DRAFT;
    }

    // If there's no visibility set, set it to LIMITED
    if (!data.visibilityLevel) {
      data.visibilityLevel = "LIMITED";
    }

    data.organization = data.organization.trim();

    if (!isGeneratedDescription) {
      const generatedShortDescription = await generateDescription(
        data.shortDescription
      );
      data.shortDescription = generatedShortDescription.trim();
    } else data.shortDescription = data.shortDescription.trim();

    data.customerOwner = customerOwners?.find(
      (c) => c.id === data.customerOwnerId
    );

    delete data.customerOwnerId;
    let job;

    if (data.id) {
      job = await API.graphql(
        graphqlOperation(updateJobOpportunity, { input: data })
      );

      return job.data.updateJobOpportunity.id;
    } else {
      job = await API.graphql(
        graphqlOperation(createJobOpportunity, { input: data })
      );

      return job.data.createJobOpportunity.id;
    }
  };

  const handleOnErrors = () => {
    (errors?.overview?.message ||
      errors?.responsibilities?.message ||
      errors?.requirements?.message ||
      errors?.skills?.message ||
      errors?.timezone?.message) &&
      setTimeout(() => {
        scrollTextAreaIntoViewOnError();
      }, 5);
  };

  const onPreview = async (_data) => {
    setSaveAsPreview(true);
    const jobId = await save(_data);
    let currentRecords;

    try {
      currentRecords = JSON.parse(localStorage.getItem(DRAFT_JOB_KEY)) || [];
    } catch (err) {
      console.log(
        "Error when fetching currently saved records in local storage during save"
      );
      console.log(err);

      history.push(`/jobs/opportunities/${jobId}/preview`);

      return;
    }

    if (currentRecords.length !== 0) {
      if (formData.id) {
        currentRecords = currentRecords.filter((f) => f.id !== formData.id);
      } else {
        currentRecords = currentRecords.filter((f) => f.id);
      }
    }

    localStorage.setItem(DRAFT_JOB_KEY, JSON.stringify(currentRecords));

    let previewUrl = `/jobs/opportunities/${jobId}/preview`;
    if (!formData.id) {
      previewUrl += "?origin=create";
    }

    history.push(previewUrl);
  };

  const onDraft = async (_data) => {
    const data = { ..._data };
    setSaveAsDraft(true);
    const jobId = await save(data);
    let currentRecords;

    try {
      currentRecords = JSON.parse(localStorage.getItem(DRAFT_JOB_KEY)) || [];
    } catch (err) {
      console.log(
        "Error when fetching currently saved records in local storage during save"
      );
      console.log(err);

      history.push(`/jobs/opportunities/${jobId}/saved`);

      return;
    }

    if (currentRecords.length !== 0) {
      if (formData.id) {
        currentRecords = currentRecords.filter((f) => f.id !== formData.id);
      } else {
        currentRecords = currentRecords.filter((f) => f.id);
      }
    }

    localStorage.setItem(DRAFT_JOB_KEY, JSON.stringify(currentRecords));

    history.push(`/jobs/opportunities/${jobId}/saved`);
  };

  const saveDraft = async () => {
    const result = await trigger("jobTypeId", { shouldFocus: true });
    const organizationResult = await trigger("organization", {
      shouldFocus: true,
    });

    if (result && organizationResult) {
      await onDraft({
        ...getValues(),
      });
    }
  };

  const delJobOpp = async () => {
    if (formData.id) {
      await API.graphql(
        graphqlOperation(updateJobOpportunity, {
          input: { id: formData.id, status: JOB_OPPORTUNITY_STATUSES.DELETED },
        })
      );
    } else {
      localStorage.removeItem(DRAFT_JOB_KEY);
    }
    setConfirmingAction(false);

    if (formData.id) {
      history.push(`/jobs/opportunities/${formData.id}/deleted`);
    } else {
      history.push(`/jobs/opportunities/deleted`);
    }
  };

  const cancelJobOpp = async () => {
    await API.graphql(
      graphqlOperation(updateJobOpportunity, {
        input: { id: formData.id, status: JOB_OPPORTUNITY_STATUSES.CANCELLED },
      })
    );
    setConfirmingAction(false);

    history.push(`/jobs/opportunities/${formData.id}/confirmation`);
  };

  const restoreJobOpp = async () => {
    await API.graphql(
      graphqlOperation(updateJobOpportunity, {
        input: {
          id: formData.id,
          status: JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL,
        },
      })
    );
    setConfirmingAction(false);

    history.push(`/jobs/opportunities/${formData.id}/confirmation`);
  };

  const onConfirmAction = async () => {
    setConfirmingAction(true);

    switch (formData.status) {
      case JOB_OPPORTUNITY_STATUSES.ACTIVE:
        return cancelJobOpp();
      case JOB_OPPORTUNITY_STATUSES.CANCELLED:
        return restoreJobOpp();
      default:
        return delJobOpp();
    }
  };

  // Format the form data after fetching it
  // for some input fields (like region) to handle it better
  // Ex. Region field uses useFieldArray hook, which requires the
  // data to be in { id, name } format, but our db only stores it
  // as a string. This function converts it to the format that
  // useFieldArray expects it to be in
  const postFetchFormat = (jobData) => {
    if (!jobData?.regions) jobData.regions = [];
    if (jobData?.regions?.length > 0) {
      jobData.regions = jobData?.regions?.map((r) => ({ id: r, name: r }));
    }

    if (!jobData.skills) {
      jobData.skills = [];
    }

    if (!jobData.jobLengthInWeeks && !!jobData.jobLength) {
      jobData.jobLengthInWeeks = jobData.jobLength * 4;
    }

    const {
      id,
      customerOwner,
      jobLengthInWeeks,
      jobTypeId,
      organization,
      overview,
      minRate,
      maxRate,
      regions,
      requirements,
      requiredPositions,
      responsibilities,
      shortDescription,
      skills,
      startDate,
      status,
      timeCommitment,
      timeOverlap,
      timezone,
      title,
      visibilityLevel,
    } = jobData;

    return {
      id,
      customerOwnerId: customerOwner?.id,
      jobLengthInWeeks,
      jobTypeId,
      organization,
      overview,
      minRate: minRate.value,
      maxRate: maxRate.value,
      regions,
      requirements,
      requiredPositions,
      responsibilities,
      shortDescription,
      skills,
      startDate,
      status,
      timeCommitment,
      timeOverlap,
      timezone,
      title,
      visibilityLevel,
    };
  };

  const saveFormPeriodically = (data) => {
    let currentRecords;

    try {
      currentRecords = JSON.parse(localStorage.getItem(DRAFT_JOB_KEY)) || [];
    } catch (err) {
      console.log(
        "Error when fetching currently saved records in local storage"
      );
      console.log(err);

      return;
    }

    if (currentRecords.length === 0) {
      if (formData.id) {
        currentRecords = [{ id: formData.id, ...data }];
      } else {
        currentRecords = [{ ...data }];
      }
    } else {
      if (formData.id) {
        let exists = false;

        currentRecords = currentRecords.map((c) => {
          if (c.id && c.id === formData.id) {
            exists = true;
            return { id: formData.id, ...data };
          }
          return c;
        });

        if (!exists) {
          currentRecords.push({ ...formData });
        }
      } else {
        currentRecords = currentRecords?.map((c) => {
          if (!c.id) {
            return { ...data };
          }
          return c;
        });
      }
    }

    localStorage.setItem(DRAFT_JOB_KEY, JSON.stringify(currentRecords));
  };

  const viewJobs = () => {
    history.push("/jobs/opportunities");
  };

  const fetchJobOpp = async (p) => {
    if (p?.id) {
      await fetchExistingJobOpp(p.id);
    } else {
      fetchDraftJobOpp();
    }
  };

  const watchShortDescription = watch("shortDescription");

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setShortDescriptionObj((prev) => ({
        ...prev,
        words: value.shortDescription?.trim()
          ? getValues("shortDescription").trim().split(/\s+/).length
          : 0,
      }));
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchShortDescription]);

  useEffect(() => {
    if (cognitoGroups.length > 0 && !isAdmin()) {
      (async () => {
        try {
          const { data } = await API.graphql(
            graphqlOperation(getUsersByCompany, { company: user.company })
          );
          if (data?.getUsersByCompany?.items?.length > 0)
            setCustomerOwners(data.getUsersByCompany.items);
          else setCustomerOwners({ id: user.id, company: user.company });
          resetField("customerOwnerId");
        } catch (error) {
          console.error("Error fetching users by company:", error);
        }
      })();
    }
  }, [isAdmin, user, cognitoGroups, resetField]);

  const handleRateChange = (e, valueKey) => {
    const { onChange } = register(valueKey);

    const value = +e.target.value || 0;
    const oppositeKey = valueKey === "minRate" ? "maxRate" : "minRate";
    const oppositeValue = +getValues(oppositeKey);

    const isOppositeValueValid = (() => {
      let isValid = true;

      if (!oppositeValue) {
        isValid = false;
      }

      if (valueKey === "minRate" && value > oppositeValue) {
        isValid = false;
      }

      if (valueKey === "maxRate" && value < oppositeValue) {
        isValid = false;
      }

      return isValid;
    })();

    if (!isOppositeValueValid) {
      setValue(oppositeKey, value);
    }

    setValue(valueKey, value);
    onChange({ ...e, target: { ...e.target, value } });
  };

  const handleNumberFieldChange = (e, valueKey) => {
    const { onChange } = register(valueKey);

    const value = +e.target.value || 0;

    setValue(valueKey, value);
    onChange({ ...e, target: { ...e.target, value } });
  };

  // Determine if we are editing a job opportunity or creating a new one
  useEffect(() => {
    isCancelled.current = false;
    let isMounted = true;

    if (fetchedJobTypes) {
      // Job titles were fetched - just fetch the job opp
      (async () => {
        await fetchJobOpp(params);
      })();
    } else {
      (async () => {
        // First fetch job titles

        const res = await API.graphql(
          graphqlOperation(listJobTypes, { filter: { isActive: { eq: true } } })
        );

        if (isMounted) {
          setFetchedJobTypes(true);
          setJobTypes(res.data.listJobTypes.items);
        }

        // Next, proceed to fetch job opp
        await fetchJobOpp(params);
      })();
    }
    if (
      params?.id
        ? (document.title = `Editing Job ${params.id}`)
        : (document.title = `Creating Job`)
    );
    return () => {
      isCancelled.current = true;
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Reset form if form data changes
  useEffect(() => {
    let isMounted = true;
    reset(formData);

    // Users cannot edit jobs under certain statuses
    if (
      (formData.status === JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL ||
        formData.status === JOB_OPPORTUNITY_STATUSES.ACTIVE ||
        formData.status === JOB_OPPORTUNITY_STATUSES.CANCELLED ||
        formData.status === JOB_OPPORTUNITY_STATUSES.FULFILLED) &&
      isMounted
    ) {
      setIsReadOnly(true);
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  // Warn before leaving page
  useEffect(() => {
    function warn(evt) {
      if (isDirty && !isReadOnly) {
        evt.preventDefault();
        evt.returnValue = `You have unsaved changes. Are you sure you want to leave?`;
      }
    }

    window.addEventListener(`beforeunload`, warn);
    return () => window.removeEventListener(`beforeunload`, warn);
  }, [isDirty, isReadOnly]);

  // Save the form every few seconds
  useEffect(() => {
    let savePeriodically;

    if (isDirty && !isReadOnly) {
      savePeriodically = setInterval(() => {
        const formValues = getValues();

        saveFormPeriodically(formValues);
      }, 10000); // 10 seconds
    }

    return () => {
      clearInterval(savePeriodically);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, isReadOnly, getValues]);

  useEffect(
    () => setRequiredPositions(formData.requiredPositions),
    [formData.requiredPositions]
  );

  useEffect(
    () => setJobLengthInWeeks(formData.jobLengthInWeeks),
    [formData.jobLengthInWeeks]
  );

  useEffect(() => {
    if (!debounceOrganization) return;
    (async () => {
      const { data } = await API.graphql(
        graphqlOperation(getUsersByCompany, { company: debounceOrganization })
      );

      setCustomerOwners(data?.getUsersByCompany?.items);
      resetField("customerOwnerId");
    })();
  }, [debounceOrganization, resetField]);

  useEffect(() => {
    if (cognitoGroups.length > 0 && !isAdmin() && customerOwners.length <= 1)
      setValue("customerOwnerId", user?.id);
  }, [user, isAdmin, setValue, customerOwners, cognitoGroups]);

  if (initializingForm) {
    return (
      <div>
        <Header />
        <JobPageWrapper>
          <div className="flex justify-center h-96">
            <span className="loader"></span>
          </div>
        </JobPageWrapper>
        <Footer />
      </div>
    );
  }

  let confirmationActionText;

  if (formData.status === JOB_OPPORTUNITY_STATUSES.ACTIVE) {
    confirmationActionText = "Cancel Job";
  } else if (formData.status === JOB_OPPORTUNITY_STATUSES.CANCELLED) {
    confirmationActionText = "Restore Job";
  } else {
    confirmationActionText = "Delete Job";
  }

  let cannotEditText;

  if (formData.status === JOB_OPPORTUNITY_STATUSES.ACTIVE) {
    cannotEditText =
      "This job is active. While you can Cancel it, you cannot make any other changes to it.";
  } else if (formData.status === JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL) {
    cannotEditText =
      "This job is pending approval. You cannot make any changes to it.";
  } else if (formData.status === JOB_OPPORTUNITY_STATUSES.CANCELLED) {
    cannotEditText = "This job is canceled. You cannot make any changes to it.";
  } else if (formData.status === JOB_OPPORTUNITY_STATUSES.FULFILLED) {
    cannotEditText =
      "This job is completed. You cannot make any changes to it.";
  }

  const scrollTextAreaIntoViewOnError = () => {
    if (saveAsDraft) return;
    if (errors.jobTypeId?.message || errors.title?.message) return;

    if (errors?.overview?.message) {
      return overviewRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (errors.responsibilities?.message) {
      return responsibilitiesRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (errors.requirements?.message) {
      return requirementsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (errors.skills?.message) {
      return skillsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (errors.timezone?.message) {
      return timeZoneRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const generateDescription = async (previousValue) => {
    const errorMessage = "Something went wrong. Please try again later";
    try {
      const { data } = await API.graphql(
        graphqlOperation(generateJobShortDescription, {
          jobDetails: JSON.stringify(getValues()),
        })
      );
      if (data.generateJobShortDescription === null) {
        throw new Error(errorMessage);
      } else {
        setValue(
          "shortDescription",
          data.generateJobShortDescription.shortDescription
        );
        setIsGeneratedDescription(true);
        return data.generateJobShortDescription.shortDescription;
      }
    } catch (err) {
      console.log(err);
      setShortDescriptionObj((prev) => ({
        ...prev,
        errorMessage,
      }));
      setValue("shortDescription", previousValue || "");
      return previousValue;
    }
  };

  const handleGenerateDescription = async (e) => {
    e.preventDefault();
    setIsGeneratingDescription(true);

    if (shortDescriptionObj.errorMessage) {
      setShortDescriptionObj((prev) => ({
        ...prev,
        errorMessage: null,
      }));
    }
    if (errors.shortDescription?.message) clearErrors("shortDescription");

    if (
      await trigger(SHORT_DESCRIPTION_VALIDATION_FIELDS, { shouldFocus: true })
    ) {
      setValue(
        "shortDescription",
        "Your AI-generated job description is on its way! \nJust a moment as we process the job details..."
      );
      await generateDescription(getValues("shortDescription"));
    } else {
      handleOnErrors();
    }

    setIsGeneratingDescription(false);
  };

  const handleOnChangeForm = () => {
    for (const field of SHORT_DESCRIPTION_VALIDATION_FIELDS) {
      if (errors[field]?.message) {
        return trigger(SHORT_DESCRIPTION_VALIDATION_FIELDS);
      }
    }
  };

  return (
    <div>
      <Header />
      <JobPageWrapper>
        <FormProvider {...methods}>
          <form
            className="max-w-2xl mx-auto my-6 md:my-12 px-4 flex flex-col gap-8 pb-12"
            onSubmit={handleSubmit(onPreview, handleOnErrors)}
            onChange={handleOnChangeForm}
          >
            {(isReadOnly || hasUnsavedChanges) && (
              <div
                className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
                role="alert"
              >
                <svg
                  className="w-5 h-5 inline mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div>
                  {isReadOnly && (
                    <>
                      <span className="font-medium">NOTE:</span>{" "}
                      {cannotEditText}
                    </>
                  )}
                  {hasUnsavedChanges && (
                    <>
                      <span className="font-medium">NOTE:</span> This job has
                      unsaved changes. Be sure to save as draft or preview to
                      save the changes.
                    </>
                  )}
                </div>
              </div>
            )}
            <div className="flex items-start flex-col md:flex-row gap-4 md:gap-12">
              <div>
                <h1 className="text-3xl font-bold">
                  {params?.id && "Edit"}
                  {!params?.id && "Post a new"}&nbsp;job
                </h1>
                <p>
                  Let's start building your team. Tell us a little about the
                  position so we can find the perfect developer match.
                </p>
              </div>
            </div>
            {isAdmin() && (
              <Section>
                <Label>
                  Company
                  <InfoPopover>
                    The company to associate this job with (for team access). If
                    unspecified, it will default to the company associated with
                    your own account.
                  </InfoPopover>
                </Label>
                <Input {...register(`organization`)} isReadOnly={isReadOnly} />
                <FormError>{errors.organization?.message}</FormError>
              </Section>
            )}

            {(isAdmin() || customerOwners?.length > 1) && (
              <Section>
                <Label>Customer Owner</Label>
                <Select {...register(`customerOwnerId`)}>
                  <option value="">Select customer owner</option>
                  {customerOwners?.map(({ id, username }) => (
                    <option key={id} value={id}>
                      {username}
                    </option>
                  ))}
                </Select>
                <FormError>{errors.customerOwnerId?.message}</FormError>
              </Section>
            )}
            <Section>
              <Label>
                Job role
                <InfoPopover>
                  Select the job role that best describes your ideal developer.
                  We use job roles to assess and qualify developers in our
                  community so we can expedite the matching process.
                </InfoPopover>
              </Label>
              <Select {...register(`jobTypeId`)} isReadOnly={isReadOnly}>
                <option value="">Select job role</option>
                {jobTypes?.map(({ id, title }) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
              </Select>
              <FormError>{errors.jobTypeId?.message}</FormError>
            </Section>
            <Section>
              <Label>
                Job title{" "}
                <InfoPopover>
                  A clear and descriptive job title can make all the difference.
                </InfoPopover>
              </Label>
              <Input {...register(`title`)} isReadOnly={isReadOnly} />
              <FormError>{errors.title?.message}</FormError>
            </Section>
            <Section>
              <div ref={overviewRef} />

              <Label>
                Job overview
                <InfoPopover>
                  Use this space to provide information about the position that
                  will attract top developers. One or two short paragraphs
                  usually works best. Potential topics include:
                  <li>Description of your company</li>
                  <li>General description of the position</li>
                  <li>
                    The team the developer will be joining, as well as other
                    teams they'll be working with
                  </li>
                  <li>
                    {" "}
                    Any unique or interesting characteristics about your company
                    or the position
                  </li>
                </InfoPopover>
              </Label>
              <MarkdownEditor
                name="overview"
                control={control}
                isReadOnly={isReadOnly}
              />
              <FormError>{errors.overview?.message}</FormError>
            </Section>
            <Section>
              <div ref={responsibilitiesRef} />
              <Label>
                Job responsibilities
                <InfoPopover>
                  In bullet point format, describe the activities and
                  deliverables the developer is responsible for completing.
                  Clear and specific responsibilities attract more developers.{" "}
                  <br />
                  <br />
                  We recommend 5-7 bullet points
                </InfoPopover>
              </Label>
              <MarkdownEditor
                name="responsibilities"
                control={control}
                isReadOnly={isReadOnly}
              />
              <FormError>{errors.responsibilities?.message}</FormError>
            </Section>
            <Section>
              <div ref={requirementsRef} />
              <Label>
                Job requirements
                <InfoPopover>
                  In bullet point format, describe the requirements for this
                  job. We recommend 5-7 bullet points.
                  <br />
                  <br />
                  Keep in mind that it's easy to turn away developers with
                  unclear, overly complex, or unrealistic requirements. Below
                  are a few specific recommendations based on feedback from our
                  community and review of successful job postings:
                  <li>
                    Years of experience is no longer an accurate measure of a
                    developer's skill level. We do not recommend including an
                    experience requirement, but instead ensure your other
                    requirements accurately reflect the skill level that is
                    needed for the developer to be successful.
                  </li>
                  <li>
                    Clearly denote 'optional' or 'nice-to-have' requirements
                  </li>
                </InfoPopover>
              </Label>
              <MarkdownEditor
                name="requirements"
                control={control}
                isReadOnly={isReadOnly}
              />
              <FormError>{errors.requirements?.message}</FormError>
            </Section>
            <Section>
              <div ref={skillsRef} />
              <Label>
                Skills{" "}
                <InfoPopover>
                  Add all required skills for the job. <br />
                  <br />
                  To add skills, begin typing the skill name and select the
                  appropriate skill from the resulting list. Add additional
                  skills using the same method.
                </InfoPopover>
              </Label>
              <SkillSearch
                name="skills"
                control={control}
                register={register}
                isReadOnly={isReadOnly}
              />
              <FormError>{errors.skills?.message}</FormError>
            </Section>
            <Section>
              <Label>
                Hourly rate range
                <InfoPopover>
                  Use the fields below to select the minimum and maximum hourly
                  rates for this job. This is used to screen developers who have
                  set their rates above or below your desired range. We
                  recommend setting a wider range so as not to screen out
                  qualified developers. This is especially important if you're
                  unsure of the current market rate for your job.
                </InfoPopover>
              </Label>
              <div className="flex w-full">
                <div className="flex flex-col gap-2 w-1/2 mr-3">
                  <div className="flex items-center w-full">
                    <span className="mr-2">Min</span>

                    <Input
                      className="w-full"
                      type="number"
                      isReadOnly={isReadOnly}
                      {...register("minRate")}
                      onBlur={(e) => handleRateChange(e, "minRate")}
                    />

                    <span className="ml-2">$</span>
                  </div>

                  <FormError>{errors.minRate?.message}</FormError>
                </div>

                <div className="flex flex-col gap-2 w-1/2 ml-3">
                  <div className="flex items-center w-full">
                    <span className="mr-2">Max</span>

                    <Input
                      className="w-full"
                      type="number"
                      isReadOnly={isReadOnly}
                      name="maxRate"
                      {...register("maxRate")}
                      onBlur={(e) => handleRateChange(e, "maxRate")}
                    />

                    <span className="ml-2">$</span>
                  </div>

                  <FormError>{errors.maxRate?.message}</FormError>
                </div>
              </div>
            </Section>
            <Section>
              <Label>
                Time commitment{" "}
                <InfoPopover>
                  Select whether your job is Full-time (40 hours per week) or
                  Half-time (20 hours per week).
                </InfoPopover>
              </Label>
              <div className="flex gap-8">
                <div>
                  <Radio
                    value="FULLTIME"
                    {...register(`timeCommitment`)}
                    isReadOnly={isReadOnly}
                  />
                  <label>Full-time</label>
                </div>
                <div>
                  <Radio
                    value="PARTTIME"
                    {...register(`timeCommitment`)}
                    isReadOnly={isReadOnly}
                  />
                  <label>Half-time</label>
                </div>
              </div>
              <FormError>{errors.timeCommitment?.message}</FormError>
            </Section>
            <Section>
              <Label>
                Positions <InfoPopover>Number of Open Positions. </InfoPopover>
              </Label>
              <div className="flex w-full">
                <div className="flex flex-col gap-2 w-full mr-3">
                  <div className="flex items-center w-full">
                    <Input
                      className="w-11/12"
                      type="number"
                      isReadOnly={isReadOnly}
                      {...register("requiredPositions")}
                      onBlur={(e) =>
                        handleNumberFieldChange(e, "requiredPositions")
                      }
                    />

                    <span className="ml-2 text-right w-max">
                      {requiredPositions > 1 ? "positions" : "position"}
                    </span>
                  </div>

                  <FormError>{errors.requiredPositions?.message}</FormError>
                </div>
              </div>
            </Section>
            <Section>
              <Label>
                Contract length{" "}
                <InfoPopover>
                  We can accommodate contracts as short as 4 weeks and as long
                  as 52 weeks.{" "}
                </InfoPopover>
              </Label>
              <div className="flex w-full">
                <div className="flex flex-col gap-2 w-full mr-3">
                  <div className="flex items-center w-full">
                    <Input
                      className="w-11/12"
                      type="number"
                      isReadOnly={isReadOnly}
                      {...register("jobLengthInWeeks")}
                      onBlur={(e) =>
                        handleNumberFieldChange(e, "jobLengthInWeeks")
                      }
                    />

                    <span className="ml-2 text-right w-max">
                      {jobLengthInWeeks > 1 ? "weeks" : "week"}
                    </span>
                  </div>

                  <FormError>{errors.jobLengthInWeeks?.message}</FormError>
                </div>
              </div>
            </Section>
            <Section>
              <Label>
                Desired start date
                <InfoPopover>
                  On which date would you like your developer to begin working?
                  Please choose today's date if you would like to post this job
                  with an “Immediate” start date.
                </InfoPopover>
              </Label>
              <Input
                type="date"
                focusDatePicker
                {...register(`startDate`)}
                isReadOnly={isReadOnly}
              />
              <FormError>{errors.startDate?.message}</FormError>
            </Section>
            <Section>
              <div ref={timeZoneRef} />
              <Label>
                Primary time zone
                <InfoPopover>
                  Select the time zone where your company (or the team with
                  which the developer will work) is located.
                </InfoPopover>
              </Label>
              <TimezoneSelect
                name="timezone"
                control={control}
                isReadOnly={isReadOnly}
              />
              <FormError>{errors.timezone?.value?.message}</FormError>
            </Section>
            <Section>
              <Label>
                Working time overlap{" "}
                <InfoPopover>
                  Select the amount of overlap you require between your primary
                  time zone and that of your developer.
                  <li>Full - developer must work on my time zone</li>
                  <li>At least 4 hours of overlap each workday</li>
                  <li>At least 2 hours of overlap each workday</li>
                  <li>No overlap required</li>
                </InfoPopover>
              </Label>
              <Select {...register(`timeOverlap`)} isReadOnly={isReadOnly}>
                <option value="">Select time overlap</option>
                {/* Seems like a bug with amplify that replaces the value 0 with null when passing input in the api */}
                <option value={-1}>No restriction</option>
                <option value={2}>2 hours</option>
                <option value={4}>4 hours</option>
                <option value={8}>All hours</option>
              </Select>
              <FormError>{errors.timeOverlap?.message}</FormError>
            </Section>
            <Section>
              <Label>
                Developer location{" "}
                <InfoPopover>
                  Select all regions where your developer may reside
                </InfoPopover>
              </Label>
              <RegionSearch
                name="regions"
                control={control}
                register={register}
                isReadOnly={isReadOnly}
              />
              <FormError>{errors.regions?.message}</FormError>
            </Section>
            <Section>
              <Label>
                Short Description
                <InfoPopover>
                  <p>Provide a short description of your job.</p>
                  <p>
                    Click the black icon to let the magic of AI generate one for
                    you!
                  </p>
                </InfoPopover>
              </Label>
              <div
                className={classNames({
                  "animate-pulse": isGeneratingDescription,
                })}
              >
                <Textarea
                  id="shortDescription"
                  value={getValues("shortDescription")}
                  isReadOnly={isReadOnly || isGeneratingDescription}
                  bgColor={isGeneratingDescription ? "bg-gray-100" : ""}
                  paddingRight="16"
                  onChange={({ target }) => {
                    if (target.value.trim().split(/\s+/).length <= 250) {
                      setValue("shortDescription", target.value);
                      setIsGeneratedDescription(false);
                    } else {
                      setValue(
                        "shortDescription",
                        getValues("shortDescription")
                      );
                    }

                    if (errors.shortDescription?.message)
                      clearErrors("shortDescription");
                  }}
                  rows={9}
                  className={classNames(
                    "p-1 pb-0 bg-gradient-to-r from-[#83D9BB] to-[#F4D675] rounded-[10px]"
                  )}
                  borderColor="transparent"
                >
                  {!isReadOnly && (
                    <button
                      onClick={handleGenerateDescription}
                      disabled={isGeneratingDescription}
                    >
                      <OpenAIICon
                        title="Click to generate"
                        className={classNames(
                          "absolute top-3 right-[25px] w-[40px] h-[40px]",
                          {
                            "animate-spin": isGeneratingDescription,
                          }
                        )}
                      />
                    </button>
                  )}
                </Textarea>
              </div>
              <div
                className={classNames("flex justify-end", {
                  "justify-between": errors.shortDescription?.message,
                })}
              >
                <FormError>{errors.shortDescription?.message}</FormError>
                {!isGeneratingDescription && (
                  <p>
                    {shortDescriptionObj.words} / 250{" "}
                    <span className="text-xs">words</span>
                  </p>
                )}
              </div>
              <div
                className={classNames("flex justify-end", {
                  "justify-between": shortDescriptionObj.errorMessage,
                })}
              >
                <FormError> {shortDescriptionObj.errorMessage}</FormError>
              </div>
            </Section>
            {isAdmin() && (
              <Section>
                <Label>
                  Visibility{" "}
                  <InfoPopover>
                    Limited means only Professional Community members can see
                    it, Public means anyone with the corresponding Job Role can
                    see it, Private means only Matched candidates can see it
                  </InfoPopover>
                </Label>
                <Select
                  {...register(`visibilityLevel`)}
                  isReadOnly={isReadOnly}
                  value={visibility}
                  onChange={handleChange}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Section>
            )}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                <div className="sm:block flex flex-col">
                  {(!formData.status ||
                    formData.status === JOB_OPPORTUNITY_STATUSES.DRAFT) && (
                    <Button
                      onClick={saveDraft}
                      isReadOnly={isGeneratingDescription}
                    >
                      {saveAsDraft ? "Saving..." : "Save draft"}
                    </Button>
                  )}
                  {(formData.status === JOB_OPPORTUNITY_STATUSES.ACTIVE ||
                    formData.status === JOB_OPPORTUNITY_STATUSES.CANCELLED ||
                    formData.status === JOB_OPPORTUNITY_STATUSES.FULFILLED ||
                    formData.status ===
                      JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL) && (
                    <Button
                      onClick={() => void viewJobs()}
                      isReadOnly={isGeneratingDescription}
                    >
                      View My Jobs
                    </Button>
                  )}
                  {formData.status &&
                    formData.status !== JOB_OPPORTUNITY_STATUSES.FULFILLED &&
                    formData.status !== JOB_OPPORTUNITY_STATUSES.CANCELLED &&
                    formData.status !==
                      JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL && (
                      <>
                        <Button
                          onClick={() => void setIsConfirmationModalOpen(true)}
                          isReadOnly={
                            (formData.status !==
                              JOB_OPPORTUNITY_STATUSES.ACTIVE &&
                              formData.status !==
                                JOB_OPPORTUNITY_STATUSES.DRAFT &&
                              formData.status) ||
                            isGeneratingDescription
                          }
                          className="sm:ml-4 sm:mt-0 mt-4"
                          bgColor="bg-black"
                          text="text-white"
                        >
                          {confirmationActionText}
                        </Button>
                        <ConfirmationModal
                          open={isConfirmationModalOpen}
                          onClose={() => void setIsConfirmationModalOpen(false)}
                          onConfirm={onConfirmAction}
                          status={formData.status}
                          actionInProgress={confirmingAction}
                        />
                      </>
                    )}
                </div>
                {formData.status !== JOB_OPPORTUNITY_STATUSES.FULFILLED &&
                  formData.status !==
                    JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL &&
                  formData.status !== JOB_OPPORTUNITY_STATUSES.CANCELLED && (
                    <div
                      style={{
                        maxHeight: "70px",
                      }}
                    >
                      <Button
                        type="submit"
                        onClick={() => trigger()}
                        className="flex items-center sm:mr-0 mr-14"
                        isReadOnly={isGeneratingDescription}
                      >
                        {saveAsPreview
                          ? "Generating preview..."
                          : "Preview job"}
                        <img src={rightArrow} alt="" className="ml-1" />
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          </form>
        </FormProvider>
      </JobPageWrapper>
      <Footer />
    </div>
  );
}

function Section({ children, className = `` }) {
  return <div className={`flex flex-col gap-2` + className}>{children}</div>;
}

function Label({ children }) {
  return <label className="font-bold">{children}</label>;
}
