// @flow

import type { LUCheckboxType } from "../checkbox.page/checkbox/checkbox.types"
import { LUCheckbox } from "../checkbox.page/checkbox/checkbox"
import { LUCheckboxGroupHeader } from "./checkbox-group__header"

export type LUCheckboxGroupHeaderType = {
  className?: string,
  label: string,
}

export type LUCheckboxGroupType = {
  children: React.ChildrenArray<
    React.Element<typeof LUCheckbox | typeof LUCheckboxGroupHeader>
  >,
  className?: string,
  scrollHeight?: number | string,
  onChange: Function,
}
