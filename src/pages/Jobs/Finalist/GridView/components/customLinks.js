import classNames from "classnames";

const FinalistGridCustomLinks = ({ links }) => {
  return (
    <section className="w-[420px] bg-white border-r h-full border-b relative p-8">
      <h5 className="font-nexa font-bold text-xl mb-4">Custom Links</h5>
      <div className="flex flex-wrap gap-3">
        {links?.map(({ name, value }, idx) => (
          <a
            key={idx}
            href={value}
            target="_blank"
            rel="noreferrer"
            className={classNames(
              "inline-block mr-2 mb-2 px-3.5 py-1.5 text-center rounded text-lg text-white hover:text-white bg-blue-800"
            )}
          >
            {name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default FinalistGridCustomLinks;
