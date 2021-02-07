import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ProfileBadge } from "./profiles";
import { FeedComponent, TweetsComponent, TweetDetailComponent } from "./tweets";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const appEl = document.getElementById("root");
if (appEl) {
  ReactDOM.render(<App />, appEl);
}

const e = React.createElement;
const tweetsEl = document.getElementById("tweetme");
if (tweetsEl) {
  ReactDOM.render(e(TweetsComponent, tweetsEl.dataset), tweetsEl);
}

const tweetFeedEl = document.getElementById("tweetme-feed");
if (tweetFeedEl) {
  ReactDOM.render(e(FeedComponent, tweetFeedEl.dataset), tweetFeedEl);
}

const tweetDetailEl = document.querySelectorAll(".tweetme-detail");
tweetDetailEl.forEach((container) => {
  ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
});

const userProfileBageEl = document.querySelectorAll(".tweetme-profile-badge");
userProfileBageEl.forEach((container) => {
  ReactDOM.render(e(ProfileBadge, container.dataset), container);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
