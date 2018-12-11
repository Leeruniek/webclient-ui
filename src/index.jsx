import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { LUCheckboxGroupPage } from "./checkbox-group/checkbox-group.page"
import "./index.css"

render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={LUCheckboxGroupPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
