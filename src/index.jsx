import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { LUCheckboxPage } from "./checkbox.page/checkbox.page"
import "./index.css"

render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={LUCheckboxPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
