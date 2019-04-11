const debug = require("debug")("Leeruniek:LUErrorBoundary")

import React from "react"
import PropTypes from "prop-types"
import Raven from "raven-js"

import { LUMessage } from "../message/message"
import { is } from "@leeruniek/functies"

export class LUErrorBoundary extends React.Component {
  static propTypes = {
    tag: PropTypes.string,
    message: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  // Defaults for non-required props
  static defaultProps = {
    tag: null,
    message: "Uuuupsilon",
    children: null,
  }

  // Initial component state
  state = {
    error: null,
  }

  /**
   * Error boundaries are React components that catch JavaScript errors
   * anywhere in their child component tree, log those errors, and display a
   * fallback UI instead of the component tree that crashed. Error boundaries
   * catch errors during rendering, in lifecycle methods, and in constructors
   * of the whole tree below them.
   *
   * @param {Object}  error      The error
   * @param {Object}  errorInfo  Error info
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
    })

    Raven.captureException(error, { extra: errorInfo })
  }

  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render = () => {
    const { message, children } = this.props
    const { error } = this.state

    return is(error) ? <LUMessage type="error" content={message} /> : children
  }
}
