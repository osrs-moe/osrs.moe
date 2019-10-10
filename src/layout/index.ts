import m from "mithril";
import "./layout.scss";

export default {
	view(vnode: m.Vnode) {
		return m(".layout", [
			m("header", [
				m("a.logo", {href: "/", oncreate: m.route.link}, "osrs.moe"),
				m("a.button", {href: "/farmclock", oncreate: m.route.link}, "Farm Clock")
			]),
			m("main", [vnode.children])
		]);
	}
};
