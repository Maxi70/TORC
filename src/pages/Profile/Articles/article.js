import classNames from "classnames";
import dayjs from "dayjs";
import styles from "./index.module.css";

const Article = ({ featured, article }) => {
  const { name, first_published_at, tag_list, content } = article;
  const publishDate = dayjs(first_published_at);

  return (
    <div
      className={classNames(
        featured ? styles.featured : styles.notFeatured,
        styles.articleContainer,
        "relative shadow-sm flex flex-col mb-7 bg-white"
      )}
    >
      <a href={`https://www.torc.dev/blog/${article.slug}`}>
        {featured && (
          <div className="absolute left-0 top-0 text-white font-bold font-rubik-regular text-lg py-3 px-8 bg-purple-500 tracking-wider leading-6">
            FEATURED
          </div>
        )}
        <div className="w-full h-full">
          <img
            className={classNames(
              featured ? "lg:h-80 h-72" : "lg:h-40 h-36",
              "w-full",
              styles.imageFit
            )}
            src={content?.image?.filename}
            alt={content.image?.alt || ""}
          />
          <div
            className={classNames(
              styles.articleContentHeight,
              "bg-white py-3 pb-10 px-5 overflow-hidden h-full",
              !featured && "max-h-40"
            )}
          >
            <div className="flex">
              {tag_list.map((name, i) => (
                <span
                  className="mr-2 font-rubik-regular text-blue-500 text-base tracking-wider hover:underline uppercase"
                  key={`${article.name}-${name}`}
                >
                  #{name}
                  {`${tag_list[i + 1] ? ", " : " "}`}
                </span>
              ))}
            </div>
            <p className="mt-2 font-nexa lg:text-xl text-lg tracking-wider">
              {name}
            </p>
            <div className="font-rubik-regular italic text-sm mt-3">
              {publishDate.isValid()
                ? publishDate.format("MMMM DD, YYYY")
                : "Not published yet"}
            </div>
            {featured && (
              <p className="mt-8 max-h-28 overflow-hidden">
                {article.content.intro}
              </p>
            )}
          </div>
        </div>
      </a>
    </div>
  );
};

export default Article;
