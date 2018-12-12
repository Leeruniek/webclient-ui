// @flow

const debug = require("debug")("WebclientUI:LUCheckboxGroupHeader")

import * as React from "react"
import cx from "classnames"

import css from "./checkbox-group.css"

export type PropType = {
  className?: string,
  label: string,
}

export const LUCheckboxGroupHeader = ({
  className,
  label,
}: PropType): React.Node => (
  <div className={cx(css["checkbox-group__header"], className)}>{label}</div>
)
