import m from "mithril";
const Link = m.route.Link;

export const NotFound = {
  view: () =>
    m(".welcome", [
      m("h1", ["Page Not Found :(", m("small", m.route.get())]),
      m("p", [
        m(Link, { href: "/" }, "Click here"),
        " to go back home.  Otherwise, if you are looking for the farmclock, it's been relocated to ",
        m(Link, { href: "/farmclock" }, "https://osrs.moe/farmclock")
      ])
    ])
};
