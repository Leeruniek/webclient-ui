// @flow

const debug = require("debug")("Leeruniek:LUSelect")

import React from "react"
import cx from "classnames"
import Select, { Creatable } from "react-select"
import { type, hasWith, isEmpty, is, mergeTwo } from "@leeruniek/functies"
import { DropdownIndicator } from "./dropdown-indicator"

import css from "./css/select.module.css"

type LUSelectPropsType = {
  className?: string,
  label?: string,
  placeholder?: string,
  value?: Object[] | Object,
  options: Object[],
  color?: "" | "yellow",
  noResultsText?: string,
  optionRenderer?: Function,
  promptTextCreator?: Function,

  hasFocus?: boolean,
  hasMultipleValues?: boolean,
  hasToggleAll?: boolean,
  isLoading?: boolean,
  isCreatable?: boolean,
  isClearable?: boolean,
  isMenuOpenOnFocus?: boolean,
  isDisabled?: boolean,

  onChange: Function,
  onFocus?: Function,
  onBlur?: Function,
  onInputChange?: Function,
}

const defaultThemeStyles = {
  control: (provided, state) => {
    const isFocusedStyle = state.isFocused
      ? {
          borderBottom: "1px solid rgb(38, 166, 154)",
          boxShadow: "none",
        }
      : {}

    return {
      ...provided,
      borderTop: 0,
      borderRight: 0,
      borderLeft: 0,
      borderRadius: 0,
      borderBottom: "1px solid #e0e0e0",
      ...isFocusedStyle,
      "&:hover": {
        boxShadow: "none",
      },
    }
  },
  menuList: () => ({
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    borderRadius: 0,
    boxShadow: "none",
  }),
  menu: () => ({
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: 0,
    boxShadow: "none",
  }),
  indicatorsContainer: () => ({
    paddingRight: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  multiValue: () => ({
    marginRight: "5px",
    marginLeft: 0,
    color: "#676a6c",
    borderRadius: "3px",
  }),
  multiValueLabel: () => ({
    padding: "3px 7px",
  }),
  multiValueRemove: () => ({
    padding: "0px 5px",
  }),
}

const yellowThemeStyles = {
  option: (provided, state) => {
    const isSelectedStyle = state.isSelected
      ? {
          color: "#333",
          backgroundColor: "rgba(245, 166, 35, 0.12)",
        }
      : {}
    const isFocusedStyle = state.isFocused
      ? {
          color: "#333",
          backgroundColor: "rgba(245, 166, 35, 0.12)",
        }
      : {}

    return {
      ...provided,
      ...isFocusedStyle,
      ...isSelectedStyle,
    }
  },
}

class LUSelect extends React.PureComponent<LUSelectPropsType> {
  // Default props values for non-required props
  static defaultProps = {
    className: null,
    label: null,
    placeholder: "",
    value: null,
    color: null,

    noResultsText: "No results found",
    promptTextCreator: null,
    optionRenderer: null,

    hasFocus: false,
    hasMultipleValues: false,
    hasToggleAll: false,
    isLoading: false,
    isClearable: false,
    isCreatable: true,
    isMenuOpenOnFocus: false,
    isDisabled: false,

    onChange: () => {},
    onFocus: null,
    onBlur: null,
    onInputChange: null,
  }

  // Initial component state
  state = {
    hasFocus: this.props.hasFocus,
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
      label,
      color,
      hasFocus,
      isCreatable,
      value,
      options,
      promptTextCreator,
      optionRenderer,
      noResultsText,
      placeholder,
      isLoading,
      isClearable,
      isDisabled,
      isMenuOpenOnFocus,
      hasMultipleValues,
      hasToggleAll,
      onInputChange,
    } = this.props

    const SelectType = isCreatable ? Creatable : Select

    return (
      <div
        className={cx(css.select, {
          [className || ""]: !!className,
          [css["select--disabled"]]: isDisabled,
          [css["select--focused"]]: hasFocus,
          [css["select-has-value"]]: !isEmpty(value),
          [css[color]]: !isEmpty(color),
        })}>
        {is(label) ? (
          <label className={css.label} onClick={this.handleLabelClick}>
            {label}
          </label>
        ) : null}

        <SelectType
          components={{ DropdownIndicator }}
          value={value}
          multi={hasMultipleValues}
          options={
            hasToggleAll && hasMultipleValues
              ? [
                  value.length === options.length
                    ? {
                        value: "NONE",
                        label: `- none -`,
                      }
                    : {
                        value: "ALL",
                        label: `- all -`,
                      },
                  ...options,
                ]
              : options
          }
          className={css["inner-select"]}
          autoFocus={hasFocus}
          openOnFocus={isMenuOpenOnFocus}
          isLoading={isLoading}
          placeholder={placeholder}
          noResultsText={noResultsText}
          optionRenderer={optionRenderer}
          allowCreate={isCreatable}
          clearable={isClearable}
          promptTextCreator={promptTextCreator}
          onBlur={this.handleSelectBlur}
          onFocus={this.handleSelectFocus}
          onInputChange={onInputChange}
          onChange={this.handleOnChange}
          styles={
            isEmpty(color)
              ? defaultThemeStyles
              : mergeTwo(defaultThemeStyles)(yellowThemeStyles)
          }
        />
      </div>
    )
  }

  handleOnChange = currentValues => {
    const { options, onChange } = this.props

    const byType = {
      Array: () => {
        if (hasWith({ value: "NONE" })(currentValues)) {
          return []
        }
        if (hasWith({ value: "ALL" })(currentValues)) {
          return options
        }

        return currentValues
      },
      Other: () => currentValues,
    }

    onChange(type(currentValues) === "Array" ? byType.Array() : byType.Other())
  }

  /**
   * { function_description }
   *
   * @return {undefined}
   */
  handleLabelClick = () => {
    this.setState(
      {
        hasFocus: true,
      },
      () => {
        this._selectInstance && this._selectInstance.focus()
      }
    )
  }

  /**
   * { function_description }
   *
   * @return {undefined}
   */
  handleSelectBlur = () => {
    const { onBlur } = this.props

    this.setState({
      hasFocus: false,
    })

    onBlur && onBlur()
  }

  /**
   * { function_description }
   *
   * @return {undefined}
   */
  handleSelectFocus = () => {
    const { onFocus } = this.props

    this.setState({
      hasFocus: true,
    })

    onFocus && onFocus()
  }

  /**
   * { lambda_description }
   *
   * @param  {Component}  ref  The Select component reference
   *
   * @return {undefined}
   */
  handleSelectRef = ref => {
    this._selectInstance = ref
  }
}

export { LUSelect }
