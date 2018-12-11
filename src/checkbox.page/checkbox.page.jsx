// @flow

const debug = require("debug")("WebclientUI:LUCheckboxPage")

import * as React from "react"
import { LUCheckbox } from "./checkbox/checkbox"

import css from "./checkbox.page.css"

type PropsType = {||}
type StateType = {|
  isDisabled: boolean,
  isChecked: boolean,
|}

class LUCheckboxPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      isDisabled: false,
      isChecked: false,
    }
  }

  render(): React.Node {
    return (
      <div>
        <div className={css.demo_controllers}>
          <LUCheckbox
            label="Set Disabled"
            isChecked={this.state.isDisabled}
            onChange={this.handleDisableStateChange}
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

  handleDisableStateChange = () => {
    this.setState({ isDisabled: !this.state.isDisabled })
  }

  handleCheckedStateChange = () => {
    this.setState({ isChecked: !this.state.isChecked })
  }
}

export { LUCheckboxPage }