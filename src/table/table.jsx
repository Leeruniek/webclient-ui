// @flow

const debug = require("debug")("Leeruniek:LUTable")

import * as React from "react"
import cx from "classnames"
import { map } from "@leeruniek/functies"

import { LUTableCell } from "./table__cell"

import css from "./table.module.css"

type LUTableType = {|
  selectedId?: number,
  columns?: {
    [string]: {
      header: string,
      isSortable?: boolean,
      onCellRender: Function,
      headerClassName?: string,
    },
  },
  rows?: { id: number }[],
  sortField?: string,
  sortDirection?: "DESC" | "ASC",
  onSort?: Function,
  onRowClick?: Function,
|}

export const LUTable = React.memo<LUTableType>(
  ({
    selectedId,
    columns = {},
    rows = [],
    sortField,
    sortDirection,
    onSort,
    onRowClick,
  }: LUTableType): React.Node => {
    const handleSort = field => () => {
      // ASC -> DESC -> None -> repeat
      const step =
        field === sortField && sortDirection === "DESC"
          ? 3
          : sortDirection === "ASC"
          ? 2
          : 1

      onSort &&
        onSort({
          field: step === 3 ? null : field,
          direction: step === 3 ? null : step === 2 ? "DESC" : "ASC",
        })
    }

    const handleRowClick = item => () => {
      onRowClick && onRowClick(item)
    }

    const dataEntries = Object.entries(columns)

    return (
      <div className={css.table}>
        <div className={css.table__row}>
          {map(([columnKey, columnData], idx) => {
            const isFieldSorted = sortField === columnKey

            return (
              <LUTableCell
                key={`table-header-${idx}`}
                className={cx({
                  [css["table__head--sortable"]]: columnData.isSortable,
                  [columnData.headerClassName]: columnData.headerClassName,
                })}
                isHeader={true}
                onClick={columnData.isSortable ? handleSort(columnKey) : null}>
                {columnData.header}
                {columnData.isSortable ? (
                  <i
                    className={cx(css["table__cell-icon"], "fa", {
                      "fa-sort": columnData.isSortable,
                      "fa-sort-up": isFieldSorted && sortDirection === "ASC",
                      "fa-sort-down": isFieldSorted && sortDirection === "DESC",
                    })}
                  />
                ) : null}
              </LUTableCell>
            )
          })(dataEntries)}
        </div>
        {map((row, idRow) => (
          <div
            key={`table-row-${idRow}`}
            className={cx(css.table__row, {
              [css["table__row--selected"]]: row.id === selectedId,
              [css["table__row--hoverable"]]: !!onRowClick,
            })}
            onClick={onRowClick ? handleRowClick(row) : null}>
            {map(([columnKey, columnData], idCell) => (
              <LUTableCell key={`table-cell-${idRow}-${idCell}`}>
                {columnData.onCellRender
                  ? columnData.onCellRender(row)
                  : row[columnKey].header}
              </LUTableCell>
            ))(dataEntries)}
          </div>
        ))(rows)}
      </div>
    )
  }
)
