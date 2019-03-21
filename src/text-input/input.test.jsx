import tape from "tape"
import React from "react"
import Adapter from "enzyme-adapter-react-16"
import { shallow, configure } from "enzyme"
configure({ adapter: new Adapter() })

import { LUInput } from "./input"

tape("LUInput pass properties to simple input element", t => {
  t.plan(10)

  const wrapper = shallow(
    <div>
      <LUInput
        type="text"
        name="Test name"
        defaultValue="Test defaultValue"
        isMultiline={false}
        isDisabled={false}
        isRequired={true}
        value="Test value"
        placeholder="Test placeholder"
        maxLength={10}
      />
    </div>
  )
  const component = wrapper.find(LUInput)
  const inputElement = component.dive().find("input")

  t.equal(inputElement.length, 1)
  t.ok(!inputElement.props().hasOwnProperty("isMultiline"))
  t.equal(inputElement.prop("type"), component.prop("type"))
  t.equal(inputElement.prop("name"), component.prop("name"))
  t.equal(inputElement.prop("defaultValue"), component.prop("defaultValue"))
  t.equal(inputElement.prop("disabled"), component.prop("isDisabled"))
  t.equal(inputElement.prop("required"), component.prop("isRequired"))
  t.equal(inputElement.prop("value"), component.prop("value"))
  t.equal(inputElement.prop("placeholder"), component.prop("placeholder"))
  t.equal(inputElement.prop("maxLength"), component.prop("maxLength"))
})

tape("LUInput render text area when 'isMultiline' prop is true", t => {
  t.plan(2)

  const wrapper = shallow(
    <div>
      <LUInput
        type="text"
        name="Test name"
        defaultValue="Test defaultValue"
        isMultiline={true}
        isDisabled={false}
        isRequired={true}
        value="Test value"
        placeholder="Test placeholder"
      />
    </div>
  )
  const component = wrapper.find(LUInput)

  t.equal(component.dive().find("input").length, 0)
  t.equal(component.dive().find("textarea").length, 1)
})

tape("LUInput render label with required flag", t => {
  t.plan(2)

  const labelText = "Test label text"
  const wrapper = shallow(
    <div>
      <LUInput
        type="text"
        name="not required field"
        label={labelText}
        defaultValue="Test defaultValue"
        isMultiline={false}
        isDisabled={false}
        isRequired={false}
        value="Test value"
        placeholder="Test placeholder"
        hasBar={true}
      />
      <LUInput
        type="text"
        name="required field"
        label={labelText}
        defaultValue="Test defaultValue"
        isMultiline={false}
        isDisabled={false}
        isRequired={true}
        value="Test value"
        placeholder="Test placeholder"
        hasBar={true}
      />
    </div>
  )
  const requiredInput = wrapper.findWhere(el => el.prop("isRequired") === true)
  const notRequiredInput = wrapper.findWhere(
    el => el.prop("isRequired") === false
  )

  t.equal(
    requiredInput
      .dive()
      .find("label")
      .text()
      .trim(),
    `${labelText} *`
  )
  t.equal(
    notRequiredInput
      .dive()
      .find("label")
      .text()
      .trim(),
    labelText
  )
})
