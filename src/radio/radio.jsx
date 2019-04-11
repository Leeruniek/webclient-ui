// @flow

const debug = require("debug")("Leeruniek:LURadio")

import * as React from "react"
import { RadioButton } from "react-toolbox/lib/radio/RadioButton"

import css from "./radio.module.css"

type LURadioType = {|
  className?: string,
  label: string | React.Node,
  type?: string,
  value?: string | number,
  other?: Object,
  isDisabled?: boolean,
  isChecked?: boolean,
  onChange?: Function,
|}

export const LURadio =
  React.memo<LURadioType>(({
    className = "",
    label,
    type,
    value,
    other = {},
    isDisabled = false,
    isChecked = false,
    onChange,
  }: LURadioType): React.Node => {
    const handleChange = () => {
      onChange && onChange({ value, label, type, other })
    }

    return (
      <RadioButton
        className={className}
        label={label}
        value={String(value)}
        disabled={isDisabled}
        checked={isChecked}
        theme={css}
        onChange={handleChange}
      />
    )
  }
)
