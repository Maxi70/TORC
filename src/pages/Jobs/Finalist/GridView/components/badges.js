import Badges from "components/Badges";

const FinalistGridBadges = ({ badges }) => {
  return (
    <section className="w-[420px] bg-white border-r h-full border-b p-8">
      <div className="flex items-center mb-6">
        <h5 className="font-nexa font-bold text-xl mr-2">Badges</h5>
        <span className="text-cyan-600 text-base">{badges.length}</span>
      </div>

      {badges?.length > 0 && <Badges badges={badges} />}
    </section>
  );
};

export default FinalistGridBadges;
