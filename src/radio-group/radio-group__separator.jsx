// @flow

import * as React from "react"

import css from "./radio-group.module.css"

export const LURadioSeparator = ({ label }: { label: string }): React.Node => (
  <div className={css["radio-group__separator"]}>{label}</div>
)
