import React, { Component } from "react";
import { Route } from 'react-router-dom';

import "./App.css";
import Layout from "./components/Layout/Layout";
import Dummy from "./containers/Dummy/Dummy";

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/" exact component={Dummy} />
                </Layout>
            </div>
        );
    }
}

export default App;