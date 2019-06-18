// @flow

import * as React from "react"
import cx from "classnames"
import { is, pipe, sortBy, map } from "@leeruniek/functies"

import css from "./timeline.css"

const { Fragment } = React

type TimelineItemType = {|
  key: string,
  icon: React.Node,
  title: string,
  date: string,
  user: string,
  className: ?string,
  titleClassName: ?string,
  dateClassName: ?string,
|}

type Props = {|
  items: TimelineItemType[],
  itemClassName: ?string,
  titleClassName: ?string,
  dateClassName: ?string,
  renderChild?: TimelineItemType => React.Node,
|}

const LUTimeline = ({
  items,
  itemClassName,
  titleClassName,
  dateClassName,
  renderChild,
}: Props): React.Node => (
  <Fragment>
    {pipe(
      sortBy("date", "desc"),
      map(
        (item): React.Node => (
          <div
            key={item.key}
            className={cx(css.timeline__item, itemClassName, item.className)}>
            <div className={css.timeline__timeline}>
              <div className={css["timeline__item-icon-container"]}>
                <i
                  className={cx(
                    css["timeline__item-icon"],
                    "fa",
                    `fa-${item.icon}`
                  )}
                />
              </div>
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
                {item.date}
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
    )(items)}
  </Fragment>
)

export { LUTimeline }
