import m from "mithril";
const Link = m.route.Link;

export const Home = {
  view: () =>
    m(".text-center.self-center.mx-auto.max-w-md", [
      m("p.mb-4", [
        "Welcome to ",
        m(Link, { href: "/" }, "osrs.moe"),
        ". There isn't much here I just wanted to make a ",
        m(Link, { href: "/farmclock" }, "farm clock"),
        " since indecentcode's went down."
      ]),
      m("p.mb-1", [
        "This project is ",
        m(
          Link,
          { href: "https://github.com/osrs-moe/osrs_moe" },
          "open source"
        ),
        "."
      ]),
      m("p", [
        "-bitwise | ",
        m(Link, { href: "https://twitter.com/buttwize" }, "@buttwize")
      ])
    ])
};
