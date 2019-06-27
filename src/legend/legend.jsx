// @flow

import * as React from "react"
import cx from "classnames"
import { is, isEmpty } from "@leeruniek/functies"
import { LUCheckbox } from "../checkbox/checkbox"

import css from "./legend.module.css"

type LegendItemType = {|
  color?: string,
  className?: string,
  label: string,
  value: string,
|}

type LULegendType = {|
  className?: string,
  type?: "block" | "inline",
  title?: string,
  items: LegendItemType[],
  selectedItems?: LegendItemType[],
  isInteractive?: boolean,
  onChange?: Function,
|}

export const LULegend = React.memo<LULegendType>(
  ({
    className,
    type = "block",
    title,
    items,
    isInteractive,
    selectedItems = [],
    onChange,
  }: LULegendType): React.Node => {
    return (
      <div
        className={cx(css.legend, css[`legend--${type}`], {
          [className || ""]: !isEmpty(className),
        })}>
        {is(title) ? <div className="legend__title">{title}</div> : null}
        {items.map((item: LegendItemType, idx: number) => (
          <div key={`legend-item-${idx}`} className={css.legend__item}>
            {isInteractive ? (
              <LUCheckbox
                size="small"
                color={item.color}
                name={item.value}
                isChecked={selectedItems.includes(item.value)}
                label={item.label}
                onChange={onChange}
              />
            ) : (
              <React.Fragment>
                <i
                  className={cx(
                    "fa",
                    "fa-square",
                    css.legend__item__color,
                    item.className
                  )}
                />
                <div className={css.legend__item__label}>{item.label}</div>
              </React.Fragment>
            )}
          </div>
        ))}
      </div>
    )
  }
)
