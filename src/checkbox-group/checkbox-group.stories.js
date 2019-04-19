import React from "react"
import { storiesOf } from "@storybook/react"
import { LUCheckbox } from "../checkbox/checkbox"
import { LUCheckboxGroup } from "./checkbox-group"
import { toggle } from "@leeruniek/functies"

import css from "./checkbox-group.css"

const LUCheckboxGroupContainer = props => {
  const [groupItems, setGroupItems] = React.useState([])

  const handleCheckboxGroupChange = event => {
    const item = event.currentTarget.name

    setGroupItems(toggle(item)(groupItems))
  }

  return (
    <div>
      <LUCheckboxGroup
        onChange={handleCheckboxGroupChange}
        selectedValues={groupItems}
        {...props}>
        <LUCheckbox label="1" name="1" />
        <LUCheckbox label="2" name="2" />
        <LUCheckbox label="3" name="3" />
      </LUCheckboxGroup>
    </div>
  )
}

storiesOf("LUCheckboxGroup", module)
  .add("LUCheckboxGroup", () => <LUCheckboxGroupContainer />)
  .add("LUCheckboxGroup with header", () => (
    <LUCheckboxGroupContainer label="LUCheckbox group header" />
  ))
  .add("LUCheckboxGroup with styled header", () => (
    <LUCheckboxGroupContainer
      label="LUCheckbox group header"
      headerClassName={css["checkbox-group__header__test"]}
    />
  ))
