// @flow

const debug = require("debug")("Leeruniek:LUHistogram")

import * as React from "react"
import { map, reduce } from "@leeruniek/functies"

import css from "./histogram.module.css"

type LUHistogramPropsType = {
  label: string,
  labelTotal?: string,
  data: Object,
  ticks: string[],
  type?: "table",
  orientation?: "horizontal",
  hasTotal?: boolean,
  hasCount?: boolean,
  countRenderer?: Function,
}

export const LUHistogram = ({
  label,
  labelTotal = "Totaal",
  data,
  ticks,
  type = "table",
  orientation = "horizontal",
  hasTotal = true,
  hasCount = false,
  countRenderer = (count = 0) => count,
}: LUHistogramPropsType): React.Node => {
  const total = reduce((acc, element) => acc + element, 0)(Object.values(data))

  return (
    <div className={css.histogram}>
      {type === "table" ? (
        <div className={css["histogram--table"]}>
          <div>
            {hasTotal ? (
              <React.Fragment>
                <div className={css.histogram__title}>{labelTotal}</div>
                <p>{total}</p>
              </React.Fragment>
            ) : null}
            <div className={css.histogram__title}>{label}</div>
            {map(value => {
              const percent = (data[value] / total) * 100

              return (
                <span key={value} className={css.histogram__item}>
                  <strong>{`${value}: `}</strong>
                  <span>{`${data[value] ? Math.round(percent) : "0"}%`}</span>
                  {hasCount ? (
                    <React.Fragment>
                      <br />
                      <small>{countRenderer(data[value])}</small>
                    </React.Fragment>
                  ) : null}
                </span>
              )
            })(ticks)}
          </div>
        </div>
      ) : null}
    </div>
  )
}
