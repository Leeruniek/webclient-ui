/* eslint flowtype/no-weak-types: 0 */
// @flow

const debug = require("debug")("WebclientUI:LUCheckboxPage")

import * as React from "react"
import { LUCheckbox } from "../checkbox/checkbox"
import { LUCheckboxGroup } from "./checkbox-group"
import { toggle } from "@leeruniek/functies"
import css from "./checkbox-group.css"
import { LUInput } from "../text-input/input"

type PropsType = {||}
type StateType = {|
  groupItems: string[],
|}

class LUCheckboxGroupPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      groupItems: [],
      multiline: false,
    }
  }

  render(): React.Node {
    const { groupItems, multiline } = this.state

    return (
      <div>
        <LUCheckboxGroup
          onChange={this.handleCheckboxGroupChange}
          selectedValues={groupItems}
          label="Checkbox Group Header"
          headerClassName={css["checkbox-group__header__test"]}>
          <LUCheckbox label="1" name="1" customStyle="yellow" />
          <LUCheckbox label="2" name="2" />
          <LUCheckbox label="3" name="3" />
        </LUCheckboxGroup>
        <LUInput
          isMultiline={true}
          label={"asdasd"}
          hasAutoFocus={true}
          maxLength={500}
          type={"text"}
          rows={10}
        />
        <LUInput
          hasAutoFocus={false}
          type={"text"}
          hasBar={true}
        />
        <LUInput
          label={"password"}
          hasAutoFocus={false}
          type={"password"}
        />
      </div>
    )
  }

  handleCheckboxGroupChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const item = event.currentTarget.name

    this.setState(
      (prevState): { groupItems: string[] } => ({
        groupItems: toggle(item)(prevState.groupItems),
        multiline: !prevState.multiline,
      })
    )
  }
}

export { LUCheckboxGroupPage }
