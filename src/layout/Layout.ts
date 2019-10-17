import m from "mithril";
const Link = m.route.Link;
import "./layout.css";

export const Layout = {
  view: (vnode: m.Vnode) =>
    m(".layout", [
      m("header", [
        m(Link, { href: "/", class: "logo" }, "osrs.moe"),
        m(Link, { href: "/farmclock", class: "button" }, "Farm Clock")
      ]),
      m("section", vnode.children)
    ])
};
