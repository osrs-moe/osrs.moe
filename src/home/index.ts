import * as m from "mithril";
import "./home.scss";

export default {
	view() {
		return m(".welcome", [
			m("p", [
				"Welcome to ",
				m("a[href='/']", {oncreate: m.route.link}, "osrs.moe"),
				". There isn't much here I just wanted to make a ",
				m("a[href='/farmclock']", {oncreate: m.route.link}, "farm clock"),
				" since indecentcode's went down."
			]),
			m("p", [
				"-bitwise | ",
				m("a", {href: "https://twitter.com/buttwize"}, "@buttwize")
			])
		]);
	}
};
