import moment from "moment";

export const JOB_TYPES = {
  "Full time": "FULLTIME",
  "Part time": "PARTTIME",
  "Self employed": "SELFEMPLOYED",
};

export const LOCATION_TYPES = {
  "On site": "ONSITE",
  Remote: "REMOTE",
  Hybrid: "HYBRID",
};

export const MONTHS = [
  { name: "January", index: 0 },
  { name: "February", index: 1 },
  { name: "March", index: 2 },
  { name: "April", index: 3 },
  { name: "May", index: 4 },
  { name: "June", index: 5 },
  { name: "July", index: 6 },
  { name: "August", index: 7 },
  { name: "September", index: 8 },
  { name: "October", index: 9 },
  { name: "November", index: 10 },
  { name: "December", index: 11 },
];

export const getYearsList = (limit = 50) => {
  const year = new Date().getFullYear();
  return Array.from(new Array(limit), (v, i) => (
    <option key={i} value={year - i}>
      {year - i}
    </option>
  ));
};

export const formatDate = (data) => {
  if (data.endDateMonth === "Present") {
    data.endDate = null;
  } else {
    data.endDate = moment(
      `${data.endDateMonth}, ${data.endDateYear}`,
      "MMM, YYYY"
    ).toISOString();
  }
  data.startDate = moment(
    `${data.startDateMonth}, ${data.startDateYear}`,
    "MMM, YYYY"
  ).toISOString();

  delete data.startDateMonth;
  delete data.startDateYear;
  delete data.endDateMonth;
  delete data.endDateYear;
};
