import m from "mithril";
import { MacroForm } from "./MacroForm";
import { MacroResult } from "./MacroResult";
import { Calculator } from "../Calculators";

export interface Rate {
  start: number;
  goal: number;
  base: number;
  extra: number;
}

interface State {
  first: Rate;
  second: Rate;
}

export const Macro: m.Component<{}, State> & Calculator = {
  url: "/calculators/macro",
  blurb: `
  Calculate the amount of hours to put into two skills that share bonus XP
  to meet a set goal XP.
  `,

  oninit: ({ state }) => {
    state.first = defaultRate();
    state.second = defaultRate();
  },

  view: ({ state }) =>
    m("main.h-full.flex.flex-col", [
      m(".flex.flex-col.sm:flex-row.self-center.my-4", [
        m(MacroForm, { prefix: "left", rate: state.first }, "First Skill"),
        m(MacroForm, { prefix: "right", rate: state.second }, "Second Skill")
      ]),
      m(MacroResult, { ...state })
    ])
};

const defaultRate = (): Rate => ({
  start: 13_034_431,
  goal: 200_000_000,
  base: 100_000,
  extra: 10_000
});
