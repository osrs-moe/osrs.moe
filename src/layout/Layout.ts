import m from "mithril";
import { Header } from "./Header";

export const Layout = {
  view: (vnode: m.Vnode) =>
    m(".flex.flex-col.h-full", [m(Header), vnode.children]),
};
