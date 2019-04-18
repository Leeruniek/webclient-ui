import React from "react"
import { storiesOf } from "@storybook/react"
import { LUTable } from "./table"

const TABLE_DATA_MOCK = [
  {
    name: "white",
    hex: "#FFFFFF",
    rgb: "RGB(255, 255, 255)",
  },
  {
    name: "black",
    hex: "#000000",
    rgb: "RGB(0, 0, 0)",
  },
  {
    name: "red",
    hex: "#FF0000",
    rgb: "RGB(255, 0, 0)",
  },
  {
    name: "yellow",
    hex: "#FFFF00",
    rgb: "RGB(255, 255, 0)",
  },
  {
    name: "green",
    hex: "#008000",
    rgb: "RGB(0, 128, 0)",
  },
]

const LUTableStoryContainer = props => {
  const renderName = ({ name }) => <div>{name}</div>
  const renderHex = ({ hex }) => <div>{hex}</div>
  const renderRGB = ({ rgb }) => <div>{rgb}</div>

  return (
    <LUTable
      columns={{
        name: {
          header: "Name",
          onCellRender: renderName,
        },
        hex: {
          header: "HEX",
          onCellRender: renderHex,
        },
        rgb: {
          header: "RGB",
          onCellRender: renderRGB,
        },
      }}
      rows={TABLE_DATA_MOCK}
      {...props}
    />
  )
}

storiesOf("LUTable", module).add("Simple table", () => (
  <LUTableStoryContainer />
))
