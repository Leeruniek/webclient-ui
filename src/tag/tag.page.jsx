// @flow

import * as React from "react"

import { LUTag } from "./tag"

type LUTagPagePropsType = {||}

class LUTagPage extends React.Component<LUTagPagePropsType> {
  render = (): React.Node => (
    <div>
      <LUTag label="Default tag" />
      <LUTag label="Small tag" size="small" />
      <LUTag label="Large tag" size="large" />
      <LUTag label="Primary tag" type="primary" />
      <LUTag label="Info tag" type="info" />
      <LUTag label="Warning tag" type="warning" />
      <LUTag label="Info tag, no icon" type="info" hasIcon={false} />
      <LUTag label="Warning tag, no icon" type="warning" hasIcon={false} />
    </div>
  )
}

export { LUTagPage }
