import m from "mithril";
import { router } from "./router";
import "./style.css";

m.route.prefix = "";
m.route(document.body, "/", router);
