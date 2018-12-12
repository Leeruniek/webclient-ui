// @flow

const debug = require("debug")("WebclientUI:LUCheckboxGroup")

import * as React from "react"
import cx from "classnames"
import Scrollbars from "react-custom-scrollbars"
import { is } from "@leeruniek/functies"

import { LUCheckbox } from "../checkbox/checkbox"
import { LUCheckboxGroupHeader } from "./checkbox-group__header"
import { isOfComponentType } from "../utils/react.utils"

import css from "./checkbox-group.css"

export type PropsType = {
  children: React.ChildrenArray<
    React.Element<typeof LUCheckbox | typeof LUCheckboxGroupHeader>
  >,
  className?: string,
  scrollHeight?: number | string,
  onChange: Function,
}

export class LUCheckboxGroup extends React.Component<PropsType> {
  static defaultProps = {
    value: [],
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
    const { children, onChange } = this.props

    return React.Children.map(
      children,
      (child: React.Node): React.Node => {
        if (isOfComponentType([LUCheckbox])(child)) {
          return React.cloneElement(child, {
            className: cx(
              child.props.className,
              css["checkbox-group__checkbox"]
            ),
            isChecked: child.props.isChecked,
            onChange,
          })
        }

        return child
      }
    )
  }
}
