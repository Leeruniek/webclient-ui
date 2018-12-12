// @flow

import { LUCheckbox } from "../checkbox.page/checkbox/checkbox"
import { LUCheckboxGroupHeader } from "./checkbox-group__header"

export type LUCheckboxGroupHeaderPropsType = {
  className?: string,
  label: string,
}

export type LUCheckboxGroupPropsType = {
  children: React.ChildrenArray<
    React.Element<typeof LUCheckbox | typeof LUCheckboxGroupHeader>
  >,
  className?: string,
  scrollHeight?: number | string,
  onChange: Function,
}
