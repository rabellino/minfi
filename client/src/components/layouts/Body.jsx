import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Body() {
    const { windows } = useSelector((state) => state.windowStates);
}