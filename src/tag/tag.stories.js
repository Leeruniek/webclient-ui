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
      <LUTag label="small" type="default" />
      <LUTag label="LUTab" type="primary" />
      <LUTag label="LUTab" type="warning" />
      <LUTag label="LUTab" type="info" />
    </React.Fragment>
  ))
