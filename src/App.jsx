import { useState, useEffect } from "react";
import { ArrowRight, BrainCircuit, Play, Pause, RotateCcw } from "lucide-react";
import Confetti from "react-confetti";

export default function App() {
  // 🚨 REPLACE THIS LINK WITH YOUR ACTUAL PARTYROCK PUBLISHED URL 🚨
  const partyRockUrl = "https://partyrock.aws/u/insanhii/kFYmDS61S/NEXT-HOUR"; 

  // Timer & App States
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [customTime, setCustomTime] = useState("");
  const [rewardMessage, setRewardMessage] = useState("");

  // Dopamine Hit Messages
  const successMessages = [
    "Mission accomplished. Time saved. Let's go! 🚀",
    "Deep work secured. You crushed it! 🔥",
    "Focus level 100. Take a well-deserved break! 🎯",
    "Another block built for the Builder's Collective! 👑"
  ];

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setRewardMessage(successMessages[Math.floor(Math.random() * successMessages.length)]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000); // Stop confetti after 10s
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const setTimer = (minutes) => {
    setTimeLeft(minutes * 60);
    setIsActive(false);
    setShowConfetti(false);
    setRewardMessage(""); // Reset message on new timer
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-zinc-700 relative">
      {/* Confetti Explosion */}
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}

      {/* Navigation */}
      <nav className="w-full p-6 flex justify-between items-center border-b border-zinc-900">
        <div className="text-xl font-semibold tracking-tighter text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5" />
          Next Hour
        </div>
        <a 
          href="https://github.com/insanhi/next-hour" 
          target="_blank" rel="noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          View Source
        </a>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-20 pb-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs font-medium text-zinc-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Online
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Focus is a choice. <br/>
          <span className="text-zinc-500">Make yours.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl leading-relaxed">
          Open your AI session to get your strict micro-task, then return here to start the deep-work timer. No excuses.
        </p>

        <a 
          href={partyRockUrl} 
          target="_blank" rel="noreferrer"
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out mb-16"
        >
          Enter the AI Session
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        {/* Deep Work Timer UI */}
        <div className="w-full max-w-md bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl flex flex-col items-center">
          <h2 className="text-zinc-400 text-sm font-medium uppercase tracking-widest mb-6">Deep Work Timer</h2>
          
          <div className="text-7xl font-mono font-light text-white mb-8 tracking-tighter">
            {formatTime(timeLeft)}
          </div>

          {/* Custom Time Selector */}
          {!isActive && timeLeft === 0 && (
            <div className="flex gap-3 mb-6">
              <input 
                type="number" 
                value={customTime}
                onChange={(e) => setCustomTime(e.target.value)}
                placeholder="Minutes"
                min="1"
                className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-zinc-500 w-28 text-center"
              />
              <button 
                onClick={() => {
                  if(customTime > 0) {
                    setTimer(Number(customTime));
                    setCustomTime("");
                  }
                }} 
                className="px-6 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
              >
                Set Time
              </button>
            </div>
          )}

          {/* Controls */}
          {timeLeft > 0 && (
            <div className="flex gap-4">
              <button 
                onClick={() => setIsActive(!isActive)} 
                className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors"
              >
                {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isActive ? "Pause" : "Start"}
              </button>
              <button 
                onClick={() => setTimer(0)} 
                className="flex items-center gap-2 px-6 py-3 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Success Message */}
          {showConfetti && rewardMessage && (
            <div className="text-green-400 font-medium mt-4 animate-pulse text-center px-4">
              {rewardMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}