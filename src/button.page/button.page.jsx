const debug = require("debug")("WebclientUI:LULUButtonPage")

import React from "react"
import PropTypes from "prop-types"

import { LUButton } from "button.page/button.component"

class LUButtonPage extends React.Component {
  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: "asd",
  }

  render = () => {
    const { text } = this.props

    return <LUButton text={text} />
  }
}

export { LUButtonPage }
