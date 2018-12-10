// @flow

const debug = require("debug")("Leeruniek:LUCheckboxSeparator")

import * as React from "react"
import cx from "classnames"

import css from "./checkbox-group.css"

import type { LUCheckboxHeaderType } from "./checkbox-group.types"

export const LUCheckboxHeader = (props: LUCheckboxHeaderType): React.Node => (
  <div className={props.className}>{props.label}</div>
)
