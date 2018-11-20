// @flow

const debug = require("debug")("WebclientUI:LUButton")

import * as React from "react"
import css from "./button.css"

type LUButtonPropsType = {|
  label: string,
  onClick: ?Function,
|}

const LUButton = React.memo(
  ({ label = "test", onClick }: LUButtonPropsType): React.Node => (
    <div className={css.button} onClick={onClick}>
      {label}
    </div>
  )
)

export { LUButton }
