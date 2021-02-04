import React, { useEffect, useState } from "react";
import { loadTweets, createTweet } from "../lookup";

export function TweetsComponent(props) {
  const [newTweets, setNewTweets] = useState([]);
  const textAreaRef = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVal = textAreaRef.current.value;
    //dummy data
    let tempTweets = [...newTweets];
    createTweet(newVal, (response, status) => {
      if (status === 201) {
        tempTweets.unshift(response);
      } else {
        alert("An error occurred. Please try again.");
      }
    });

    setNewTweets(tempTweets);
    //clear text box
    textAreaRef.current.value = "";
  };
  return (
    <div className={props.className}>
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
      <TweetsList newTweets={newTweets} />
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
      const myCallback = (response, status) => {
        if (status === 200) {
          setTweetsInit(response);
          setTweetsDidSet(true);
        } else {
          alert("There was an error.");
        }
      };
      loadTweets(myCallback);
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet]);

  return tweets.map((item, index) => {
    return (
      <Tweet
        tweet={item}
        key={`${index}-${item.id}`}
        className="my-5 py-5 border bg-white text-dark"
      />
    );
  });
}

export function Tweet(props) {
  const { tweet } = props;
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6";

  return (
    <div className={className}>
      <p>
        {tweet.id} - {tweet.content}
      </p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
        <ActionBtn
          tweet={tweet}
          action={{ type: "unlike", display: "Unlike" }}
        />
        <ActionBtn
          tweet={tweet}
          action={{ type: "retweet", display: "Retweet" }}
        />
      </div>
    </div>
  );
}

export function ActionBtn(props) {
  const { tweet, action } = props;
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  const [userLike, setUserLike] = useState(
    tweet.userLike === true ? true : false
  );

  const className = props.className
    ? props.className
    : "btn btn-primary btn-sm";

  const handleClick = (e) => {
    e.preventDefault();
    if (action.type === "like") {
      if (userLike === true) {
        setLikes(likes - 1);
        setUserLike(false);
      } else {
        setLikes(likes + 1);
        setUserLike(true);
      }
    }
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
