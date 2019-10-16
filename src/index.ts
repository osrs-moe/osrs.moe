import m from "mithril";
import { router } from "./router";
import "./style.scss";

m.route.prefix = "";
m.route(document.body, "/", router);
