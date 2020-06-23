import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import StreamList from "./streams/StreamList";
import CreateStream from "./streams/CreateStream";
import EditStream from "./streams/EditStream";
import DeleteStream from "./streams/DeleteStream";
import ShowStream from "./streams/ShowStream";
import history from "../history";

function App() {
  return (
    <Router history={history}>
      <div className="ui container">
        <Header />

        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={CreateStream} />
          <Route path="/streams/edit/:id" exact component={EditStream} />
          <Route path="/streams/delete/:id" exact component={DeleteStream} />
          <Route path="/streams/show/:id" exact component={ShowStream} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
