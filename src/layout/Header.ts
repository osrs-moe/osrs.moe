import m from "mithril";
const Link = m.route.Link;

const HEADER_LINK = "text-gray-200 hover:text-gray-400 hover:no-underline mx-2";

export const Header = {
  view: () =>
    m(
      "header.bg-gray-800.text-md",
      m(".max-w-6xl.mx-auto.my-2", [
        m(
          Link,
          {
            href: "/",
            class: `text-3xl ${HEADER_LINK} mx-4 my-1`,
          },
          "osrs.moe"
        ),
        m(Link, { href: "/farmclock", class: HEADER_LINK }, "Farm Clock"),
        m(Link, { href: "/calculators", class: HEADER_LINK }, "Calculators"),
      ])
    ),
};
