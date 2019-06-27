// @flow

import * as React from "react"
import cx from "classnames"
import Ripple from "../../node_modules/react-toolbox/lib/ripple"

import css from "./table.module.css"
import { is, isEmpty } from "@leeruniek/functies"

type LUTableCellPropsType = {|
  className?: string,
  children: React.Node[] | React.Node,
  isHeader?: boolean,
  onClick?: Function,
|}

const RippleableDiv: React.Node = Ripple({ spread: 2 })(props => {
  const { children } = props

  return (
    <div style={{ position: "relative" }} {...props}>
      {children}
    </div>
  )
})

export const LUTableCell = React.memo<LUTableCellPropsType>(
  ({
    className = "",
    children,
    isHeader = false,
    onClick,
  }: LUTableCellPropsType): React.Node => (
    <div
      className={cx(css.table__cell, {
        [className]: !isEmpty(className),
        [css.table__head]: isHeader,
      })}
      onClick={onClick}>
      {is(onClick) ? <RippleableDiv>{children}</RippleableDiv> : children}
    </div>
  )
)
