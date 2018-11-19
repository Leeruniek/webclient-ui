// @flow

const debug = require("debug")("WebclientUI:LUButton")

import * as React from "react"

type LUButtonPropsType = {|
  label: string,
  onClick: Function,
|}

const LUButton = React.memo(
  ({ label = "asd", onClick }: LUButtonPropsType): React.Node => (
    <div onClick={onClick}>{label}</div>
  )
)

export { LUButton }
