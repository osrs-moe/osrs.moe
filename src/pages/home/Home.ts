import m from "mithril";
const Link = m.route.Link;
import "./home.scss";

export const Home = {
  view: () =>
    m(".welcome", [
      m("p", [
        "Welcome to ",
        m(Link, { href: "/" }, "osrs.moe"),
        ". There isn't much here I just wanted to make a ",
        m(Link, { href: "/farmclock" }, "farm clock"),
        " since indecentcode's went down."
      ]),
      m("p", [
        "This project is ",
        m("a", { href: "https://github.com/osrs-moe/osrs_moe" }, "open source"),
        "."
      ]),
      m("p", [
        "-bitwise | ",
        m("a", { href: "https://twitter.com/buttwize" }, "@buttwize")
      ])
    ])
};
