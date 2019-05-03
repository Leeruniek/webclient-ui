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
        <React.Fragment>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9" ,"10"].map((el) =><LURadio label={el} value={el} />)}
        </React.Fragment>
        <LURadio label="11" value="11" />
        <LURadio label="12" value="12" />
      </LURadioGroup>
    </div>
  )
}

storiesOf("LURadioGroup", module).add("LURadioGroup", () => (
  <LURadioGroupContainer />
))
