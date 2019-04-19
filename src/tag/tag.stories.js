import React from "react"
import { storiesOf } from "@storybook/react"
import { LUTag } from "./tag"

storiesOf("LUTag", module)
  .add("LUTag", () => <LUTag label="LUTab" />)
  .add("Different sizes of LUTag", () => (
    <React.Fragment>
      <LUTag label="small" size="small" />
      <LUTag label="normal" size="normal" />
      <LUTag label="large" size="large" />
    </React.Fragment>
  ))
  .add("Different types of LUTag", () => (
    <React.Fragment>
      <LUTag label="default" type="default" />
      <LUTag label="primary" type="primary" />
      <LUTag label="warning" type="warning" />
      <LUTag label="info" type="info" />
    </React.Fragment>
  ))
