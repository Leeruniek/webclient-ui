// @flow

const debug = require("debug")("Leeruniek:LUSelect")

import React from "react"
import cx from "classnames"
import Select, { Creatable } from "react-select"
import { type, hasWith, isEmpty, is } from "@leeruniek/functies"
import { DropdownIndicator } from "./dropdown-indicator"

import css from "./css/select.module.css"

type LUSelectPropsType = {
  className?: string,
  classNamePrefix?: string,
  label?: string,
  placeholder?: string,
  value?: Object[] | Object,
  options: Object[],
  color?: "" | "yellow",
  noResultsText?: string,
  optionRenderer?: Function,
  promptTextCreator?: Function,
  providedStyles?: Object,
  components?: React.Element[],

  hasFocus?: boolean,
  isMulti?: boolean,
  hasToggleAll?: boolean,
  isLoading?: boolean,
  isCreatable?: boolean,
  isClearable?: boolean,
  isMenuOpenOnFocus?: boolean,
  isDisabled?: boolean,
  closeMenuOnSelect?: boolean,

  minMenuHeight?: number,
  maxMenuHeight?: number,

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
  menuList: provided => ({
    ...provided,
    borderTop: 0,
    borderRight: 0,
    borderLeft: 0,
    borderRadius: 0,
    boxShadow: "none",
  }),
  menu: provided => ({
    ...provided,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: 0,
    boxShadow: "none",
  }),
  multiValue: provided => ({
    ...provided,
    border: "1px solid rgba(0,126,255,0.24)",
    backgroundColor: "rgba(0,126,255,0.08)",
    padding: "2px",
    borderRadius: "3px",
    color: "#676a6c",
    fontSize: "1.1em",
  }),
  multiValueLabel: provided => ({
    ...provided,
    padding: "3px 6px",
  }),
  multiValueRemove: provided => ({
    ...provided,
    borderLeft: `1px solid rgba(0,126,255,0.24)`,
    padding: "0px 5px",
    "&:hover": {
      backgroundColor: `rgba(0,113,230,0.08)`,
      color: "#676a6c",
    },
  }),
  clearIndicator: () => ({
    display: "none",
  }),
  indicatorsContainer: () => ({
    paddingRight: 0,
  }),
  indicatorSeparator: () => ({
    display: "none",
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
    isMulti: false,
    hasToggleAll: false,
    isLoading: false,
    isClearable: false,
    isCreatable: false,
    closeMenuOnSelect: true,
    isMenuOpenOnFocus: false,
    isDisabled: false,

    minMenuHeight: 50,
    maxMenuHeight: 300,

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
      classNamePrefix,
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
      closeMenuOnSelect,
      isMulti,
      hasToggleAll,
      onInputChange,
      providedStyles,
      components,
      minMenuHeight,
      maxMenuHeight,
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
          components={{ DropdownIndicator, ...components }}
          value={value}
          isMulti={isMulti}
          options={
            hasToggleAll && isMulti
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
          classNamePrefix={classNamePrefix}
          autoFocus={hasFocus}
          openOnFocus={isMenuOpenOnFocus}
          isLoading={isLoading}
          closeMenuOnSelect={closeMenuOnSelect}
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
          minMenuHeight={minMenuHeight}
          maxMenuHeight={maxMenuHeight}
          styles={
            isEmpty(color)
              ? { ...defaultThemeStyles, ...providedStyles }
              : {
                  ...defaultThemeStyles,
                  ...yellowThemeStyles,
                  ...providedStyles,
                }
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
