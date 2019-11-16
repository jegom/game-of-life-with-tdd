import React, { Component } from 'react';
import Routing from "./routing";
import {Provider} from 'react-redux';
import {initStore} from "./store";

export const store = initStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Routing/>
            </Provider>
        );
    }
}

export default App;
