import React from "react"
import { storiesOf } from "@storybook/react"
import { LUTimeline } from "./timeline"

const items = [
  {
    id: 1,
    title: "Verrijkt (huidig)",
    date: "26 - 03 - 2019",
    user: "Joyce Bakker",
    icon: "arrows-h",
    tooltipText: "Test 1",
  },
  {
    id: 2,
    title: "Basis",
    date: "20 - 12 - 2018",
    user: "Juf Joyce",
    icon: "arrows-h",
    tooltipText: "Test 2",
  },
  {
    id: 3,
    title: "Verrijkt",
    date: "15 - 10 - 2018",
    user: "Leeruniek",
    icon: "arrows-h",
    tooltipText: "Test 3  ",
  },
]

storiesOf("LUTimeline", module).add("Simple timeline", () => (
  <LUTimeline
    items={items}
    renderChild={(): React.Node => <p>Any component can go here</p>}
  />
))
