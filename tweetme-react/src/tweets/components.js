import React, { useEffect, useState } from "react";
import { apiTweetCreate, apiTweetList, apiTweetAction } from "./lookup";

export function TweetsComponent(props) {
  const [newTweets, setNewTweets] = useState([]);
  const textAreaRef = React.createRef();

  const canTweet = props.canTweet === "false" ? false : true;

  const updateBackend = (response, status) => {
    //backend api response handler
    let tempTweets = [...newTweets];
    if (status === 201) {
      tempTweets.unshift(response);
      setNewTweets(tempTweets);
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    //backend api request
    e.preventDefault();
    const newVal = textAreaRef.current.value;
    apiTweetCreate(newVal, updateBackend);

    //clear text box
    textAreaRef.current.value = "";
  };
  return (
    <div className={props.className}>
      {canTweet && (
        <div className="col-12 mb-3">
          <form onSubmit={handleSubmit}>
            <textarea
              ref={textAreaRef}
              required={true}
              className="form-control"
              name="tweet"
            ></textarea>
            <button type="submit" className="btn btn-primary my-3">
              Tweet
            </button>
          </form>
        </div>
      )}
      <TweetsList newTweets={newTweets} {...props} />
    </div>
  );
}

export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
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
          setTweetsInit(response);
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

  return tweets.map((item, index) => {
    return (
      <Tweet
        tweet={item}
        didRetweet={handleDidRetweet}
        key={`${index}-${item.id}`}
        className="my-5 py-5 border bg-white text-dark"
      />
    );
  });
}

export function ParentTweet(props) {
  const { tweet } = props;

  return tweet.parent ? (
    <div className="row">
      <div className="col-11 mx-auto p-3 border rounded">
        <p className="mb-0 text-muted small">Retweet</p>
        <Tweet hideActions className={" "} tweet={tweet.parent} />
      </div>
    </div>
  ) : null;
}

export function Tweet(props) {
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  const { tweet, didRetweet, hideActions } = props;
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6";

  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet, status);
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet);
      }
    }
  };

  return (
    <div className={className}>
      <div>
        <p>
          {tweet.id} - {tweet.content}
        </p>
        <ParentTweet tweet={tweet} />
      </div>
      {actionTweet && hideActions !== true && (
        <div className="btn btn-group">
          <ActionBtn
            tweet={actionTweet}
            didPerformAction={handlePerformAction}
            action={{ type: "like", display: "Likes" }}
          />
          <ActionBtn
            tweet={actionTweet}
            didPerformAction={handlePerformAction}
            action={{ type: "unlike", display: "Unlike" }}
          />
          <ActionBtn
            tweet={actionTweet}
            didPerformAction={handlePerformAction}
            action={{ type: "retweet", display: "Retweet" }}
          />
        </div>
      )}
    </div>
  );
}

export function ActionBtn(props) {
  const { tweet, action, didPerformAction } = props;
  const likes = tweet.likes ? tweet.likes : 0;

  const className = props.className
    ? props.className
    : "btn btn-primary btn-sm";

  const handleActionBackend = (response, status) => {
    if ((status === 200 || 201) && didPerformAction) {
      didPerformAction(response, status);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    apiTweetAction(tweet.id, action.type, handleActionBackend);
  };

  const display =
    action.type === "like"
      ? `${likes} ${likes === 1 ? "like" : "likes"}`
      : action.display;

  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
}
