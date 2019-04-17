const debug = require("debug")("Leeruniek:LUSelect")

import React from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import Select, { Creatable } from "react-select"
import { type, hasWith, isEmpty } from "@leeruniek/functies"

import css from "./css/select.module.css"
import { is } from "@leeruniek/functies/dist/is/is"

class LUSelect extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    color: PropTypes.oneOf(["yellow"]),
    noResultsText: PropTypes.string,
    optionRenderer: PropTypes.func,
    promptTextCreator: PropTypes.func,

    hasFocus: PropTypes.bool,
    hasMultipleValues: PropTypes.bool,
    hasToggleAll: PropTypes.bool,
    isLoading: PropTypes.bool,
    isCreatable: PropTypes.bool,
    isClearable: PropTypes.bool,
    isMenuOpenOnFocus: PropTypes.bool,
    isDisabled: PropTypes.bool,

    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onInputChange: PropTypes.func,
  }

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

    onChange: null,
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
          [className]: !!className,
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
        />
      </div>
    )
  }

  handleOnChange = currentValues => {
    const { options, onChange } = this.props

    const byType = {
      Array: () => {
        if(hasWith({ value: "NONE" })(currentValues)) {
          return []
        } if(hasWith({ value: "ALL" })(currentValues)) {
          return options
        } else {
          return currentValues
        }
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
