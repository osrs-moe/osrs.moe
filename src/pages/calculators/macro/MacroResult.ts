import m from "mithril";
import { Rate } from "./Macro";

interface Attrs {
  first: Rate;
  second: Rate;
}

export const MacroResult: m.Component<Attrs> = {
  view: ({ attrs }) =>
    m(
      ".self-center",
      total_xp_diff(attrs.first, attrs.second) === 0
        ? m(Error, attrs)
        : m(Success, attrs)
    )
};

const Error: m.Component<Attrs> = {
  view: () =>
    m(
      "p.text-red-500",
      "The difference between both xp/hr and both bonus xp/hr cannot be 0."
    )
};

const Success: m.Component<Attrs> = {
  view: ({ attrs }) => {
    const firstHours = hoursToGoal(attrs.first, attrs.second);
    const firstXp =
      attrs.first.start + firstHours * attrs.first.base
    ;

    const secondHours = hoursToGoal(attrs.second, attrs.first);
    const secondXp =
      attrs.second.start + secondHours * attrs.second.base
    ;

    return [
      m(
        "h2.text-2xl.text-center",
        `Total Hours: ~${fmtInt(firstHours + secondHours)}`
      ),
      m("table", [
        m(
          "thead",
          m("tr.uppercase.font-bold.text-sm.text-gray-600.text-center", [
            m("td", "Skill"),
            m("td", "Hours"),
            m("td", "End XP")
          ])
        ),
        m("tbody.text-center", [
          m("tr", [
            m(`td.text-right.px-2.py-1`, "First"),
            m(`td.font-mono.px-2.py-1`, fmtInt(firstHours)),
            m(`td.font-mono.px-2.py-1`, fmtInt(firstXp))
          ]),
          m("tr", [
            m(`td.text-right.px-2.py-1`, "Second"),
            m(`td.font-mono.px-2.py-1`, fmtInt(secondHours)),
            m(`td.font-mono.px-2.py-1`, fmtInt(secondXp))
          ])
        ])
      ])
    ];
  }
};

const fmtInt = (n: number) => Math.round(n).toLocaleString()

const hoursToGoal = (first: Rate, second: Rate) =>
  (first.goal * second.base -
    second.goal * second.extra -
    second.base * first.start +
    second.extra * second.start) /
  total_xp_diff(first, second);

export const total_xp_diff = (first: Rate, second: Rate) =>
  first.base * second.base - first.extra * second.extra;
