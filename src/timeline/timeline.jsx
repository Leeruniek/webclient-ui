// @flow

import * as React from "react"
import cx from "classnames"
import { is, pipe, sortBy, map } from "@leeruniek/functies"
import ReactTooltip from "react-tooltip"
import { format } from "date-fns"

import css from "./timeline.css"

const nlLocale = require("date-fns/locale/nl")

const { Fragment } = React

type TimelineItemType = {|
  id: number,
  icon: React.Node,
  title: string,
  date: string,
  user: string,
  tooltipText: string,
  subjectId?: number,
  color?: string,
  className: ?string,
  titleClassName: ?string,
  dateClassName: ?string,
|}

type Props = {|
  items: TimelineItemType[],
  sortDirection: ?string,
  itemClassName: ?string,
  titleClassName: ?string,
  dateClassName: ?string,
  renderChild?: TimelineItemType => React.Node,
|}

const LUTimeline = ({
  items,
  sortDirection,
  itemClassName,
  titleClassName,
  dateClassName,
  renderChild,
}: Props): React.Node => {
  const [isTimelineExpanded, setIsTimelineExpanded] = React.useState(false)

  React.useEffect(() => {
    setIsTimelineExpanded(false)
  }, [items])

  const visibleItems =
    isTimelineExpanded || items.length <= 3
      ? sortBy("date", sortDirection || "desc")(items)
      : sortBy("date", sortDirection || "desc")(items).slice(0, 3)

  return (
    <Fragment>
      {pipe(
        map(
          (item): React.Node => (
            <div
              key={`timeline_item_${item.id}`}
              className={cx(css.timeline__item, itemClassName, item.className)}>
              <div className={css.timeline__timeline}>
                <div
                  className={css["timeline__item-icon-container"]}
                  data-tip={true}
                  data-for={`timeline-tooltip-${item.id}`}>
                  <i
                    className={cx(
                      css["timeline__item-icon"],
                      "fa",
                      `fa-${item.icon}`
                    )}
                    style={{ color: item.color }}
                  />
                </div>
                <ReactTooltip id={`timeline-tooltip-${item.id}`} effect="solid">
                  {item.tooltipText}
                </ReactTooltip>
              </div>
              <p className={css["timeline__item-meta-container"]}>
                <strong
                  className={cx(
                    css["timeline__item-title"],
                    titleClassName,
                    item.titleClassName
                  )}>
                  {item.title}
                </strong>
                <br />
                <small
                  className={cx(
                    css["timeline__item-date"],
                    dateClassName,
                    item.dateClassName
                  )}>
                  {format(item.date, "DD MMMM YYYY HH:mm", {
                    locale: nlLocale,
                  })}
                  {item.user && <Fragment> | {item.user}</Fragment>}
                </small>
              </p>
              {is(renderChild) && (
                <div className={css["timeline__item-child-container"]}>
                  {renderChild(item)}
                </div>
              )}
            </div>
          )
        )
      )(visibleItems)}
      {items.length > 3 ? (
        <a
          onClick={event => {
            event.preventDefault()
            setIsTimelineExpanded(!isTimelineExpanded)
          }}
          className={css["timeline_expand-ctrl"]}>
          {isTimelineExpanded ? "Toon minder" : "Toon meer"}
        </a>
      ) : null}
    </Fragment>
  )
}

export { LUTimeline }
