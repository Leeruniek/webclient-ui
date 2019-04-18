import React from "react"
import { storiesOf } from "@storybook/react"
import { LUSelect } from "./select"

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

storiesOf("LUSelect", module).add("Simple select", () => <LUSelect options={options} label="LUSelect"/>)
