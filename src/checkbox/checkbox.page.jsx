// @flow

const debug = require("debug")("WebclientUI:LUCheckboxPage")

import * as React from "react"
import { LUCheckbox } from "./checkbox"

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
    const { isDisabled, isChecked } = this.state

    return (
      <div>
        <div className={css.demo_controllers}>
          <LUCheckbox
            label="Set Disabled"
            isChecked={isDisabled}
            onChange={this.handleDisableStateChange}
            customStyle="yellow"
          />
          <LUCheckbox
            label="Set Checked"
            onChange={this.handleCheckedStateChange}
            isChecked={isChecked}
          />
        </div>
        <LUCheckbox
          label="Test example"
          isChecked={isChecked}
          isDisabled={isDisabled}
        />
      </div>
    )
  }

  handleDisableStateChange = () => {
    this.setState(
      (prevState): { isDisabled: boolean } => ({
        isDisabled: !prevState.isDisabled,
      })
    )
  }

  handleCheckedStateChange = () => {
    this.setState(
      (prevState): { isChecked: boolean } => ({
        isChecked: !prevState.isChecked,
      })
    )
  }
}

export { LUCheckboxPage }
