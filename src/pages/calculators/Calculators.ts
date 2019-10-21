import m from "mithril";
import { Macro } from "./macro/Macro";
const Link = m.route.Link;

export interface Calculator {
  blurb: string;
  url: string;
}

export const Calculators = {
  view: () =>
    m("main.flex.flex-wrap.max-w-lg", [
      m(Calc, { title: "Macro Efficiency", calc: Macro })
    ]),

  // child modules
  Macro
};

interface Attrs {
  title: string;
  calc: Calculator;
}

const Calc: m.Component<Attrs> = {
  view: ({ attrs }) =>
    m(Link, { href: attrs.calc.url, class: "flex flex-col unlink" }, [
      m("h2.text-2xl", attrs.title),
      m("p", attrs.calc.blurb)
    ])
};
