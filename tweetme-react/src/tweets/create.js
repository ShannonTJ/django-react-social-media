import React from "react";
import { apiTweetCreate } from "./lookup";

export function TweetCreate(props) {
  const textAreaRef = React.createRef();
  const { didTweet } = props;

  const updateBackend = (response, status) => {
    if (status === 201) {
      didTweet(response);
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
  );
}
