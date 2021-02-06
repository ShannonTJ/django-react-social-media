import React, { useEffect, useState } from "react";
import { apiTweetList } from "./lookup";
import { Tweet } from "./detail";

export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [tweetsDidSet, setTweetsDidSet] = useState(false);

  useEffect(() => {
    const final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweetsInit, tweets]);

  //load tweets
  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleListLookup = (response, status) => {
        if (status === 200) {
          setNextUrl(response.next);
          setTweetsInit(response.results);
          setTweetsDidSet(true);
        } else {
          alert("There was an error.");
        }
      };
      apiTweetList(props.username, handleListLookup);
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);

  const handleDidRetweet = (newTweet) => {
    const updatedTweetsInit = [...tweetsInit];
    updatedTweetsInit.unshift(newTweet);
    setTweetsInit(updatedTweetsInit);

    const updatedFinalTweets = [...tweets];
    updatedFinalTweets.unshift(tweets);
    setTweets(updatedFinalTweets);
  };

  return (
    <React.Fragment>
      {tweets.map((item, index) => {
        return (
          <Tweet
            tweet={item}
            didRetweet={handleDidRetweet}
            key={`${index}-${item.id}`}
            className="my-5 py-5 border bg-white text-dark"
          />
        );
      })}
      ;
      {nextUrl !== null && (
        <button className="btn btn-outline-primary">Next Page</button>
      )}
    </React.Fragment>
  );
}
