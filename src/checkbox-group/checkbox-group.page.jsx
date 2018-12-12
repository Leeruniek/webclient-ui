/* eslint flowtype/no-weak-types: 0 */
// @flow

const debug = require("debug")("WebclientUI:LUCheckboxPage")

import * as React from "react"
import { LUCheckbox } from "../checkbox/checkbox"
import { LUCheckboxGroup } from "./checkbox-group"
import { LUCheckboxGroupHeader } from "./checkbox-group__header"

type PropsType = {||}
type StateType = {|
  groupItems: Map<string, any>,
|}

class LUCheckboxGroupPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      groupItems: new Map(),
    }
  }

  render(): React.Node {
    const { groupItems } = this.state

    return (
      <div>
        <LUCheckboxGroup onChange={this.handleCheckboxGroupChange}>
          <LUCheckboxGroupHeader label="LUCheckboxGroup" />
          <LUCheckbox
            label="1"
            name="1"
            isChecked={groupItems.get("1")}
            customStyle="yellow"
          />
          <LUCheckbox label="2" name="2" isChecked={groupItems.get("2")} />
          <LUCheckbox label="3" name="3" isChecked={groupItems.get("3")} />
        </LUCheckboxGroup>
      </div>
    )
  }

  handleCheckboxGroupChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const item = event.currentTarget.name
    const isChecked = event.currentTarget.checked

    this.setState(
      (prevState): { groupItems: Map<string, any> } => ({
        groupItems: prevState.groupItems.set(item, isChecked),
      })
    )
  }
}

export { LUCheckboxGroupPage }
