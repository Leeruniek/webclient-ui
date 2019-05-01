import React from "react"
import { storiesOf } from "@storybook/react"
import { LURadio } from "../radio/radio"
import { LURadioGroup } from "./radio-group"
import { LURadioSeparator } from "./radio-group__separator"

const LURadioGroupContainer = props => {
  const [selectedValue, setSelectedValue] = React.useState()

  const handleRadioGroupChange = ({ value }) => {
    setSelectedValue(value)
  }

  return (
    <div>
      <LURadioGroup value={selectedValue} onChange={handleRadioGroupChange}>
        <LURadio label="1" value="1" />
        <LURadio label="2" value="2" />
        <LURadio label="3" value="3" />
      </LURadioGroup>
    </div>
  )
}

storiesOf("LURadioGroup", module).add("LURadioGroup", () => (
  <LURadioGroupContainer />
))
