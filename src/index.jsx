import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { LUButtonPage } from "./button/button.page"
import { LUCheckboxPage } from "./checkbox/checkbox.page"
import { LUCheckboxGroupPage } from "./checkbox-group/checkbox-group.page"
import { LUTagPage } from "./tag/tag.page"
import { LUTimelinePage } from "./timeline/timeline.page"

import "./index.css"

render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/button" component={LUButtonPage} />
      <Route exact={true} path="/checkbox" component={LUCheckboxPage} />
      <Route
        exact={true}
        path="/checkbox-group"
        component={LUCheckboxGroupPage}
      />
      <Route exact={true} path="/tag" component={LUTagPage} />
      <Route exact={true} path="/timeline" component={LUTimelinePage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
