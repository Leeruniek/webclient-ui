// @flow

const debug = require("debug")("Leeruniek:LUCheckboxGroup")

import * as React from "react"
import cx from "classnames"
import Scrollbars from "react-custom-scrollbars"
import { is } from "@leeruniek/functies"

import type { LUCheckboxGroupType } from "./checkbox-group.types"
import { LUCheckbox } from "../checkbox.page/checkbox/checkbox"
import { isOfComponentType } from "../utils/react.utils"

import css from "./checkbox-group.css"

export class LUCheckboxGroup extends React.Component<LUCheckboxGroupType> {
  static defaultProps = {
    children: [],
    value: [],
    className: "",
    scrollHeight: 0,
  }

  constructor(props: LUCheckboxGroupType) {
    super(props)
  }

  render(): React.Node {
    const { className, scrollHeight } = this.props

    return (
      <div
        className={cx(css["chekbox-group"], {
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

    return React.Children.map(children, child => {
      if (isOfComponentType([LUCheckbox])(child)) {
        return React.cloneElement(child, {
          className: `${child.props.className} ${
            css["checkbox-group__checkbox"]
          }`,
          isChecked: child.props.isChecked,
          onChange: onChange,
        })
      }

      return child
    })
  }
}
