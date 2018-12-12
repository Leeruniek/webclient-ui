// @flow

const debug = require("debug")("WebclientUI:LUButtonPage")

import * as React from "react"

import { LUButton } from "./button"

type PropsType = {
  text: string,
}

class LUButtonPage extends React.Component<PropsType> {
  render = (): React.Node => {
    const { text } = this.props

    return <LUButton label={text} onClick={null} />
  }
}

export { LUButtonPage }
