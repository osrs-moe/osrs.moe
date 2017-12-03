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
	}
});
