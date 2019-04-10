const debug = require("debug")("Leeruniek:LUButton")

import React from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import { Button } from "react-toolbox/lib/button/Button"

import { isEmpty } from "@leeruniek/functies"
import { LUProgressBar } from "../progress-bar/progress-bar"

import defaultTheme from "./css/button.module.css"
import smallTheme from "./css/button-small.module.css"

export class LUButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(["default", "small"]),
    color: PropTypes.oneOf(["yellow", "red", "purple"]),
    align: PropTypes.oneOf(["left", "right"]),
    href: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,

    isFlat: PropTypes.bool,
    isFloating: PropTypes.bool,
    isInverse: PropTypes.bool,
    isMini: PropTypes.bool,
    isNeutral: PropTypes.bool,
    isPrimary: PropTypes.bool,
    isRaised: PropTypes.bool,
    isDisabled: PropTypes.bool,
    isMuted: PropTypes.bool,
    hasAccent: PropTypes.bool,
    hasRipple: PropTypes.bool,

    timeoutDuration: PropTypes.number,
    intervalDuration: PropTypes.number,
    onTimeout: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onClick: PropTypes.func,
  }

  // Default props values for non-required props
  static defaultProps = {
    className: "",
    type: "default",
    color: null,
    align: null,
    href: null,
    label: null,
    icon: null,

    isFlat: false,
    isFloating: false,
    isInverse: false,
    isMini: false,
    isPrimary: false,
    isRaised: false,
    isNeutral: true,
    isDisabled: false,
    isMuted: false,
    hasAccent: false,
    hasRipple: true,

    timeoutDuration: 3000,
    intervalDuration: 100,
    onTimeout: null,
    onMouseLeave: null,
    onMouseUp: null,
    onClick: null,
  }

  static themeByType = {
    default: defaultTheme,
    small: smallTheme,
  }

  state = {
    progress: 0,
  }

  /**
   * Is called before the component is mounted. When implementing the
   * constructor for a React.Component subclass, you should call super(props)
   * before any other statement. Otherwise, this.props will be undefined in
   * the constructor, which can lead to bugs.
   *
   * @param {Object}  props  The properties
   */
  constructor(props) {
    super(props)

    if (props.onTimeout) {
      this.startTimers()
    }
  }

  /**
   * Invoked before a mounted component receives new props. If you need to
   * update the state in response to prop changes (for example, to reset it),
   * you may compare this.props and nextProps and perform state transitions
   * using this.setState() in this method.
   *
   * @param {Object}  nextProps  The next properties
   */
  componentWillReceiveProps(nextProps) {
    const { onTimeout } = this.props

    if (isEmpty(nextProps.onTimeout)) {
      this.clearTimers()
    }

    if (onTimeout !== nextProps.onTimeout && !isEmpty(nextProps.onTimeout)) {
      this.setState(
        {
          progress: 0,
        },
        () => {
          this.startTimers()
        }
      )
    }
  }

  /**
   * Invoked immediately before a component is unmounted and destroyed.
   * Perform any necessary cleanup in this method, such as invalidating
   * timers, canceling network requests, or cleaning up any subscriptions that
   * were created in componentDidMount().
   */
  componentWillUnmount() {
    this.clearTimers()
  }

  /**
   * When called, it should examine this.props and this.state and return a
   * single React element. This element can be either a representation of a
   * native DOM component, such as <div />, or another composite component
   * that you've defined yourself.
   *
   * @return {Component}
   */
  render() {
    const {
      className,
      type,
      color,
      align,
      label,
      icon,
      isFlat,
      isFloating,
      isInverse,
      isMini,
      isPrimary,
      isRaised,
      isNeutral,
      isDisabled,
      isMuted,
      hasAccent,
      hasRipple,
      timeoutDuration,
      onTimeout,
      onMouseLeave,
      onMouseUp,
      onClick,
    } = this.props
    const { progress } = this.state

    const theme = LUButton.themeByType[type]

    return (
      <span
        className={cx(className, theme["lu-button"], {
          [theme["no-label"]]: isEmpty(label),
          [theme["is-muted"]]: isMuted,
          [theme["pull-left"]]: align === "left",
          [theme["pull-right"]]: align === "right",
        })}>
        <Button
          className={isEmpty(color) ? "" : theme[color]}
          theme={theme}
          label={label}
          icon={isEmpty(icon) ? null : <i className={cx("fa", icon)} />}
          flat={isFlat}
          floating={isFloating}
          inverse={isInverse}
          mini={isMini}
          primary={isPrimary}
          raised={isRaised}
          neutral={isNeutral}
          disabled={isDisabled}
          accent={hasAccent}
          ripple={hasRipple}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onClick={onClick}
        />

        <LUProgressBar
          isVisible={!isEmpty(onTimeout)}
          mode="determinate"
          max={timeoutDuration}
          value={progress}
        />
      </span>
    )
  }

  /**
   * Extend upstream timeout function with local clean
   *
   * @return {undefined}
   */
  handleTimeout = () => {
    // Stop progress increment
    clearInterval(this.intervalID)

    this.props.onTimeout()
  }

  /**
   * Update state progress
   *
   * @return {undefined}
   */
  handleInterval = () => {
    const { intervalDuration } = this.props

    this.setState(prevState => ({
      progress: prevState.progress + intervalDuration,
    }))
  }

  /**
   * Starts both timeout and progress timers
   *
   * @return {undefined}
   */
  startTimers = () => {
    const { timeoutDuration, intervalDuration } = this.props

    // Make sure everithing is clean before starting new timers
    this.clearTimers()

    this.timeoutID = setTimeout(this.handleTimeout, timeoutDuration)
    this.intervalID = setInterval(this.handleInterval, intervalDuration)
  }

  /**
   * Remove timers and reset state to begining
   *
   * @return {undefined}
   */
  clearTimers = () => {
    clearInterval(this.intervalID)
    clearTimeout(this.timeoutID)
  }
}
