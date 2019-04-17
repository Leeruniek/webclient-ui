import React from "react"
import { storiesOf } from "@storybook/react"
import { LUCheckbox } from "./checkbox"

storiesOf("LUCheckbox", module).add("simple LUCheckbox", () => {
  let checked = false

  return (
    <LUCheckbox
      label="Click me"
      isChecked={checked}
      onChange={() => {
        checked = !checked
      }}
    />
  )
})
