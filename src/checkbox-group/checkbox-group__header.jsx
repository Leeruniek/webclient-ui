// @flow

const debug = require("debug")("Leeruniek:LUCheckboxSeparator")

import * as React from "react"
import cx from "classnames"

import css from "./checkbox-group.css"

import type { LUCheckboxGroupHeaderType } from "./checkbox-group.types"

export const LUCheckboxGroupHeader = (
  props: LUCheckboxGroupHeaderType
): React.Node => <div className={cx(css["checkbox-group__header"], props.className)}>{props.label}</div>
