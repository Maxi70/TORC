export default function FinalistGridLanguages({ knownLanguages }) {
  return (
    <section className="w-[420px] bg-white border-r h-full border-b relative p-8">
      <h5 className="font-nexa font-bold text-xl mb-4">Languages</h5>
      <div className="flex flex-wrap">
        {knownLanguages?.map((language, idx) => (
          <div key={`language-${idx}`} className="flex gap-2 w-full">
            <div className="text-coolGray-600 font-bold">
              {language.language}
            </div>
            <div className="lowercase first-letter:uppercase text-gray-500">
              {language.level}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
