import m from "mithril";
const Link = m.route.Link;

export const NotFound = {
  view: () =>
    m(".text-center.self-center.mx-auto.max-w-md", [
      m("h1.flex.flex-col.mb-6", [
        "Page Not Found:",
        m("small.text-lg.font-mono", m.route.get())
      ]),
      m("p", [
        m(Link, { href: "/" }, "Click here"),
        " to go back home.  Otherwise, if you are looking for the farmclock, it's been relocated to ",
        m(Link, { href: "/farmclock" }, "https://osrs.moe/farmclock")
      ])
    ])
};
