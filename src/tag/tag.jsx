// @flow

const debug = require("debug")("WebclientUI:LUTag")

import * as React from "react"
import cx from "classnames"

import css from "./tag.css"

type TagTypeType = "default" | "primary" | "warning" | "info"
type TagSizeType = "small" | "normal" | "large"

type LUTagPropsType = {|
  className: string,
  type: TagTypeType,
  label: string,
  size: TagSizeType,
  hasIcon: boolean,
  onClick?: Function,
|}

export class LUTag extends React.PureComponent<LUTagPropsType> {
  // Defaults for non-required props
  static defaultProps = {
    className: "",
    type: "default",
    size: "normal",
    hasIcon: true,
    onClick: undefined,
  }

  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = (): React.Node => {
    const { className, type, label, size, onClick } = this.props

    return (
      <span
        onClick={onClick}
        className={cx(
          css.tag,
          className,
          css[`tag__type--${type}`],
          css[`tag__size--${size}`],
          {
            [css[`tag--is-clickable`]]: !!onClick,
          }
        )}>
        {this.renderIcon()}
        {label}
      </span>
    )
  }

  renderIcon = (): React.Node => {
    const { hasIcon, type } = this.props

    if (!hasIcon || !type) {
      return null
    }

    return <i className={cx("fa", `fa-${type}`, css.icon)} />
  }
}
