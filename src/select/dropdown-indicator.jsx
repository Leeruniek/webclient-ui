// @flow

import React, { type ElementConfig } from "react"
import { components } from "react-select"
import css from "./css/select.module.css"

export const DropdownIndicator = (
  props: ElementConfig<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className={css.dropdownIndicator} />
    </components.DropdownIndicator>
  )
}
