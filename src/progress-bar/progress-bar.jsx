// @flow

import * as React from "react"
import cx from "classnames"
import { ProgressBar } from "react-toolbox/lib/progress_bar/ProgressBar"
import { isEmpty } from "@leeruniek/functies"

import css from "./progress-bar.module.css"

type LUProgressBarPropsType = {
  className?: string,
  color?: string,
  mode?: string,
  max?: number,
  value?: number,
  isVisible: boolean,
}

export const LUProgressBar = ({
  className = "",
  color = "",
  mode = "indeterminate",
  max = 100,
  value = 0,
  isVisible = false,
}: LUProgressBarPropsType): React.Node =>
  isVisible ? (
    <ProgressBar
      className={cx(className, {
        [css[color] || ""]: !isEmpty(color),
      })}
      theme={css}
      mode={mode}
      max={max}
      value={value}
      disabled={!isVisible}
    />
  ) : null
