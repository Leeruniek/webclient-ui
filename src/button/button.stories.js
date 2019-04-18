import React from "react"
import { storiesOf } from "@storybook/react"
import { LUButton } from "./button"

storiesOf("LUButton", module)
  .add("Simple button", () => <LUButton label="LUButton" />)
  .add("props: {isPrimary: true}", () => (
    <LUButton label="LUButton" isPrimary={true} />
  ))
  .add("Button with color scheme", () => (
    <React.Fragment>
      <LUButton label="Yellow LUButton" color="yellow" isPrimary={true} />
      <LUButton label="red" color="red" isPrimary={true} />
      <LUButton label="purple" color="purple" isPrimary={true} />
    </React.Fragment>
  ))
