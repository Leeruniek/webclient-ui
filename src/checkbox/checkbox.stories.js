import React from "react"
import { storiesOf } from "@storybook/react"
import { LUCheckbox } from "./checkbox"

const LUСheckboxContainer = props => {
  const [isChecked, setChecked] = React.useState(false)

  const handleChange = () => {
    setChecked(!isChecked)
  }

  return (
    <LUCheckbox
      isChecked={isChecked}
      onChange={handleChange}
      {...props}
    />
  )
}

storiesOf("LUCheckbox", module).add("LUCheckbox", () => (
    <LUСheckboxContainer color="yellow"
    />
  )).add("LUCheckbox with label", () => (
    <LUСheckboxContainer
      label="Click me"
    />
  )).add("Disabled LUCheckbox", () => (
    <LUСheckboxContainer
      label="Click me"
      isDisabled={true}
      isChecked={true}
    />
  ))
