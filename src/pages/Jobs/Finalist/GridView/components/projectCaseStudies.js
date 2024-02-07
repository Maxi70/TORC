import moment from "moment";

export default function FinalistGridProjects({ projectsCaseStudies }) {
  return (
    <section className="w-[420px] bg-white border-r h-full border-b relative p-8">
      <h5 className="font-nexa font-bold text-xl mb-4">Projects</h5>
      <div className="flex flex-col gap-4">
        {projectsCaseStudies?.map((project, idx) => (
          <div key={`projectsCaseStudies-${idx}`} className="flex flex-col">
            <div className="text-gray-500">
              {project.startDate && (
                <>{moment(project.startDate).format("YYYY")} -</>
              )}{" "}
              {project.endDate
                ? moment(project.endDate).format("YYYY")
                : "Present"}
            </div>
            <div className="text-coolGray-600 font-bold">{project.client}</div>
            <div className="text-coolGray-600">{project.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
