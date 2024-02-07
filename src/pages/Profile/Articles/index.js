import styles from "./index.module.css";
import classNames from "classnames";

import Article from "./article";
import JobWidgetsWrapper from "components/JobWidgetsWrapper";
import SkillsAssessmentsWidget from "components/SkillsAssessmentsWidget";
import ReferralsWidget from "components/ReferralsWidget";
import { useAuth } from "GlobalAuthContext";
import { ReactComponent as CodealikeLogo } from "images/codealike-vertical-white-wordmark.svg";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";

const ArticleSection = ({ articles, appsyncUser }) => {
  const type = appsyncUser.userType;
  const auth = useAuth();
  return (
    <section
      className={classNames(
        "relative overflow-hidden flex justify-center items-center flex-col md:flex-row px-6 py-24 pt-32 md:py-32",
        "full-width",
        type === "CUSTOMER" ? styles.customerGradient : "bg-dawn-grad",
        styles["getting-started"]
      )}
    >
      <div
        className={classNames(
          "flex flex-col px-5 md:px-14 tracking-wider gap-y-8 justify-center items-center w-full"
        )}
      >
        {type === "FREELANCER" && (
          <>
            <SkillsAssessmentsWidget appsyncUser={appsyncUser} />
            <JobWidgetsWrapper condensed={true} />
            <ReferralsWidget />
            <h5 className="ml-2 font-bold self-start">Codealike</h5>
            <div className="p-2 w-full lg:w-1/2">
              <div className="bg-black py-4 flex">
                <div className="w-2/3">
                  <CodealikeLogo className="h-17" title="Codealike" />
                </div>
                <div className="w-full flex flex-col lg:flex-row items-center justify-between pr-4">
                  <a
                    href={`https://lookerstudio.google.com/u/0/reporting/dd8c4836-f8a0-4169-a794-0791d1d68add/page/NODdD?params=%7B%22df110%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580${auth.user.id}%22%7D`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-right text-white mr-2 lg:pr-0"
                  >
                    <GetStartedBtn
                      label="Full Report"
                      className={classNames("text-black flex-nowrap mt-2 w-28 text-sm mt-0 pl-0 pr-0")}
                      uppercase
                      hideArrow
                      smallButton
                      alt="Full Report"
                    />
                  </a>
                  <a
                    href="https://lookerstudio.google.com/u/0/reporting/13980665-d982-473c-97ea-849034676d70/page/NODdD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-right mt-[-28px] mr-2 lg:pr-0"
                  >
                    <GetStartedBtn
                      label="Leaderboard"
                      className={classNames("text-black flex-nowrap mt-6 w-32 text-sm mt-7 pl-0 pr-0")}
                      uppercase
                      hideArrow
                      smallButton
                      alt="Leaderboard"
                    />
                  </a>
                  <a
                    href="Articles/torcStore.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-right mt-[-28px] mr-4 lg:pr-0"
                  >
                    <GetStartedBtn
                      label="Torc Store"
                      className={classNames("text-black flex-nowrap mt-6 w-28 text-sm mt-7 pl-0 pr-0")}
                      uppercase
                      hideArrow
                      smallButton
                      alt="Torc Store"
                    />
                  </a>
                </div>
              </div>
              <div className="bg-white h-[48vh]">
                <iframe
                  title="iframe"
                  src={`https://lookerstudio.google.com/embed/reporting/df7229a8-7eee-4900-9798-99f3fefc4c13/page/JHBkD?params=%7B%22df3%22:%22include%25EE%2580%25800%25EE%2580%2580IN%25EE%2580%2580${auth.user.id}%22%7D`}
                  frameBorder="0"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </>
        )}

        <div className="flex md:block justify-center relative w-full">
          <div className="flex flex-col md:px-0">
            <h1 className="lg:text-3xl text-xl font-nexa mb-7">
              Featured Content
            </h1>
            {articles && renderArticles(articles)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;

function renderArticles(articles) {
  const [featured, notFeatured] = getArticles(articles);

  return (
    <div
      className={classNames(
        // styles.articleFlex,
        "flex md:flex-row md:justify-between w-full flex-col relative gap-24"
      )}
    >
      <div className="">
        <Article
          featured={true}
          article={featured}
          key={"featured-article-1"}
        />
      </div>
      <div className="flex flex-col w-full gap-2.5">
        {notFeatured.map((article, i) => (
          <Article article={article} key={`article-${i}`} />
        ))}
      </div>
    </div>
  );
}

function getArticles(articles) {
  let featuredArticleIdx = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const tagList = article.tag_list;
    if (tagList.includes("Featured")) {
      featuredArticleIdx = i;
    }
  }

  const notFeatured = articles.filter((_art, i) => i !== featuredArticleIdx);

  return [articles[featuredArticleIdx], notFeatured];
}
