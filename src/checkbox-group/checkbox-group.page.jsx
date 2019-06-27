/* eslint flowtype/no-weak-types: 0 */
// @flow

import * as React from "react"
import { LUCheckbox } from "../checkbox/checkbox"
import { LUCheckboxGroup } from "./checkbox-group"
import { toggle } from "@leeruniek/functies"
import css from "./checkbox-group.css"
import { LUButton } from "../button/button"

type PropsType = {||}
type StateType = {|
  groupItems: string[],
|}

class LUCheckboxGroupPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = {
      groupItems: [],
    }
  }

  render(): React.Node {
    const { groupItems } = this.state

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
      </div>
    )
  }

  handleCheckboxGroupChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const item = event.currentTarget.name

    this.setState(
      (prevState): { groupItems: string[] } => ({
        groupItems: toggle(item)(prevState.groupItems),
      })
    )
  }
}

export { LUCheckboxGroupPage }
