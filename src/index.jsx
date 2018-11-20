// @flow

import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { LUButtonPage } from "./button.page/button.page"
import "./index.css"

render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={LUButtonPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
