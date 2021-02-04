import React from "react";
import { apiTweetAction } from "./lookup";

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
