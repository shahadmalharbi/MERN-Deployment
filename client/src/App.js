import './App.css';
import React from "react";
import {BrowserRouter, Switch, Route, Link
} from "react-router-dom";
import AllMovies from './components/AllMovies'
import OneMovie from './components/OneMovie'
import CreateMovie from './components/CreateMovie'
import CreateReview from './components/CreateReview'
function App() {
  return (
    <div className="App mt-4 pb-4 container col-8 ">
            <BrowserRouter>
        <Switch>
        <Route exact path="/">
          <AllMovies/>
        </Route>
        <Route exact path="/movie/new">
          <CreateMovie />
        </Route>
       <Route exact path="/moives/:id">
          <OneMovie />
        </Route>
        <Route exact path="/movies/:id/review">
          <CreateReview /> 
         </Route>
        </Switch>
      </BrowserRouter>
      </div>
  )
}
export default App;
