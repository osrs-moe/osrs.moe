import m from "mithril";
import { Rate } from "./Macro";

const INPUT_STYLE = `
border-b-2
border-teal-500
appearance-none
bg-transparent
w-full
text-gray-400
mr-3
py-1
px-2
leading-tight
focus:outline-none
mb-4`;

const LABEL_STYLE = `
uppercase
text-gray-600
text-xs
font-bold`;

interface Attrs {
  prefix: string;
  rate: Rate;
  startClass?: string;
  goalClass?: string;
  baseClass?: string;
  extraClass?: string;
}

interface State {
  rate: Rate;
}

export const MacroForm: m.Component<Attrs, State> = {
  oninit: ({ attrs, state }) => {
    state.rate = attrs.rate;
  },

  view: ({ attrs, state, children }) =>
    m("form.flex.flex-col.mx-4", { onsubmit }, [
      m("label.text-lg.text-center", children),
      m(
        RateInput,
        {
          id: `${attrs.prefix}-rate-goal`,
          placeholder: 200_000_000,
          oninput: setGoal.bind(state),
          class: `my-2 ${INPUT_STYLE} ${attrs.goalClass}`,
        },
        "Goal XP"
      ),
      m(
        RateInput,
        {
          id: `${attrs.prefix}-rate-start`,
          placeholder: 13_034_431,
          oninput: setStart.bind(state),
          class: `my-2 ${INPUT_STYLE} ${attrs.startClass}`,
        },
        "Start XP"
      ),
      m(
        RateInput,
        {
          id: `${attrs.prefix}-rate-base`,
          placeholder: 100_000,
          oninput: setBase.bind(state),
          class: `my-2 ${INPUT_STYLE} ${attrs.baseClass}`,
        },
        "XP/HR"
      ),

      m(
        RateInput,
        {
          id: `${attrs.prefix}-rate-extra`,
          placeholder: 10_000,
          oninput: setExtra.bind(state),
          class: `my-2 ${INPUT_STYLE} ${attrs.extraClass}`,
        },
        "Bonus XP/HR"
      ),
    ]),
};

const RateInput: m.Component<any> = {
  view: ({ attrs, children }) => [
    m(
      "label",
      {
        for: attrs.id,
        class: LABEL_STYLE,
      },
      children
    ),
    m("input", {
      type: "number",
      max: 200_000_000,
      min: 0,
      ...attrs,
    }),
  ],
};

interface InputEvent {
  target: HTMLInputElement;
}

function setStart(this: State, e: InputEvent) {
  this.rate.start = Number(e.target.value);
}

function setGoal(this: State, e: InputEvent) {
  this.rate.goal = Number(e.target.value);
}

function setBase(this: State, e: InputEvent) {
  this.rate.base = Number(e.target.value);
}

function setExtra(this: State, e: InputEvent) {
  this.rate.extra = Number(e.target.value);
}

function onsubmit(event: Event) {
  event.preventDefault();
}
