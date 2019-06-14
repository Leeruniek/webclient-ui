// @flow

const debug = require("debug")("WebclientUI:LUCheckbox")

import * as React from "react"
import cx from "classnames"
import { isEmpty } from "@leeruniek/functies"

import css from "./css/checkbox.module.css"

type LUCheckboxPropsType = {
  className?: string,
  color?: string,
  colorTheme: string,
  label: string,
  name?: string,
  size?: "small" | "large",
  isDisabled?: boolean,
  isChecked?: boolean,
  onChange?: Function,
}

export class LUCheckbox extends React.Component<LUCheckboxPropsType> {
  static defaultProps = {
    className: "",
    name: "",
    colorTheme: "",
    color: "",
    isDisabled: false,
    isChecked: false,
    onChange: null,
  }

  render(): React.Node {
    const {
      isDisabled,
      isChecked,
      name,
      label,
      className,
      color,
      colorTheme,
      size,
      onChange,
    } = this.props

    return (
      <label
        className={cx(css.field, {
          [css.disabled]: isDisabled,
          [className || ""]: !isEmpty(className),
          [css[colorTheme]]: !isEmpty(colorTheme),
          [css.small]: size === "small",
        })}>
        <input
          type="checkbox"
          name={name}
          disabled={isDisabled}
          checked={isChecked}
          className={css.input}
          onChange={onChange}
        />
        <div
          className={cx(css.check, {
            [css.checked]: isChecked,
          })}
          style={
            isChecked && !isEmpty(color)
              ? {
                  backgroundColor: color,
                  borderColor: color,
                }
              : null
          }
        />
        {label ? <span className={css.text}>{label}</span> : null}
      </label>
    )
  }
}
