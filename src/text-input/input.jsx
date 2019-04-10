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
  placeholder?: string,
  label?: string | React.Node,
  icon?: string,
  error?: string[] | string,
  hint?: string | React.Node,
  role?: string,
  color?: string,
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

type LUInputElementRefType<ElementType: React.ElementType> = 
{current: null | React.ElementRef<ElementType>}

type InputElementPropsType = {|
  ...LUInputPropsType,
  ref: LUInputElementRefType<"input" | "textarea">,
  rows?: number,
  disabled?: boolean,
  required?: boolean,
  onKeyUp?: Function,
  focus?: Function,
  blur?: Function,
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
    placeholder,
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
    maxRows,
    role,
    onChange,
    onKeyPress,
    onFocus,
    onBlur,
  } = props
  let inputNode = React.useRef()

  const handleAutoresize = (): void => {
    const element = inputNode

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
    if (isMultiline) {
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
    if (isMultiline && maxLength) {
      const isReplacing =
        event.currentTarget.selectionEnd - event.currentTarget.selectionStart
      const { value: inputValue } = event.currentTarget

      if (!isReplacing && inputValue.length === maxLength) {
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

  const isValuePresent = (value: string): boolean =>
    is(value) && !isEmpty(value)

  const valuePresent = isValuePresent(value) || defaultValue && isValuePresent(defaultValue)

  const inputElementProps:InputElementPropsType = {
    role,
    name,
    defaultValue,
    disabled: isDisabled,
    required: isRequired,
    type,
    value,
    placeholder,
    className: cx(css.inputElement, {
      [css.filled]: valuePresent,
    }),
    ref: (node: HTMLInputElement | HTMLTextAreaElement) => {
      inputNode.current = node
    },
    onKeyUp: handleKeyUp,
    onKeyPress: handleKeyPress,
    onChange: handleChange,
    onFocus,
    onBlur,
  }

  if (!isMultiline) {
    inputElementProps.maxLength = maxLength
    inputElementProps.onKeyPress = onKeyPress
  } else {
    inputElementProps.rows = maxRows
    inputElementProps.onKeyPress = handleKeyPress
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
          {isRequired ? <span className={css.required}> * </span> : null}
        </label>
      ) : null}
      {icon ? (
        <span className={css.icon}>
          <i className={cx("fa", {[icon || ""]: !!icon})} />
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
