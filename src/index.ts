import "mini-dark"; // import main mini.css dark theme
import * as m from "mithril";
import Layout from "./layout";
import Home from "./home";
import Farmclock from "./farmclock";

m.route.prefix("");
m.route(document.body, "/", {
	"/": {
		render() {
			return m(Layout, m(Home));
		}
	},
	"/farmclock": {
		render() {
			return m(Layout, m(Farmclock));
		}
	},
	"/:path...": {
		render() {
			return m(Layout, m({
				view() {
					return m(".welcome", [
						m("h1", "Page Not Found :("),
						m("p", [
							m("a", {href: "/", oncreate: m.route.link}, "Click here"),
							" to go back home.  Otherwise, if you are looking for the farmclock, it's been relocated to ",
							m("a", {href: "/farmclock", oncreate: m.route.link}, "https://osrs.moe/farmclock")
						])
					]);
				}
			}));
		}
	},
});
