import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { LUButtonPage } from "./button/button.page"
import { LUCheckboxPage } from "./checkbox/checkbox.page"
import { LUCheckboxGroupPage } from "./checkbox-group/checkbox-group.page"

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
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
)

if (module.hot) {
  module.hot.accept()
}
