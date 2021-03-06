// @flow


import * as React from "react"
import cx from "classnames"

import css from "./checkbox-group.css"

export type LUCheckboxGroupHeaderPropType = {
  className?: string,
  label: string,
}

export const LUCheckboxGroupHeader = ({
  className = "",
  label,
}: LUCheckboxGroupHeaderPropType): React.Node => (
  <div className={cx(css["checkbox-group__header"], className)}>{label}</div>
)
