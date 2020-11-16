import m from "mithril";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/home/Home";
import FarmClock from "./pages/farmclock/FarmClock";
import { NotFound } from "./pages/404/NotFound";
import { Calculators } from "./pages/calculators/Calculators";

const route = <A, S>(component: m.ComponentTypes<A, S>) => ({
  onmatch: () => component,
  render: (vnode: m.Vnode<A, S>) => m(Layout, vnode),
});

export const router = {
  "/": route(Home),
  "/farmclock": route(FarmClock),

  "/calculators": route(Calculators),
  [Calculators.Macro.url]: route(Calculators.Macro),

  "/:404...": route(NotFound),
};
