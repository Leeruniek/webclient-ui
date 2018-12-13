/* eslint react/jsx-no-bind: 0 */

import tape from "tape"
import React from "react"
import Adapter from "enzyme-adapter-react-16"
import { shallow, configure } from "enzyme"
configure({ adapter: new Adapter() })

import { LUCheckboxGroup } from "./checkbox-group"
import { LUCheckbox } from "../checkbox/checkbox"
import { LUCheckboxGroupPage } from "./checkbox-group.page"
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

tape("Checkboxgroup rendered with header with passed label", t => {
  t.plan(2)
  const eventHandler = () => "OK"
  const wrapper = shallow(
    <LUCheckboxGroup onChange={eventHandler} label="Test" selectedValues={[]}>
      <LUCheckbox label="1" name="1" />
    </LUCheckboxGroup>
  )

  t.notEqual(wrapper.find(LUCheckboxGroupHeader).length, 0)
  const header = wrapper.find(LUCheckboxGroupHeader)

  t.equal(header.prop("label"), "Test")
})

tape(
  "Checkboxes have checked state related to selectedValues LUCheckboxGroup prop",
  t => {
    t.plan(2)
    const eventHandler = () => "OK"
    const testValues = ["1", "2"]
    const wrapper = shallow(
      <LUCheckboxGroup onChange={eventHandler} label="Test" selectedValues={[]}>
        <LUCheckbox label="1" name="1" />
        <LUCheckbox label="2" name="2" />
        <LUCheckbox label="3" name="3" />
      </LUCheckboxGroup>
    )

    t.equal(
      wrapper.find(LUCheckbox).length,
      wrapper.find({ isChecked: false }).length
    )
    wrapper.setProps({ selectedValues: testValues })
    t.equal(wrapper.find({ isChecked: true }).length, testValues.length)
  }
)

tape("Checkboxgroup passsed onChange handler into children", t => {
  t.plan(1)
  const eventHandler = () => "OK"
  const wrapper = shallow(
    <LUCheckboxGroup onChange={eventHandler} selectedValues={[]}>
      <LUCheckbox label="checkboxOne" />
    </LUCheckboxGroup>
  )
  const checkbox = wrapper.find(LUCheckbox)

  t.equal(checkbox.props().onChange(), "OK")
})
