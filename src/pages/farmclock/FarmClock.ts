import m from "mithril";
import plant_data, { PlantData } from "./plant_data";
import * as farmclock from "./logic";

type TimerIntervals = { [key: number]: string };

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

export function minute_per_slot(botanist: boolean): number {
  return botanist ? 1 : 5;
}

export function slot_size(botanist: boolean): number {
  return minute_per_slot(botanist) * _minute;
}

export function interval(data: PlantData, botanist: boolean): number {
  return botanist ? data.interval / 5 : data.interval;
}

function create_timer_update(
  timers: TimerIntervals,
  plant_data: PlantData[],
  botanist: boolean
) {
  const intervals = plant_data.map((data) => interval(data, botanist));
  return function () {
    intervals.forEach((interval) => {
      timers[interval] = get_window_time_difference(interval, botanist);
    });
    m.redraw();
  };
}

function get_window_time_difference(interval: number, botanist: boolean) {
  const now = new Date();
  const midnight = new Date();
  midnight.setUTCHours(0, 0, 0, 0);

  for (let i = 1; i <= interval / slot_size(botanist); i++) {
    const test_time = now.getTime() + (slot_size(botanist) * i + 1);
    const ms_since_midnight = test_time - midnight.getTime();

    if (ms_since_midnight % interval < slot_size(botanist)) {
      const window_time = new Date(test_time);
      window_time.setUTCMinutes(
        minute_per_slot(botanist) *
          Math.floor(window_time.getUTCMinutes() / minute_per_slot(botanist)),
        0
      );

      const difference = window_time.getTime() - now.getTime();
      const hours = ("0" + Math.floor((difference % _day) / _hour)).slice(-2);
      const mins = ("0" + Math.floor((difference % _hour) / _minute)).slice(-2);
      const secs = ("0" + Math.floor((difference % _minute) / _second)).slice(
        -2
      );

      return `${hours}:${mins}:${secs}`;
    }
  }

  return "N/A";
}

interface State {
  botanist: boolean;
  timer_updater: NodeJS.Timeout;
  interval_timers: TimerIntervals;
  toggle_botanist(): void;
  timers(): void;
}

export default {
  oninit() {
    this.botanist = window.localStorage.getItem("botanist") === "true";
    this.toggle_botanist = () => {
      this.botanist = !this.botanist;
      farmclock.set_botanist(this.botanist);
      window.localStorage.setItem("botanist", JSON.stringify(this.botanist));
    };

    this.timers = () => {
      clearInterval(this.timer_updater);
      const interval_timers = {};
      const timer_update = create_timer_update(
        interval_timers,
        plant_data,
        this.botanist
      );
      const timer_updater = setInterval(timer_update, 1000);

      this.interval_timers = interval_timers;
      this.timer_updater = timer_updater;
      timer_update();
    };

    this.timers();
  },
  oncreate() {
    farmclock.start(this.botanist);
    window.addEventListener("resize", farmclock.resize_canvas, true);
  },
  onremove() {
    clearInterval(this.timer_updater);
    window.removeEventListener("resize", farmclock.resize_canvas, true);
    farmclock.stop();
  },
  view() {
    return m("section.h-full.flex.flex-col.items-center", [
      m("canvas#farmclock_canvas"),
      m(".flex-1.flex.flex-col", [
        m(".flex.justify-center.m-5", [
          m("input#botanist", {
            type: "checkbox",
            checked: this.botanist,
            onclick: () => {
              this.toggle_botanist();
              this.timers();
            },
          }),
          m("label.pl-2", { for: "botanist" }, "Botanist (Trailblazer League)"),
        ]),
        m("table.text-center", [
          m("thead.text-gray-400", [
            m(`tr`, [
              m(`td.p-4`, "Plants"),
              m(`td.p-4`, "Growth Window Time"),
              m(`td.p-4`, "Growth Windows"),
              m(`td.p-4`, "Time to Next Window"),
            ]),
          ]),
          m(
            "tbody.text-gray-900",
            plant_data
              .slice()
              .reverse()
              .map((data) =>
                data.plants
                  .slice()
                  .reverse()
                  .map((plant, i, a) =>
                    m(`tr`, { style: { color: data.color } }, [
                      m(dataTd(i, a), plant.name),
                      m(
                        dataTd(i, a),
                        this.botanist
                          ? data.botanist_description
                          : data.interval_description
                      ),
                      m(dataTd(i, a), plant.windows),
                      m(
                        dataTd(i, a),
                        this.interval_timers[interval(data, this.botanist)]
                      ),
                    ])
                  )
              )
          ),
        ]),
      ]),
      m("p.py-5", [
        "-bitwise | ",
        m("a", { href: "https://twitter.com/buttwize" }, "@buttwize"),
      ]),
    ]);
  },
} as m.Component<{}, State>;

const dataTd = (i: number, a: any[]): string =>
  a.length - 1 === i ? "td.pb-4" : "td";
