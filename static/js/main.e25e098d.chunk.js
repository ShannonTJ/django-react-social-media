(this["webpackJsonptweetme-react"] =
  this["webpackJsonptweetme-react"] || []).push([
  [0],
  {
    15: function (e, t, n) {},
    17: function (e, t, n) {},
    18: function (e, t, n) {
      "use strict";
      n.r(t);
      var c = n(1),
        a = n.n(c),
        r = n(4),
        s = n.n(r),
        i = (n(15), n(0));
      function o(e) {
        var t = e.username;
        return Object(i.jsx)("span", {
          className: "pointer",
          onClick: function (e) {
            window.location.href = "/profiles/".concat(t);
          },
          children: e.children,
        });
      }
      function l(e) {
        var t = e.user,
          n = e.includeFullName,
          c = e.hideLink,
          r =
            !0 === n
              ? "".concat(t.first_name, " ").concat(t.last_name, " ")
              : null;
        return Object(i.jsxs)(a.a.Fragment, {
          children: [
            r,
            !0 === c
              ? "@".concat(t.username)
              : Object(i.jsxs)(o, {
                  username: t.username,
                  children: ["@", t.username, " "],
                }),
          ],
        });
      }
      function u(e) {
        var t = e.user;
        return !0 === e.hideLink
          ? Object(i.jsx)("span", {
              className: "mx-1 px-3 py-2 rounded-circle bg-dark text-white",
              children: t.username[0],
            })
          : Object(i.jsx)(o, {
              username: t.username,
              children: Object(i.jsx)("span", {
                className: "mx-1 px-3 py-2 rounded-circle bg-dark text-white",
                children: t.username[0],
              }),
            });
      }
      var j = n(2);
      function d(e, t, n, c) {
        var a;
        c && (a = JSON.stringify(c));
        var r = new XMLHttpRequest(),
          s = "https://shan-django-react-social-media.herokuapp.com/api".concat(
            t
          );
        r.responseType = "json";
        var i = (function (e) {
          var t = null;
          if (document.cookie && "" !== document.cookie)
            for (var n = document.cookie.split(";"), c = 0; c < n.length; c++) {
              var a = n[c].trim();
              if (a.substring(0, e.length + 1) === e + "=") {
                t = decodeURIComponent(a.substring(e.length + 1));
                break;
              }
            }
          return t;
        })("csrftoken");
        r.open(e, s),
          r.setRequestHeader("Content-Type", "application/json"),
          i &&
            (r.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            r.setRequestHeader("X-CSRFToken", i)),
          (r.onload = function () {
            403 === r.status &&
              "Authentication credentials were not provided." ===
                r.response.detail &&
              -1 === window.location.href.indexOf("login") &&
              (window.location.href = "/login?showLoginRequired=true");
            n(r.response, r.status);
          }),
          (r.onerror = function (e) {
            n({ message: "The request was an error" }, 400);
          }),
          r.send(a);
      }
      var b = n(9),
        f = n.n(b);
      function m(e) {
        return Object(i.jsx)("span", {
          className: e.className,
          children: f()(e.children).format("0a"),
        });
      }
      function O(e) {
        var t = e.user,
          n = e.didFollowToggle,
          c = e.profileLoading,
          a = t && t.is_following ? "Unfollow" : "Follow";
        a = c ? "Loading" : a;
        return t
          ? Object(i.jsxs)("div", {
              children: [
                Object(i.jsx)(u, { user: t, hideLink: !0 }),
                Object(i.jsx)("p", {
                  children: Object(i.jsx)(l, {
                    user: t,
                    includeFullName: !0,
                    hideLink: !0,
                  }),
                }),
                Object(i.jsxs)("p", {
                  children: [
                    Object(i.jsx)(m, { children: t.follower_count }),
                    " ",
                    1 === t.follower_count ? "follower" : "followers",
                  ],
                }),
                Object(i.jsxs)("p", {
                  children: [
                    Object(i.jsx)(m, { children: t.following_count }),
                    " following",
                  ],
                }),
                Object(i.jsx)("p", { children: t.location }),
                Object(i.jsx)("p", { children: t.bio }),
                Object(i.jsx)("button", {
                  onClick: function (e) {
                    e.preventDefault(), n && !c && n(a);
                  },
                  className: "btn btn-primary",
                  children: a,
                }),
              ],
            })
          : null;
      }
      function h(e) {
        var t = e.username,
          n = Object(c.useState)(!1),
          a = Object(j.a)(n, 2),
          r = a[0],
          s = a[1],
          o = Object(c.useState)(null),
          l = Object(j.a)(o, 2),
          u = l[0],
          b = l[1],
          f = Object(c.useState)(!1),
          m = Object(j.a)(f, 2),
          h = m[0],
          p = m[1],
          w = function (e, t) {
            200 === t && b(e);
          };
        Object(c.useEffect)(
          function () {
            !1 === r &&
              (!(function (e, t) {
                d("GET", "/profiles/".concat(e, "/"), t);
              })(t, w),
              s(!0));
          },
          [t, r, s]
        );
        return !1 === r
          ? "Loading..."
          : u
          ? Object(i.jsx)(O, {
              user: u,
              didFollowToggle: function (e) {
                !(function (e, t, n) {
                  var c = { action: "".concat(t && t).toLowerCase() };
                  d("POST", "/profiles/".concat(e, "/follow/"), n, c);
                })(t, e, function (e, t) {
                  200 === t && b(e), p(!1);
                }),
                  p(!0);
              },
              profileLoading: h,
            })
          : null;
      }
      function p(e, t) {
        var n = "/tweets/feed/";
        null !== t &&
          void 0 !== t &&
          (n = t.replace(
            "https://shan-django-react-social-media.herokuapp.com/api",
            ""
          )),
          d("GET", n, e);
      }
      function w(e, t, n) {
        var c = "/tweets/";
        e && (c = "/tweets/?username=".concat(e)),
          null !== n &&
            void 0 !== n &&
            (c = n.replace(
              "https://shan-django-react-social-media.herokuapp.com/api",
              ""
            )),
          d("GET", c, t);
      }
      function x(e) {
        var t = e.tweet,
          n = e.action,
          c = e.didPerformAction,
          a = t.likes ? t.likes : 0,
          r = e.className ? e.className : "btn btn-primary btn-sm",
          s = function (e, t) {
            c && c(e, t);
          },
          o =
            "like" === n.type
              ? "".concat(a, " ").concat(1 === a ? "Like" : "Likes")
              : n.display;
        return Object(i.jsx)("button", {
          className: r,
          onClick: function (e) {
            e.preventDefault(),
              (function (e, t, n) {
                d("POST", "/tweets/action/", n, { id: e, action: t });
              })(t.id, n.type, s);
          },
          children: o,
        });
      }
      var v = n(3),
        g = n(10);
      function N(e) {
        var t = e.tweet;
        return t.parent
          ? Object(i.jsx)(k, {
              isRetweet: !0,
              retweeter: e.retweeter,
              hideActions: !0,
              className: " ",
              tweet: t.parent,
            })
          : null;
      }
      function k(e) {
        var t = e.tweet,
          n = e.didRetweet,
          r = e.hideActions,
          s = e.isRetweet,
          o = e.retweeter,
          d = Object(c.useState)(e.tweet ? e.tweet : null),
          b = Object(j.a)(d, 2),
          f = b[0],
          m = b[1],
          O = e.className ? e.className : "col-10 mx-auto col-md-6";
        O = !0 === s ? "".concat(O, " p-2 border rounded") : O;
        var h = window.location.pathname.match(
            Object(g.a)(/([0-9]+)/, { tweetid: 1 })
          ),
          p = h ? h.groups.tweetid : -1,
          w = "".concat(t.id) === "".concat(p),
          v = function (e, t) {
            200 === t ? m(e) : 201 === t && n && n(e);
          };
        return Object(i.jsxs)("div", {
          className: O,
          children: [
            !0 === s &&
              Object(i.jsx)("div", {
                className: "mb-2",
                children: Object(i.jsxs)("span", {
                  className: "small text-muted",
                  children: ["Retweet via ", Object(i.jsx)(l, { user: o })],
                }),
              }),
            Object(i.jsxs)("div", {
              className: "d-flex",
              children: [
                Object(i.jsx)("div", {
                  className: "",
                  children: Object(i.jsx)(u, { user: t.user }),
                }),
                Object(i.jsxs)("div", {
                  className: "col-11",
                  children: [
                    Object(i.jsxs)("div", {
                      children: [
                        Object(i.jsx)("p", {
                          children: Object(i.jsx)(l, {
                            includeFullName: !0,
                            user: t.user,
                          }),
                        }),
                        Object(i.jsx)("p", { children: t.content }),
                        Object(i.jsx)(N, { tweet: t, retweeter: t.user }),
                      ],
                    }),
                    Object(i.jsxs)("div", {
                      className: "btn btn-group px-0",
                      children: [
                        f &&
                          !0 !== r &&
                          Object(i.jsxs)(a.a.Fragment, {
                            children: [
                              Object(i.jsx)(x, {
                                tweet: f,
                                didPerformAction: v,
                                action: { type: "like", display: "Likes" },
                              }),
                              Object(i.jsx)(x, {
                                tweet: f,
                                didPerformAction: v,
                                action: { type: "unlike", display: "Unlike" },
                              }),
                              Object(i.jsx)(x, {
                                tweet: f,
                                didPerformAction: v,
                                action: { type: "retweet", display: "Retweet" },
                              }),
                            ],
                          }),
                        !0 === w
                          ? null
                          : Object(i.jsx)("button", {
                              className: "btn btn-outline-primary btn-sm",
                              onClick: function (e) {
                                e.preventDefault(),
                                  (window.location.href = "/".concat(t.id));
                              },
                              children: "View",
                            }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      function y(e) {
        var t = Object(c.useState)([]),
          n = Object(j.a)(t, 2),
          r = n[0],
          s = n[1],
          o = Object(c.useState)([]),
          l = Object(j.a)(o, 2),
          u = l[0],
          d = l[1],
          b = Object(c.useState)(null),
          f = Object(j.a)(b, 2),
          m = f[0],
          O = f[1],
          h = Object(c.useState)(!1),
          p = Object(j.a)(h, 2),
          x = p[0],
          g = p[1];
        Object(c.useEffect)(
          function () {
            var t = Object(v.a)(e.newTweets).concat(r);
            t.length !== u.length && d(t);
          },
          [e.newTweets, u, r]
        ),
          Object(c.useEffect)(
            function () {
              if (!1 === x) {
                w(e.username, function (e, t) {
                  200 === t
                    ? (O(e.next), s(e.results), g(!0))
                    : alert("There was an error");
                });
              }
            },
            [r, x, g, e.username]
          );
        var N = function (e) {
          var t = Object(v.a)(r);
          t.unshift(e), s(t);
          var n = Object(v.a)(u);
          n.unshift(u), d(n);
        };
        return Object(i.jsxs)(a.a.Fragment, {
          children: [
            u.map(function (e, t) {
              return Object(i.jsx)(
                k,
                {
                  tweet: e,
                  didRetweet: N,
                  className: "my-5 py-5 border bg-white text-dark",
                },
                "".concat(t, "-{item.id}")
              );
            }),
            null !== m &&
              Object(i.jsx)("button", {
                onClick: function (t) {
                  if ((t.preventDefault(), null !== m)) {
                    w(
                      e.username,
                      function (e, t) {
                        if (200 === t) {
                          O(e.next);
                          var n = Object(v.a)(u).concat(e.results);
                          s(n), d(n);
                        } else alert("There was an error");
                      },
                      m
                    );
                  }
                },
                className: "btn btn-outline-primary",
                children: "Load next",
              }),
          ],
        });
      }
      var T = n(8);
      function S(e) {
        var t = a.a.createRef(),
          n = e.didTweet,
          c = function (e, t) {
            201 === t ? n(e) : alert("An error occurred. Please try again.");
          };
        return Object(i.jsx)("div", {
          className: e.className,
          children: Object(i.jsxs)("form", {
            onSubmit: function (e) {
              e.preventDefault();
              var n = t.current.value;
              d("POST", "/tweets/create/", c, { content: n }),
                (t.current.value = "");
            },
            children: [
              Object(i.jsx)("textarea", {
                ref: t,
                required: !0,
                className: "form-control",
                name: "tweet",
              }),
              Object(i.jsx)("button", {
                type: "submit",
                className: "btn btn-primary my-3",
                children: "Tweet",
              }),
            ],
          }),
        });
      }
      function L(e) {
        var t = Object(c.useState)([]),
          n = Object(j.a)(t, 2),
          r = n[0],
          s = n[1],
          o = Object(c.useState)([]),
          l = Object(j.a)(o, 2),
          u = l[0],
          d = l[1],
          b = Object(c.useState)(null),
          f = Object(j.a)(b, 2),
          m = f[0],
          O = f[1],
          h = Object(c.useState)(!1),
          w = Object(j.a)(h, 2),
          x = w[0],
          g = w[1];
        Object(c.useEffect)(
          function () {
            var t = Object(v.a)(e.newTweets).concat(r);
            t.length !== u.length && d(t);
          },
          [e.newTweets, u, r]
        ),
          Object(c.useEffect)(
            function () {
              if (!1 === x) {
                p(function (e, t) {
                  200 === t && (O(e.next), s(e.results), g(!0));
                });
              }
            },
            [r, x, g, e.username]
          );
        var N = function (e) {
          var t = Object(v.a)(r);
          t.unshift(e), s(t);
          var n = Object(v.a)(u);
          n.unshift(u), d(n);
        };
        return Object(i.jsxs)(a.a.Fragment, {
          children: [
            u.map(function (e, t) {
              return Object(i.jsx)(
                k,
                {
                  tweet: e,
                  didRetweet: N,
                  className: "my-5 py-5 border bg-white text-dark",
                },
                "".concat(t, "-{item.id}")
              );
            }),
            null !== m &&
              Object(i.jsx)("button", {
                onClick: function (e) {
                  if ((e.preventDefault(), null !== m)) {
                    p(function (e, t) {
                      if (200 === t) {
                        O(e.next);
                        var n = Object(v.a)(u).concat(e.results);
                        s(n), d(n);
                      }
                    }, m);
                  }
                },
                className: "btn btn-outline-primary",
                children: "Load next",
              }),
          ],
        });
      }
      function R(e) {
        var t = Object(c.useState)([]),
          n = Object(j.a)(t, 2),
          a = n[0],
          r = n[1],
          s = "false" !== e.canTweet;
        return Object(i.jsxs)("div", {
          className: e.className,
          children: [
            !0 === s &&
              Object(i.jsx)(S, {
                didTweet: function (e) {
                  var t = Object(v.a)(a);
                  t.unshift(e), r(t);
                },
                className: "col-12 mb-3",
              }),
            Object(i.jsx)(y, Object(T.a)({ newTweets: a }, e)),
          ],
        });
      }
      function E(e) {
        var t = e.tweetId,
          n = Object(c.useState)(!1),
          a = Object(j.a)(n, 2),
          r = a[0],
          s = a[1],
          o = Object(c.useState)(null),
          l = Object(j.a)(o, 2),
          u = l[0],
          b = l[1],
          f = function (e, t) {
            200 === t ? b(e) : alert("There was an error finding your tweet.");
          };
        return (
          Object(c.useEffect)(
            function () {
              !1 === r &&
                (!(function (e, t) {
                  d("GET", "/tweets/".concat(e, "/"), t);
                })(t, f),
                s(!0));
            },
            [t, r, s]
          ),
          null === u
            ? null
            : Object(i.jsx)(k, { tweet: u, className: e.className })
        );
      }
      var F = n.p + "static/media/logo.6ce24c58.svg";
      n(17);
      var A = function () {
          return Object(i.jsx)("div", {
            className: "App",
            children: Object(i.jsxs)("header", {
              className: "App-header",
              children: [
                Object(i.jsx)("img", {
                  src: F,
                  className: "App-logo",
                  alt: "logo",
                }),
                Object(i.jsx)("div", { children: Object(i.jsx)(R, {}) }),
                Object(i.jsx)("a", {
                  className: "App-link",
                  href: "https://reactjs.org",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  children: "Learn React",
                }),
              ],
            }),
          });
        },
        C = function (e) {
          e &&
            e instanceof Function &&
            n
              .e(3)
              .then(n.bind(null, 19))
              .then(function (t) {
                var n = t.getCLS,
                  c = t.getFID,
                  a = t.getFCP,
                  r = t.getLCP,
                  s = t.getTTFB;
                n(e), c(e), a(e), r(e), s(e);
              });
        },
        q = document.getElementById("root");
      q && s.a.render(Object(i.jsx)(A, {}), q);
      var P = a.a.createElement,
        D = document.getElementById("tweetme");
      D && s.a.render(P(R, D.dataset), D);
      var _ = document.getElementById("tweetme-feed");
      _ &&
        s.a.render(
          P(function (e) {
            var t = Object(c.useState)([]),
              n = Object(j.a)(t, 2),
              a = n[0],
              r = n[1],
              s = "false" !== e.canTweet;
            return Object(i.jsxs)("div", {
              className: e.className,
              children: [
                !0 === s &&
                  Object(i.jsx)(S, {
                    didTweet: function (e) {
                      var t = Object(v.a)(a);
                      t.unshift(e), r(t);
                    },
                    className: "col-12 mb-3",
                  }),
                Object(i.jsx)(L, Object(T.a)({ newTweets: a }, e)),
              ],
            });
          }, _.dataset),
          _
        ),
        document.querySelectorAll(".tweetme-detail").forEach(function (e) {
          s.a.render(P(E, e.dataset), e);
        }),
        document
          .querySelectorAll(".tweetme-profile-badge")
          .forEach(function (e) {
            s.a.render(P(h, e.dataset), e);
          }),
        C();
    },
  },
  [[18, 1, 2]],
]);
//# sourceMappingURL=main.e25e098d.chunk.js.map
