// @flow

import * as React from "react"
import { RadioButton } from "react-toolbox/lib/radio/RadioButton"

import css from "./radio.module.css"

type LURadioPropsType = {|
  className?: string,
  label: string | React.Node,
  type?: string,
  value?: string | number,
  other?: Object,
  isDisabled?: boolean,
  isChecked?: boolean,
  onChange?: Function,
|}

export class LURadio extends React.PureComponent<LURadioPropsType> {
  static defaultProps = {
    className: "",
    other: {},
    isDisabled: false,
    isChecked: false,
  }

  render = (): React.Node => {
    const { className, label, value, isDisabled, isChecked } = this.props

    return (
      <RadioButton
        className={className}
        label={label}
        value={String(value)}
        disabled={isDisabled}
        checked={isChecked}
        theme={css}
        onChange={this.handleChange}
      />
    )
  }

  handleChange = (): void => {
    const { onChange, label, value, type, other } = this.props

    onChange && onChange({ value, label, type, other })
  }
}
