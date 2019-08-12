import React from "react"
import { storiesOf } from "@storybook/react"
import { LUActions } from "./actions"

storiesOf("LUActions", module).add("Simple actions", () => (
  <LUActions
    actions={[
      {
        label: "Test 1",
        isRaised: true,
        isPrimary: true,
        onClick: () => {},
      },
      {
        label: "Test 2",
        isRaised: true,
        isPrimary: true,
        onClick: () => {},
      },
    ]}
    type="small"
    hasSeparator={true}
  />
))
