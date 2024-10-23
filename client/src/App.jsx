import { Flex } from "@chakra-ui/react";

import "./App.css";
import Body from "./components/layouts/Body";
import Navbar from "./components/displayElements/nav/Navbar";

function App() {
    return (
        <Flex direction="column" width="100%" minHeight="100vh">
            <Navbar />
            <Body />
        </Flex>
    );
}

export default App;