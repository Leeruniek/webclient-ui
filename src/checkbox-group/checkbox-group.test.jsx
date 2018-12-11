/* eslint react/jsx-no-bind: 0 */

import tape from "tape"
import React from "react"
import Adapter from "enzyme-adapter-react-16"
import { shallow, configure } from "enzyme"
configure({ adapter: new Adapter() })

import { LUCheckboxGroup } from "./checkbox-group"
import { LUCheckboxGroupPage } from "./checkbox-group.page"
import { LUCheckbox } from "../checkbox.page/checkbox/checkbox"
import { LUCheckboxGroupHeader } from "../checkbox-group/checkbox-group__header"

tape("Checkboxgroup contains 3 checkboxes", t => {
  t.plan(1)
  const wrapper = shallow(<LUCheckboxGroupPage />)
  const checkboxGroup = wrapper.find(LUCheckboxGroup)

  t.equal(checkboxGroup.find(LUCheckbox).length, 3)
})

tape("Checkbox header rendering with text", t => {
  t.plan(1)
  const header = shallow(<LUCheckboxGroupHeader label="Test example" />)

  t.equal(header.text(), "Test example")
})

tape("Checkboxgroup passsed onChange handler into children", t => {
  t.plan(1)
  const eventHandler = () => "OK"
  const wrapper = shallow(
    <LUCheckboxGroup onChange={eventHandler}>
      <LUCheckbox label="checkboxOne" />
    </LUCheckboxGroup>
  )
  const checkbox = wrapper.find(LUCheckbox)

  t.equal(checkbox.props().onChange(), "OK")
})
