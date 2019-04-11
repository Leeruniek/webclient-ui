// @flow

const debug = require("debug")("Leeruniek:LULegend")

import * as React from "react"
import cx from "classnames"
import { is, isEmpty } from "@leeruniek/functies"

import css from "./legend.module.css"

type LegendItemType = {|
  className: string,
  label: string,
|}

type LULegendType = {|
  className?: string,
  type?: "block" | "inline",
  title?: string,
  items: LegendItemType[],
|}

export const LULegend = React.memo<LULegendType>(
  ({ className, type = "block", title, items }: LULegendType): React.Node => {
    return (
      <div
        className={cx(css.legend, css[`legend--${type}`], {
          [className || ""]: !isEmpty(className),
        })}>
        {is(title) ? <div className="legend__title">{title}</div> : null}
        {items.map((item: LegendItemType, idx: number) => (
          <div key={`legend-item-${idx}`} className={css.legend__item}>
            <i
              className={cx(
                "fa",
                "fa-square",
                css.legend__item__color,
                item.className
              )}
            />
            <div className={css.legend__item__label}>{item.label}</div>
          </div>
        ))}
      </div>
    )
  }
)
