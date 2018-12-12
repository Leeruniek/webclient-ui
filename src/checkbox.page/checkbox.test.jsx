import tape from "tape"
import React from "react"
import Adapter from "enzyme-adapter-react-16"
import { shallow, configure } from "enzyme"
import TestRenderer from "react-test-renderer"
configure({ adapter: new Adapter() })

import { LUCheckbox } from "./checkbox/checkbox"
import { LUCheckboxPage } from "./checkbox.page"

tape("Checbox with label 'Enable'", t => {
  t.plan(2)
  const component = TestRenderer.create(<LUCheckbox label="Enable" />).toJSON()
  const label = component.children.find(el => el.type === "span")

  t.equal(label.type, "span")
  t.deepEqual(label.children, ["Enable"])
})

tape("LUCheckbox isDisabled props passed from container state", t => {
  t.plan(2)
  const wrapper = shallow(<LUCheckboxPage />)

  wrapper.setState({ isDisabled: true })
  let checkboxComponent = wrapper.find({ label: "Test example" })

  t.equal(checkboxComponent.props().isDisabled, true)

  wrapper.setState({ isDisabled: false })
  checkboxComponent = wrapper.find({ label: "Test example" })
  t.equal(checkboxComponent.props().isDisabled, false)
})

tape("LUCheckbox isChecked props passed from container state", t => {
  t.plan(2)
  const wrapper = shallow(<LUCheckboxPage />)

  wrapper.setState({ isChecked: true })
  let checkboxComponent = wrapper.find({ label: "Test example" })

  t.equal(checkboxComponent.props().isChecked, true)

  wrapper.setState({ isChecked: false })
  checkboxComponent = wrapper.find({ label: "Test example" })
  t.equal(checkboxComponent.props().isChecked, false)
})
