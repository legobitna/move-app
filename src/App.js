import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-input-range/lib/css/index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MovieDetail from "./pages/MovieDetail";
import PublicNavbar from "./components/PublicNavbar";

function App() {
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState("");
  return (
    <div className="background">
      <PublicNavbar setKeyword={setKeyword} setSearchBy={setSearchBy} />
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <Homepage
                keyword={keyword}
                searchBy={searchBy}
                setSearchBy={setSearchBy}
              />
            )}
          />
          <Route path="movie/:id" exact component={MovieDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
