import React from "react";
import { Icon, List } from "semantic-ui-react";

function GithubStar(props) {
  const { data } = props;

  if (
    data.isBountyHunter ||
    data.isCampusExpert ||
    data.isDeveloperProgramMember ||
    data.isGitHubStar
  ) {
    return (
      <List>
        <span>Additionally special recognition has been earned at Github</span>
        {data.isBountyHunter && (
          <List.Item>
            <List.Icon name="bug" />
            <List.Content>
              <List.Description>is a true bug hunter</List.Description>
            </List.Content>
          </List.Item>
        )}
        {data.isCampusExpert && (
          <List.Item>
            <List.Icon name="university" />
            <List.Content>
              <List.Description>is a campus expert</List.Description>
            </List.Content>
          </List.Item>
        )}
        {data.isDeveloperProgramMember && (
          <List.Item>
            <List.Icon name="users" />
            <List.Content>
              <List.Description>is a developer program member</List.Description>
            </List.Content>
          </List.Item>
        )}
        {data.isGitHubStar && (
          <List.Item>
            <List.Icon name="github" />
            <List.Content>
              <List.Description>
                <Icon name="star" />
              </List.Description>
            </List.Content>
          </List.Item>
        )}
      </List>
    );
  } else {
    return <React.Fragment />;
  }
}

export default GithubStar;
