import moment from "moment";

export default function FinalistGridCareers({ careers }) {
  return (
    <section className="w-[420px] bg-white border-r h-full border-b relative p-8">
      <h5 className="font-nexa font-bold text-xl mb-4">Experience</h5>
      <div className="flex flex-col gap-4">
        {careers?.map((career, idx) => (
          <div key={`career-${idx}`} className="flex flex-col">
            <div className="text-gray-500">
              {moment(career.startDate).format("YYYY")} -{" "}
              {career.endDate
                ? moment(career.endDate).format("YYYY")
                : "Present"}
            </div>
            <div className="text-coolGray-600 font-bold">
              {career.companyName}
            </div>
            <div className="text-coolGray-600">{career.description ?? ""}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
