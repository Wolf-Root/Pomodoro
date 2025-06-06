import { useState } from "react";
import Pomodoro from "./Components/Pomodoro";

function App() {
    const [mode, setMode] = useState("Session");

    return (
        <main
            className={`min-h-screen bg-linear-to-b ${
                mode === "Session"
                    ? "from-[#da0015] to-[#d40017]"
                    : "from-[#00da15] to-[#00d417]"
            } flex flex-col items-center justify-center`}
        >
            <Pomodoro mode={mode} setMode={setMode} />
        </main>
    );
}

export default App;
