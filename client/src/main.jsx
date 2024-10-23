import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";

import theme from "./assets/js/theme";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ChakraProvider>
    </React.StrictMode>
)