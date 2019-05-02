// @flow

const debug = require("debug")("Leeruniek:LULoaderOverlay")

import * as React from "react"
import cx from "classnames"

import css from "./loader-overlay.module.css"

type LULoaderOverlayPropsType = {
  isTransparent?: boolean,
  isVisible: boolean,
}

export const LULoaderOverlay = ({
  isTransparent = false,
  isVisible,
}: LULoaderOverlayPropsType): React.Node => (
  <div
    style={{
      display: isVisible ? "block" : "none",
    }}
    className={cx(css.overlay, css["overlay--loading"], {
      [css["overlay--transparent"] || ""]: isTransparent,
    })}>
    <div className={css.overlay__icon}>
      <i className="fa fa-spinner fa-spin" />
    </div>
  </div>
)
