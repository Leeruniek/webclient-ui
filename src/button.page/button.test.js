import test from "tape"
import React from "react"
import TestRenderer from "react-test-renderer"

import { LUButton } from "./button.component"

test("LUButton", t => {
  const LUButtonRenderer = TestRenderer.create(<LUButton label="foo" />)
  const button = LUButtonRenderer.toJSON()

  t.deepEquals(button.children, ["foo"], "")

  t.end()
})
