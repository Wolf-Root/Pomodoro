import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import icon from "../../public/favicon.png";

function Pomodoro({ mode, setMode }) {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const handleSessionChange = (amount) => {
        if (isRunning) return;
        const newLength = Math.min(60, Math.max(1, sessionLength + amount));
        setSessionLength(newLength);
        if (mode === "Session") setTimeLeft(newLength * 60);
    };

    const handleBreakChange = (amount) => {
        if (isRunning) return;
        const newLength = Math.min(60, Math.max(1, breakLength + amount));
        setBreakLength(newLength);
        if (mode === "Break") setTimeLeft(newLength * 60);
    };

    const handleStartStop = () => {
        if (isRunning) {
            clearInterval(intervalId);
            setIsRunning(false);
        } else {
            const newInterval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            setIntervalId(newInterval);
            setIsRunning(true);
        }
    };

    useEffect(() => {
        if (timeLeft === 0) {
            document.getElementById("beep").play();
            if (mode === "Session") {
                setMode("Break");
                setTimeLeft(breakLength * 60);
            } else {
                setMode("Session");
                setTimeLeft(sessionLength * 60);
            }
        }
    }, [timeLeft, breakLength, sessionLength, mode]);

    const handleReset = () => {
        clearInterval(intervalId);
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(25 * 60);
        setIsRunning(false);
        setMode("Session");
        const beep = document.getElementById("beep");
        beep.pause();
        beep.currentTime = 0;
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <section
            className={`w-full md:max-w-11/12 py-10 bg-linear-to-b ${
                mode === "Session"
                    ? "from-[#d90015] to-[#c60013]"
                    : "from-[#00d915] to-[#00b312]"
            } text-white font-mono flex flex-col items-center gap-4 md:gap-8 shadow-[0_0_14px_4px_rgb(0_0_0/0.20)] drop-shadow-2xl`}
        >
            {/* Title */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 pb-2">
                    <img
                        src={icon}
                        alt="Pomodoro icon"
                        className="w-12 h-auto object-cover"
                    />
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                        Pomodoro Clock
                    </h1>
                </div>
                <p>
                    Designed and programmed by {""}
                    <a
                        href="https://github.com/Wolf-Root"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold underline underline-offset-4"
                    >
                        Wolf-Root
                    </a>
                </p>
            </div>

            {/* Session */}
            <div className="py-10 flex flex-col items-center justify-center text-center text-2xl font-semibold">
                <h2 id="timer-label">{mode}</h2>
                <p
                    id="time-left"
                    className="text-7xl md:text-[6rem] lg:text-[8rem] xl:text-[14rem]"
                >
                    {formatTime(timeLeft)}
                </p>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
                <button
                    id="start_stop"
                    className="cursor-pointer text-2xl text-white bg-green-600 rounded-xl border-2 border-gray-700 py-1 md:py-2 px-4 duration-300 hover:bg-green-700"
                    onClick={handleStartStop}
                >
                    Start
                </button>
                <button
                    id="reset"
                    className="cursor-pointer text-2xl text-white opacity-80 duration-300 hover:opacity-100"
                    onClick={handleReset}
                >
                    Rest
                </button>
            </div>

            {/* Length */}
            <div className="w-full flex flex-row items-center justify-between">
                {/* Break Length */}
                <div className="w-1/2 flex flex-col items-center gap-4">
                    <h2 id="break-label" className="text-xl md:text-2xl">
                        Break Length
                    </h2>
                    <div className="flex items-center justify-between gap-4 font-semibold text-3xl">
                        <button
                            id="break-decrement"
                            onClick={() => handleBreakChange(-1)}
                            className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faDownLong} />
                        </button>

                        <h3 id="break-length">{breakLength}</h3>

                        <button
                            id="break-increment"
                            onClick={() => handleBreakChange(1)}
                            className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faUpLong} />
                        </button>
                    </div>
                </div>

                {/* Session Length */}
                <div className="w-1/2 flex flex-col items-center gap-4">
                    <h2 id="session-label" className="text-xl md:text-2xl">
                        Session Length
                    </h2>
                    <div className="flex items-center justify-between gap-4 font-semibold text-3xl">
                        <button
                            id="session-decrement"
                            onClick={() => handleSessionChange(-1)}
                            className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faDownLong} />
                        </button>

                        <h3 id="session-length">{sessionLength}</h3>

                        <button
                            id="session-increment"
                            onClick={() => handleSessionChange(1)}
                            className="cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faUpLong} />
                        </button>
                    </div>
                </div>
            </div>

            <audio
                id="beep"
                src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
                preload="auto"
            />
        </section>
    );
}

export default Pomodoro;
