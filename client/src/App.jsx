import { Flex } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import { ColorModeScript } from "@chakra-ui/react";

import "./App.css";
import theme from "./theme";

import TopNav from "./components/displayElements/nav/TopNav";
import Home from "./components/layouts/Home";
import About from "./components/layouts/About";
import Resume from "./components/layouts/Resume";
import Minfi from "./components/layouts/Minfi";

function App() {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Flex direction="column" position="relative" minH="100vh">
                <TopNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/minfi" element={<Minfi />} />
                </Routes>
            </Flex>
        </>
    );
}

export default App;