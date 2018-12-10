// @flow

import type { LUCheckboxType } from "../checkbox.page/checkbox/checkbox.types"
import {LUCheckbox} from "../checkbox.page/checkbox/checkbox"
import {LUCheckboxHeader} from "./checkbox-group__header"

export type LUCheckboxHeaderType = {
  className?: string,
  label: string
}

export type LUCheckboxGroupType = {
  children: React.ChildrenArray<React.Element<typeof LUCheckbox | typeof LUCheckboxHeader>>,
  value: Array<number> | Array<string>,
  className?: string,
  scrollHeight?: number | string,
  onChange: Function,
}
