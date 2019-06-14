import React from "react"
import { storiesOf } from "@storybook/react"
import { LULegend } from "./legend"

import css from "./legend.module.css"

const options = [
  { value: "chocolate", label: "Chocolate", color: "#700808" },
  { value: "strawberry", label: "Strawberry", color: "#FF4136" },
  { value: "vanilla", label: "Vanilla", color: "#f3e5ab"},
]

storiesOf("LULegend", module).add("Interactive legend", () => (
  <LULegend
    type="inline"
    isInteractive={true}
    items={options.map(option => ({
      color: option.color,
      label: option.label,
      value: option.value,
    }))}
    selectedItems={options.map(option => option.value)}
  />
))
