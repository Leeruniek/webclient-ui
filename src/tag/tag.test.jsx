import tape from "tape"
import React from "react"
import Adapter from "enzyme-adapter-react-16"
import { shallow, configure } from "enzyme"

import { LUTag } from "./tag"

tape("LUTag renders when provided with a label", t => {
  t.plan(1)
  configure({ adapter: new Adapter() })

  const wrapper = shallow(<LUTag label="Tag label" />)

  t.ok(wrapper.text(), "Tag label")
})

tape(
  "LUTag renders an icon by default if type prop is 'info' or 'warning'",
  t => {
    t.plan(2)
    configure({ adapter: new Adapter() })

    const infoWrapper = shallow(<LUTag label="Info tag" type="info" />)
    const warningWrapper = shallow(<LUTag label="Warning tag" type="warning" />)

    t.ok(infoWrapper.contains(<i className="fa fa-info" />))
    t.ok(warningWrapper.contains(<i className="fa fa-warning" />))
  }
)
