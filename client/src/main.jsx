import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";
import "./index.css";

import theme from './theme.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <App/>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);