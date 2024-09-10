import Image from "next/image";
import React, { useState, useEffect } from "react";

import math1 from "../images/math.png";
import math2 from "../images/number.png";

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        return newProgress > 100 ? 0 : newProgress;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-blue-50 flex items-center justify-center">
      {/* Math-themed background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl font-bold text-blue-500"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            {
              ["π", "∑", "∫", "√", "+", "-", "×", "÷", "="][
                Math.floor(Math.random() * 9)
              ]
            }
          </div>
        ))}
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex-1 border-b border-blue-200" />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-row">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex-1 border-r border-blue-200" />
        ))}
      </div>

      {/* Math-related images */}
      <div className="absolute inset-0 opacity-5">
        {/* Calculator */}
        <svg
          className="absolute w-32 h-32"
          style={{ top: "10%", left: "5%" }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="7"
            y1="8"
            x2="17"
            y2="8"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="7"
            y1="12"
            x2="17"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="7"
            y1="16"
            x2="17"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>

        {/* Compass */}
        <svg
          className="absolute w-32 h-32"
          style={{ top: "70%", left: "80%" }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 3V9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 15V21" stroke="currentColor" strokeWidth="2" />
          <path d="M3 12H9" stroke="currentColor" strokeWidth="2" />
          <path d="M15 12H21" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Ruler */}
        <svg
          className="absolute w-40 h-16"
          style={{ top: "40%", left: "70%", transform: "rotate(45deg)" }}
          viewBox="0 0 40 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="40" height="10" fill="currentColor" fillOpacity="0.1" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="10"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="5"
            y1="0"
            x2="5"
            y2="5"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="0"
            x2="10"
            y2="10"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="15"
            y1="0"
            x2="15"
            y2="5"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="20"
            y1="0"
            x2="20"
            y2="10"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="25"
            y1="0"
            x2="25"
            y2="5"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="30"
            y1="0"
            x2="30"
            y2="10"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="35"
            y1="0"
            x2="35"
            y2="5"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="40"
            y1="0"
            x2="40"
            y2="10"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>

        {/* Protractor */}
        <svg
          className="absolute w-32 h-16"
          style={{ top: "20%", right: "10%" }}
          viewBox="0 0 32 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <path d="M16 16V0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M8 16V14" stroke="currentColor" strokeWidth="0.5" />
          <path d="M24 16V14" stroke="currentColor" strokeWidth="0.5" />
          <path d="M4 16V15" stroke="currentColor" strokeWidth="0.5" />
          <path d="M28 16V15" stroke="currentColor" strokeWidth="0.5" />
          <path d="M12 16V14" stroke="currentColor" strokeWidth="0.5" />
          <path d="M20 16V14" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Simplified loading animation */}
      <div className="relative z-10 flex items-center justify-center  bg-opacity-80 p-8 rounded-full">
        <div className="border border-gray-200 p-2 rounded-md shadow-lg shadow-orange-300">
          <div className="flex items-end gap-1 justify-center">
            <span className="text-6xl font-semibold dark:text-white">الأس</span>
            <Image src={math1} width={30} height={30} alt="" />
            <Image
              src={math2}
              width={30}
              height={30}
              alt=""
              className="animate-bounce"
            />
            <span className="text-6xl font-semibold text-orange-500">تاذ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
