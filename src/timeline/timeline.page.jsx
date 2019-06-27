// @flow

import * as React from "react"

import { LUTimeline } from "./timeline"

const LUTimelinePage = (): React.Node => {
  const items = [
    {
      key: 1,
      title: "Verrijkt (huidig)",
      date: "26 - 03 - 2019",
      user: "Joyce Bakker",
      icon: "arrows-h",
    },
    {
      key: 2,
      title: "Basis",
      date: "20 - 12 - 2018",
      user: "Juf Joyce",
      icon: "arrows-h",
    },
    {
      key: 3,
      title: "Verrijkt",
      date: "15 - 10 - 2018",
      user: "Leeruniek",
      icon: "arrows-h",
    },
  ]

  return (
    <LUTimeline
      items={items}
      renderChild={(): React.Node => <p>Any component can go here</p>}
    />
  )
}

export { LUTimelinePage }
