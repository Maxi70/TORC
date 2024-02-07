import HoverTooltip from "components/HoverTooltip";

export default function FinalistGridSkills({ skills }) {
  const getSkillColour = (exp) => {
    switch (exp) {
      case "low":
        return "text-zestygreen";
      case "medium":
        return "text-orange";
      case "high":
        return "text-electricBlue";
      default:
        return "text-black";
    }
  };

  return (
    <section className="w-[420px] bg-white border-r h-full border-b relative p-8">
      <h5 className="font-nexa font-bold text-xl mb-4">Skills</h5>
      <div className="flex flex-wrap gap-3">
        {skills
          ?.sort((a, b) => {
            const order = {
              high: 0,
              medium: 1,
              low: 2,
            };
            return order[a.experience] - order[b.experience];
          })
          .map((skill, idx) => (
            <HoverTooltip
              key={`skill-${idx}`}
              hoverText={
                <div className="mx-auto bg-white rounded-[16px] shadow-md relative">
                  <div className="text-center m-2">
                    <p className="text-gray-800">
                      {skill.experience ? (
                        <>
                          <span
                            className={`font-bold ${getSkillColour(
                              skill.experience
                            )}`}
                          >
                            {skill.experience.charAt(0).toUpperCase() +
                              skill.experience.slice(1)}
                          </span>{" "}
                          experience{" "}
                        </>
                      ) : (
                        "Experienced "
                      )}
                      in <span className="font-bold">{skill.name}</span>
                    </p>
                  </div>
                </div>
              }
            >
              <div
                key={`skill-${idx}`}
                className="inline-block mr-2 mb-2 px-3 py-2 text-center rounded-full text-sm font-medium text-cyan-800 bg-cyan-50 shadow-xs hover:shadow-xs hover:bg-cyan-100 transition-shadow duration-200"
              >
                {skill.name}
              </div>
            </HoverTooltip>
          ))}
      </div>
    </section>
  );
}
