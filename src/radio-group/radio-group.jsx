// @flow

const debug = require("debug")("Leeruniek:LURadioGroup")

import * as React from "react"
import { isFragment } from "react-is"
import cx from "classnames"
import Scrollbars from "react-custom-scrollbars"
import { is, deepEqual } from "@leeruniek/functies"

import { LURadio } from "../radio/radio"
import { LURadioSeparator } from "./radio-group__separator"

import css from "./radio-group.module.css"

type LURadioGroupPropsType = {|
  className?: string,
  type?: string,
  value?: string | number,
  children: LURadio | React.Element<typeof LURadioSeparator>,
  scrollHeight: string | number,
  onChange: Function,
|}

export class LURadioGroup extends React.Component<LURadioGroupPropsType> {
  render = (): React.Node => {
    const { className, scrollHeight } = this.props

    return (
      <div
        className={cx(css["radio-group"], {
          [className || ""]: is(className),
        })}>
        {is(scrollHeight) ? (
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
    const { children, value, type, onChange } = this.props

    const wrapLURadio = radio =>
      React.cloneElement(radio, {
        className: `${radio.props.className} ${css["radio-group__radio"]}`,
        isChecked: value === radio.props.value && type === radio.props.type,
        onChange,
      })

    return React.Children.map(children, child => {
      if (isFragment(child)) {
        return (
          <React.Fragment>
            {child.props.children.map(nestedChild => {
              if (deepEqual(nestedChild.type.name)(LURadio.name)) {
                return nestedChild.map(wrapLURadio)
              }

              return nestedChild
            })}
          </React.Fragment>
        )
      }
      if (deepEqual(child.type.name)(LURadio.name)) {
        return wrapLURadio(child)
      }

      return child
    })
  }
}
