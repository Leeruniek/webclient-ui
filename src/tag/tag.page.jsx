// @flow

import * as React from "react"

import { LUTag } from "./tag"

type LUTagPagePropsType = {||}
type LUTagPageStateType = {
  isTagActive: boolean,
}

class LUTagPage extends React.Component<
  LUTagPagePropsType,
  LUTagPageStateType
> {
  state = { isTagActive: true }

  render = (): React.Node => {
    const { isTagActive } = this.state

    return (
      <div>
        <LUTag label="Simple tag" />
        <LUTag label="Small tag" size="small" />
        <LUTag label="Info tag" type="info" />
        <LUTag label="Warning tag" type="warning" />
        <LUTag label="Info tag, no icon" type="info" hasIcon={false} />
        <LUTag label="Warning tag, no icon" type="warning" hasIcon={false} />
        <LUTag
          label={`${isTagActive ? "Active" : "Inactive"} tag`}
          isActive={isTagActive}
          onClick={this.handleTagClick}
        />
      </div>
    )
  }

  handleTagClick = () => {
    this.setState(
      (prevState): LUTagPageStateType => ({
        isTagActive: !prevState.isTagActive,
      })
    )
  }
}

export { LUTagPage }
