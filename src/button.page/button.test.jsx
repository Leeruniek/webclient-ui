import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { LUButton } from "./button.component"

test("LUButton", t => {
  const labelRenderer = TestRenderer.create(<LUButton label="foo" />)
  const buttonWithLabel = labelRenderer.toJSON()

  t.deepEquals(
    buttonWithLabel.children,
    ["foo"],
    "Label is rendered as direct child"
  )

  t.end()
})
