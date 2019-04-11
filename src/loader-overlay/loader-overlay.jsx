// @flow

const debug = require("debug")("Leeruniek:LULoaderOverlay")

import * as React from "react"
import cx from "classnames"

import css from "./loader-overlay.module.css"

export const LULoaderOverlay = ({
  isTransparent = false,
  isVisible,
}: {
  isTransparent?: boolean,
  isVisible: boolean,
}): React.Node => (
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
