// @flow

const debug = require("debug")("WebclientUI:LUButtonPage")

import * as React from "react"

import { LUButton } from "./button"

type PropsType = {
  text: string,
}

class LUButtonPage extends React.Component<PropsType> {
  render = (): React.Node => {

    return <LUButton label="Test button" isPrimary={true} onClick={null} />
  }
}

export { LUButtonPage }
