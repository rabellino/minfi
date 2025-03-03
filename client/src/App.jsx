import { Flex } from "@chakra-ui/react";

import "./App.css";
import Body from "./components/layouts/Body";
import Navbar from "./components/displayElements/nav/Navbar";
import HealthCheck from "./components/displayElements/appComponents/HealthCheck";

function App() {
    return (
        <Flex direction="column" width="100%" minHeight="100vh">
            <Navbar />
            <Body />
            <HealthCheck />
        </Flex>
    );
}

export default App;