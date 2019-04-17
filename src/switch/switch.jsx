// @flow

const debug = require("debug")("Leeruniek:LUSwitch")

import React from "react"
import { Switch } from "react-toolbox/lib/switch/Switch"
import cx from "classnames"
import { is } from "@leeruniek/functies"

import css from "./switch.module.css"

type LUSwitchPropsType = {|
  label?: string,
  color?: string,
  className?: string,
  isChecked?: boolean,
  onChange?: Function,
|}

export const LUSwitch = ({
  label,
  color,
  className,
  isChecked = false,
  onChange,
}: LUSwitchPropsType): React.Node => (
  <Switch
    className={cx({
      [css[color] || ""]: is(color),
      [className || ""]: is(className),
    })}
    label={label}
    checked={isChecked}
    theme={css}
    onChange={onChange}
  />
)
