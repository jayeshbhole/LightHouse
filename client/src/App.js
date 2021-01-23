import React from "react";
import "./assets/scss/App.scss";
import "dotenv";
import firbase from "firebase/app";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Landing from "./components/landing.jsx";
import Navigation from "./components/navbar";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.M_SENDER_ID,
    appId: process.env.APPID,
    measurementId: process.env.M_ID,
};

firbase.initializeApp(firebaseConfig);

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />

                <Switch>
                    <Route exact path="/" component={() => <Landing />}></Route>
                    <Route exact path="/kanban"></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
