// @flow

const debug = require("debug")("WebclientUI:LUCheckboxPage")

import React from "react"
import { LUCheckbox } from "./checkbox/checkbox"

import css from "./checkbox.page.css"

type PropsType = {||}
type StateType = {|
  isDisabled: boolean,
  isChecked: boolean,
|}

class LUCheckboxPage extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false,
      isChecked: false,
    }
    this.handleDisableStateChange = this.handleDisableStateChange.bind(this)
    this.handleCheckedStateChange = this.handleCheckedStateChange.bind(this)
  }

  render(): React.Node {
    return (
      <div>
        <div className={css.demo_controllers}>
          <span>Demo controls</span>
          <LUCheckbox
            label="Set Disable"
            onChange={this.handleDisableStateChange}
            isChecked={this.state.isDisabled}
            customStyle="yellow"
          />
          <LUCheckbox
            label="Set Checked"
            onChange={this.handleCheckedStateChange}
            isChecked={this.state.isChecked}
          />
        </div>
        <LUCheckbox
          label="Test example"
          isChecked={this.state.isChecked}
          isDisabled={this.state.isDisabled}
        />
      </div>
    )
  }

  handleDisableStateChange() {
    this.setState({ isDisabled: !this.state.isDisabled })
  }

  handleCheckedStateChange() {
    this.setState({ isChecked: !this.state.isChecked })
  }
}

export { LUCheckboxPage }
