import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import BusinessList from "./components/BusinessList";
import BusinessDetails from "./components/BusinessDetails";
import ReviewForm from "./components/ReviewForm";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <div>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path="/businesses">
              <BusinessList />
            </Route>
            <Route exact path="/businesses/:businessId">
              <BusinessDetails />
            </Route>
            <Route exact path="/businesses/:businessId/new-review">
              <ReviewForm />
            </Route>
          </Switch>
        )}
      </div>
      <Footer />
    </div>

  );
}

export default App;
