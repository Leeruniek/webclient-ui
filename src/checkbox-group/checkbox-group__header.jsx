// @flow

const debug = require("debug")("Leeruniek:LUCheckboxSeparator")

import * as React from "react"
import cx from "classnames"

import css from "./checkbox-group.css"

import type { LUCheckboxGroupHeaderPropsType } from "./checkbox-group.types"

export const LUCheckboxGroupHeader = ({
  className,
  label,
}: LUCheckboxGroupHeaderPropsType): React.Node => (
  <div className={cx(css["checkbox-group__header"], className)}>{label}</div>
)
