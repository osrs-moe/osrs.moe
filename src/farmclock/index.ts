import m from "mithril";
import plant_data, { PlantData } from "./plant_data";
import "./farmclock.scss";
import * as farmclock from "./farmclock";

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;
const slot_size = 5 * _minute;

type TimerIntervals = { [key: number]: string };

function create_timer_update(timers: TimerIntervals, plant_data: PlantData[]) {
  const intervals = plant_data.map(data => data.interval);
  return function() {
    intervals.forEach(interval => {
      timers[interval] = get_window_time_difference(interval);
    });
    m.redraw();
  };
}

function get_window_time_difference(interval: number) {
  const now = new Date();
  const midnight = new Date();
  midnight.setUTCHours(0, 0, 0, 0);

  for (let i = 1; i <= interval / slot_size; i++) {
    const test_time = now.getTime() + (slot_size * i + 1);
    const ms_since_midnight = test_time - midnight.getTime();

    if (ms_since_midnight % interval < slot_size) {
      const window_time = new Date(test_time);
      window_time.setUTCMinutes(
        5 * Math.floor(window_time.getUTCMinutes() / 5),
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
  timer_updater: NodeJS.Timeout;
  interval_timers: TimerIntervals;
}

export default {
  oninit() {
    const interval_timers = {};
    const timer_update = create_timer_update(interval_timers, plant_data);
    const timer_updater = setInterval(timer_update, 1000);

    this.interval_timers = interval_timers;
    this.timer_updater = timer_updater;
    timer_update();
  },
  oncreate() {
    farmclock.start();
    window.addEventListener("resize", farmclock.resize_canvas, true);
  },
  onremove() {
    clearInterval(this.timer_updater);
    window.removeEventListener("resize", farmclock.resize_canvas, true);
    farmclock.stop();
  },
  view() {
    return m(".farmclock", [
      m("canvas#farmclock_canvas"),
      m(".plantdata", [
        m("table.preset", [
          m("thead", [
            m("tr", [
              m("td", "Plants"),
              m("td", "Growth Window Time"),
              m("td", "Growth Windows"),
              m("td", "Time to Next Window")
            ])
          ]),
          m(
            "tbody",
            plant_data
              .slice()
              .reverse()
              .map(data =>
                data.plants
                  .slice()
                  .reverse()
                  .map(plant =>
                    m("tr", { style: { backgroundColor: data.color } }, [
                      m("td", plant.name),
                      m("td", data.interval_description),
                      m("td", plant.windows),
                      m("td", this.interval_timers[data.interval])
                    ])
                  )
              )
          )
        ])
      ]),
      m("p.signature", [
        "-bitwise | ",
        m("a", { href: "https://twitter.com/buttwize" }, "@buttwize")
      ])
    ]);
  }
} as m.Component<{}, State>;
