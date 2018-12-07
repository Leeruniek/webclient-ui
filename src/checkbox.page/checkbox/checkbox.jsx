// @flow

const debug = require("debug")("WebclientUI:LUCheckbox")

import React from "react"
import cx from "classnames"
import { isEmpty } from "@leeruniek/functies"

import css from "./css/checkbox.css"


type LUCheckboxPropsType = {|
  className: string,
  customStyle: string,
  label: string,
  isDisabled: boolean,
  isChecked: boolean,
  onChange: Function
|}

const LUCheckbox = React.memo((props: LUCheckboxPropsType): React.Node  =>  (
    <label className={cx(css.field, {
      [css["disabled"]]: props.isDisabled,
      [props.className]: !isEmpty(props.className),
      [css[props.customStyle]]: !isEmpty(props.customStyle),
    })}>
      <input
        type="checkbox"
        disabled={props.isDisabled}
        checked={props.isChecked}
        className={css.input}
        onChange={props.onChange}
      />
      <div className={cx(css.check, { [css.checked]: props.isChecked })}/>
      {props.label ? <span className={css.text}>{props.label}</span> : null}
    </label>
  )
)

export { LUCheckbox }
