const debug = require("debug")("WebclientUI:LUButtonPage")

import React from "react"

import { LUButton } from "./button"

class LUButtonPage extends React.Component {
  static defaultProps = {
    text: "asd",
  }

  render = () => {
    const { text } = this.props

    return <LUButton text={text} />
  }
}

export { LUButtonPage }
