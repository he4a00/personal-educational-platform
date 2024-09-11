"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Sparkles } from "lucide-react";

type ScoreProps = {
  score: number;
  total: number;
};

export default function ExamFinalScore({ score, total }: ScoreProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((score / total) * 100);
    }, 500);
    return () => clearTimeout(timer);
  }, [score, total]);

  const handleCelebrate = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setShowMessage(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 space-y-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center"
      >
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          نتيجتك النهائية
        </h1>
        <div className="text-6xl font-bold text-primary mb-4">
          {score}/{total}
        </div>
        <Progress value={progress} className="w-full mb-4" />
        <p className="text-lg text-gray-600 mb-6">
          {progress >= 80
            ? "شغل عالي"
            : progress >= 60
            ? "عمل جيد"
            : "حل اكتر وهتتحسن"}
        </p>
        <Button onClick={handleCelebrate} className="w-full">
          <Sparkles className="mr-2 h-4 w-4" /> احتفل الان!
        </Button>
      </motion.div>

      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-primary text-primary-foreground rounded-lg p-4 mt-4"
        >
          <Star className="w-6 h-6 inline-block mr-2" />
          عاش علي انك خلصت الامتحان يباشا
        </motion.div>
      )}
    </div>
  );
}
