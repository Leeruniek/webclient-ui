// @flow

import * as React from "react"
import cx from "classnames"
import { isEmpty, is } from "@leeruniek/functies"

import css from "./input.css"

type LUInputPropsType = {|
  className?: string,
  inputClassName?: string,
  name?: string, 
  type?: "text" | "password" | "hidden",
  value: string,
  defaultValue?: string,
  label?: string | React.Node,
  icon: sting | React.Node,
  error?: string[] | string,
  hint?: string | React.Node,
  color?: sting,
  maxLength?: number,
  maxRows?: number,
  isMultiline?: boolean,
  isDisabled?: boolean,
  isRequired?: boolean,
  hasAutoFocus?: boolean,
  hasBar?: boolean,
  onChange?: Function,
  onKeyPress?: Function,
  onFocus?: Function,
  onBlur?: Function,
|}

type LUInputStateType = {|
  hasFocus: boolean,
  hasCapsWarning: boolean,
|}

const initialState = {
  hasFocus: false,
  hasCapsWarning: false,
}

const LUInput = (props: LUInputPropsType): React.Node => {
  // Set initial state & ref
  const [state, setState] = React.useState(initialState)
  const {
    name,
    label,
    type,
    value,
    defaultValue,
    className,
    icon,
    inputClassName,
    isMultiline,
    isDisabled,
    isRequired,
    hasBar,
    error,
    hint,
    maxLength,
  } = props
  let inputNode = React.useRef(null)

  const handleAutoresize = (): void => {
    const element = inputNode
    const { maxRows } = props

    console.log("handleAutoresize")

    if (typeof maxRows === "number" && !Number.isNaN(maxRows)) {
      element.style.height = null
    } else {
      // compute the height difference between inner height and outer height
      const style = getComputedStyle(element, null)
      const heightOffset =
        style.boxSizing === "content-box"
          ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom))
          : parseFloat(style.borderTopWidth) +
            parseFloat(style.borderBottomWidth)

      // resize the input to its content size
      element.style.height = "auto"
      element.style.height = `${element.scrollHeight + heightOffset}px`
    }
  }

  // Lifecycle methods
  React.useEffect(() => {
    if (props.isMultiline) {
      window.addEventListener("resize", handleAutoresize)
      handleAutoresize()
    }
    props.hasAutoFocus && inputNode.focus()
  }, [])

  // instead of componentDidUpdate() method
  React.useEffect(() => {
    if (isMultiline) {
      window.addEventListener("resize", handleAutoresize)
    } else {
      window.removeEventListener("resize", handleAutoresize)
    }
  }, [isMultiline])

  const handleChange = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { onChange } = props
    const valueFromEvent = event.currentTarget.value

    // Trim value to maxLength if that exists (only on multiline inputs).
    // Note that this is still required even tho we have the onKeyPress filter
    // because the user could paste smt in the textarea.
    const haveToTrim =
      isMultiline && maxLength && event.currentTarget.value.length > maxLength
    const inputValue = haveToTrim
      ? valueFromEvent.substr(0, maxLength)
      : valueFromEvent

    // propagate to to store and therefore to the input
    if (onChange) onChange(inputValue, event)
  }

  const blur = (): void => {
    inputNode.blur()
  }

  const focus = (): void => {
    inputNode.focus()
  }

  const handleKeyPress = (event: SyntheticEvent<HTMLInputElement>): void => {
    const { onKeyPress } = props

    if (isMultiline && maxLength) {
      const isReplacing =
        event.currentTarget.selectionEnd - event.currentTarget.selectionStart
      const { value } = event.currentTarget

      if (!isReplacing && value.length === maxLength) {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    if (onKeyPress) onKeyPress(event)
  }

  const handleKeyUp = (
    event: SyntheticKeyboardEvent<HTMLInputElement>
  ): void => {
    type === "password" &&
      setState({
        hasCapsWarning: event.getModifierState("CapsLock"),
      })
  }

  const isValuePresent = (value: text): bool => (is(value) && !isEmpty(value))

  const valuePresent = isValuePresent(value) || isValuePresent(defaultValue);

  const inputElementProps = {
    role,
    name,
    defaultValue,
    disabled: isDisabled,
    required: isRequired,
    type,
    value,
    className: cx(css.inputElement, {
      [css.filled]: valuePresent,
    }),
    ref: node => {
      inputNode = node
    },
    onKeyUp: handleKeyUp,
    onKeyPress: handleKeyPress,
    onChange: handleChange,
  }

  const inputClass = cx(
    css.input,
    {
      [css["input--multiline"]]: isMultiline,
      [css.withBar]: hasBar,
      [css.disabled]: isDisabled,
      [css.errored]: error,
      [css.hidden]: type === "hidden",
      [css.withIcon]: icon,
      [inputClassName || ""]: is(inputClassName),
    },
    className
  )
  const length = maxLength && value ? value.length : 0

  return (
    <div
      className={cx(css.input__wrapper, {
        [className || ""]: is(className),
        [css.withIcon]: is(icon),
      })}>
      {label ? (
        <label
          className={cx(css.label, {
            [css["label--focus"]]: state.hasFocus,
          })}>
          {label}
        </label>
      ) : null}
      {icon ? (
        <span className={css.icon}>
          <i className={cx("fa", icon)} />
        </span>
      ) : null}
      <div className={inputClass}>
        {React.createElement(
          isMultiline ? "textarea" : "input",
          inputElementProps
        )}
        <span className={css.bar} />
        {hint ? (
          <span hidden={label} className={css.hint}>
            {hint}
          </span>
        ) : null}
        {error ? <span className={css.error}>{error}</span> : null}
        {maxLength ? (
          <span className={css.counter}>{`${length}/${maxLength}`}</span>
        ) : null}
      </div>
      {state.hasCapsWarning ? (
        <span className={css["input__caps-warning"]}>
          <i className="fa fa-exclamation-triangle" />
          {" CAPS LOCK IS ON"}
        </span>
      ) : null}
    </div>
  )
}

export { LUInput }
