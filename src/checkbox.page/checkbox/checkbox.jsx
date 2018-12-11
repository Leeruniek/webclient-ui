// @flow

const debug = require("debug")("WebclientUI:LUCheckbox")

import * as React from "react"
import cx from "classnames"
import { isEmpty } from "@leeruniek/functies"

import css from "./css/checkbox.css"
import type { LUCheckboxType } from "./checkbox.types"

export class LUCheckbox extends React.Component<LUCheckboxType> {
  static defaultProps = {
    isDisabled: false,
    isChecked: false,
    name: '',
    label: '',
    className: '',
    customStyle: '',
  };

  constructor(props: LUCheckboxType) {
    super(props)
  }

  render(): React.Node {
    const{
      isDisabled,
      isChecked,
      name,
      label,
      className,
      customStyle,
      onChange
    } = this.props;

    return (
      <label
        className={cx(css.field, {
          [css["disabled"]]: isDisabled,
          [className || ""]: !isEmpty(className),
          [css[customStyle]]: !isEmpty(customStyle),
        })}>
        <input
          type="checkbox"
          name={name}
          disabled={isDisabled}
          checked={isChecked}
          className={css.input}
          onChange={onChange}
        />
        <div className={cx(css.check, { [css.checked]: isChecked })} />
        {label ? <span className={css.text}>{label}</span> : null}
      </label>
    )
  }
}
