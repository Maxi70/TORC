import classNames from "classnames";

export default function ProgressTick({
  number,
  text,
  filled = false,
  jumpToStep,
}) {
  return (
    <div className="relative cursor-pointer" onClick={jumpToStep}>
      <div
        className={classNames(
          `grid place-items-center w-12 h-12 rounded text-lg font-bold hover:bg-bluepurple hover:text-white`,
          filled
            ? `bg-bluepurple text-white`
            : `bg-white border-2 border-bluepurple text-bluepurple`
        )}
      >
        {number}
      </div>
      <span
        className={classNames(
          `absolute w-max text-bluepurple left-1/2 transform -translate-x-1/2 top-16`,
          filled ? `font-bold` : `font-light`
        )}
      >
        {text}
      </span>
    </div>
  );
}
