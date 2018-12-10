// @flow

const debug = require("debug")("WebclientUI:LUCheckboxPage")

import * as React from "react"
import { LUCheckbox } from "./checkbox/checkbox"
import { LUCheckboxGroup } from "../checkbox-group/checkbox-group"
import { LUCheckboxHeader } from "../checkbox-group/checkbox-group__header"

import css from "./checkbox.page.css"

type PropsType = {||}
type StateType = {|
  isDisabled: boolean,
  isChecked: boolean,
  groupItems: Map<string, any>
|}

class LUCheckboxPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      isDisabled: false,
      isChecked: false,
      groupItems: new Map(),
    }
  }

  render(): React.Node {
    return (
      <div>
        <div className={css.demo_controllers}>
          <LUCheckboxGroup onChange={this.handleCheckboxGroupChange}>
            <LUCheckboxHeader label="LUCheckboxGroup" />
            <LUCheckbox
              label="1"
              value="1"
              isChecked={this.state.groupItems.get("1")}
              customStyle="yellow"
            />
            <LUCheckbox
              label="2"
              value="2"
              isChecked={this.state.groupItems.get("2")}
            />
            <LUCheckbox
              label="3"
              value="3"
              isChecked={this.state.groupItems.get("3")}
            />
          </LUCheckboxGroup>
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

  handleCheckboxGroupChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const item = event.currentTarget.value;
    const isChecked = event.currentTarget.checked;
    this.setState(prevState => ({ groupItems: prevState.groupItems.set(item, isChecked) }));
  }
}

export { LUCheckboxPage }