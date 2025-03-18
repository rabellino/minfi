import { Flex } from "@chakra-ui/react";
import { Route, Routes, useNavigate } from 'react-router-dom';

import "./App.css";

import TopNav from "./components/displayElements/nav/TopNav";
import Home from "./components/layouts/Home";

function App() {
    return (
        <Flex direction="column" position="relative" background="var(--main-body-bg)" overflowY="clip">
            <TopNav />
            <Routes>
                <Route path="/" element={
                    <Home />
                }>
                </Route>
            </Routes>
        </Flex>
    );
}

export default App;