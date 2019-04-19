import React from "react"
import { storiesOf } from "@storybook/react"
import { LUTabs } from "./tabs"

const TABS_MOCK_DATA = [
  {
    icon: "fa-file-text-o",
    iconActive: "fa-file-text",
    id: 23961,
    label:"test 1",
  },
  {
    icon: "fa-file-text-o",
    iconActive: "fa-file-text",
    id: 23962,
    label:"test 2",
  }
]
storiesOf("LUTabs", module)
  .add("LUTabs", () => (
    <React.Fragment>
      <LUTabs tabs={TABS_MOCK_DATA} onChange={()=>{}}/>
    </React.Fragment>
  ))