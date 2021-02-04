import React, { useState } from "react";
import { TweetsList } from "./list";
import { TweetCreate } from "./create";

export function TweetsComponent(props) {
  const [newTweets, setNewTweets] = useState([]);

  const canTweet = props.canTweet === "false" ? false : true;

  const handleNewTweet = (newTweet) => {
    //backend api response handler
    let tempTweets = [...newTweets];
    tempTweets.unshift(newTweet);
    setNewTweets(tempTweets);
  };

  return (
    <div className={props.className}>
      {canTweet && (
        <TweetCreate didTweet={handleNewTweet} className="col-12 mb-3" />
      )}
      <TweetsList newTweets={newTweets} {...props} />
    </div>
  );
}
