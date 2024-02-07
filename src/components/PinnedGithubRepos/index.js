import React from "react";
import { Header } from "semantic-ui-react";

function PinnedGithubRepos(props) {
  if (props.pinnedItems) {
    return (
      <>
        <Header as="h3">Pinned Github Repos</Header>
        {props.pinnedItems.map((item, index) => {
          return (
            <div key={index}>
              <a
                href={item.url}
                alt="pinned repo"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            </div>
          );
        })}
      </>
    );
  } else {
    return;
  }
}

export default PinnedGithubRepos;
