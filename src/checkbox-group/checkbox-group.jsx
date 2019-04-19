// @flow

const debug = require("debug")("WebclientUI:LUCheckboxGroup")

import * as React from "react"
import cx from "classnames"
import Scrollbars from "react-custom-scrollbars"
import { is, has } from "@leeruniek/functies"

import { LUCheckbox } from "../checkbox/checkbox"
import { LUCheckboxGroupHeader } from "./checkbox-group__header"
import { isOfComponentType } from "../utils/react.utils"

import css from "./checkbox-group.css"

export type LUCheckboxGroupPropsType = {
  children: React.ChildrenArray<
    React.Element<typeof LUCheckbox | typeof LUCheckboxGroupHeader>
  >,
  label?: string,
  className?: string,
  headerClassName?: string,
  scrollHeight?: number | string,
  selectedValues: number[] | string[],
  onChange: Function,
}

export class LUCheckboxGroup extends React.Component<LUCheckboxGroupPropsType> {
  static defaultProps = {
    label: "",
    headerClassName: "",
    className: "",
    scrollHeight: 0,
  }

  render(): React.Node {
    const { className, scrollHeight } = this.props

    return (
      <div
        className={cx(css["checkbox-group"], {
          [className || ""]: is(className),
        })}>
        {scrollHeight ? (
          <Scrollbars
            autoHide={false}
            autoHeight={true}
            autoHeightMax={scrollHeight}>
            <div
              style={{
                overflowX: "hidden",
              }}>
              {this.renderChildren()}
            </div>
          </Scrollbars>
        ) : (
          this.renderChildren()
        )}
      </div>
    )
  }

  renderChildren = (): React.Node => {
    const {
      children,
      onChange,
      label,
      selectedValues,
      headerClassName,
    } = this.props

    const childrenArr = React.Children.map(
      children,
      (child: React.Node, index: number): React.Node => {
        if (isOfComponentType([LUCheckbox])(child)) {
          return React.cloneElement(child, {
            className: cx(
              child.props.className,
              css["checkbox-group__checkbox"]
            ),
            key: `checkbox-group__checkbox_${index}`,
            isChecked:
              child.props.isChecked || has(child.props.name)(selectedValues),
            onChange,
          })
        }

        return child
      }
    )

    if (label) {
      const header = React.createElement(LUCheckboxGroupHeader, {
        label,
        className: headerClassName,
        key: "checkbox-header",
      })

      return [header, ...childrenArr]
    }

    return childrenArr
  }
}
