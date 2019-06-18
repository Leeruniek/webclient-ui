import React from "react"
import { components } from "react-select"
import { isEmpty } from "@leeruniek/functies";

export const Input = props => {
  const { isHidden, selectProps } = props

  if (isHidden || isEmpty(selectProps.inputPlaceholder)) {
    return <components.Input {...props} />
  }

  return (
    <div>
      <components.Input {...props} placeholder={selectProps.inputPlaceholder} />
    </div>
  )
}
