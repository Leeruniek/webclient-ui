// @flow

const debug = require("debug")("WebclientUI:LUTag")

import * as React from "react"
import cx from "classnames"

import css from "./tag.css"

type TagTypeType = "warning" | "info"
type TagSizeType = "small"

type LUTagPropsType = {|
  className?: string,
  type?: TagTypeType,
  label: string,
  size?: TagSizeType,
  hasIcon?: boolean,
  isActive?: boolean,
  onClick?: Function,
|}

export class LUTag extends React.PureComponent<LUTagPropsType> {
  // Defaults for non-required props
  static defaultProps = {
    className: undefined,
    type: undefined,
    size: undefined,
    hasIcon: true,
    isActive: false,
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
    const { className, type, label, size, isActive, onClick } = this.props

    return (
      <span
        onClick={onClick}
        className={cx(css.tag, className, {
          [css[`tag--is-clickable`]]: !!onClick,
          [css[`tag--is-active`]]: isActive,
          [css[`tag--${type}`]]: !!type,
          [css[`tag--${size}`]]: !!size,
        })}>
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
