// @flow

const debug = require("debug")("Leeruniek:LUTableCell")

import * as React from "react"
import cx from "classnames"
import Ripple  from "../../node_modules/react-toolbox/lib/ripple"

import css from "./table.module.css"
import { is } from "@leeruniek/functies"

type LUTableCellPropsType = {|
  className?: string,
  children: React.Node[] | React.Node,
  sortDirection?: string,
  isHeader?: boolean,
  onClick?: Function,
|}

const RippleableDiv:React.Node = Ripple({ spread: 2 })(props => {
  const { children } = props

  return (
    <div style={{ position: "relative" }} {...props}>
      {children}
    </div>
  )
})

export const LUTableCell = React.memo<LUTableCellPropsType>(
  ({
    className,
    children,
    sortDirection,
    isHeader = false,
    onClick,
  }: LUTableCellPropsType): React.Node => (
    <div
      className={cx(css.table__cell, {
        [className]: !!className,
        [css.table__head]: isHeader,
      })}
      onClick={onClick}>
      {is(onClick) ? <RippleableDiv>{children}</RippleableDiv> : children}
    </div>
  )
)
