import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quiz';
import confetti from 'canvas-confetti';
import { useEconomy } from '../store/useEconomy';

export default function Quiz() {
  const addCoins = useEconomy(state => state.addCoins);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const handleAnswerSelect = (answer) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(answer);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (!isAnswerChecked) {
      setIsAnswerChecked(true);
      if (selectedAnswer === currentQuestion.correctAnswer) {
        setScore(score + 1);
        addCoins(10); // Reward 10 points for a right answer
        if (currentQuestionIndex + 1 === quizQuestions.length) {
          // If it's the last question and they got it right, maybe confetti?
          if (score + 1 > quizQuestions.length / 2) {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }
      }
    } else {
      if (currentQuestionIndex + 1 < quizQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        setShowResults(true);


        if (score > quizQuestions.length / 2) {
          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 }
          });
        }
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-ayush-green-600/20 blur-[100px]"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-purple-600/20 blur-[100px]"></div>

      <div className="w-full max-w-2xl z-10 relative">
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-3xl shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
                <span className="text-ayush-green-400 font-semibold tracking-wider text-sm uppercase">
                  AYUSH Knowledge Check
                </span>
                <span className="text-slate-400 font-medium">
                  {currentQuestionIndex + 1} / {quizQuestions.length}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => {
                  let buttonClass = "w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-200 border-2 ";
                  
                  if (!isAnswerChecked) {
                    buttonClass += selectedAnswer === option 
                      ? "border-ayush-green-500 bg-ayush-green-500/10 text-white" 
                      : "border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500 hover:bg-slate-700";
                  } else {
                    if (option === currentQuestion.correctAnswer) {
                      buttonClass += "border-ayush-green-500 bg-ayush-green-500 text-white shadow-lg shadow-ayush-green-500/30";
                    } else if (selectedAnswer === option) {
                      buttonClass += "border-red-500 bg-red-500/20 text-white";
                    } else {
                      buttonClass += "border-slate-700 bg-slate-800/30 text-slate-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={isAnswerChecked}
                      className={buttonClass}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              
              <AnimatePresence>
                {isAnswerChecked && currentQuestion.explanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="mb-8 p-4 bg-slate-700/50 rounded-xl border border-slate-600 text-slate-300 text-sm leading-relaxed"
                  >
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedAnswer && !isAnswerChecked}
                  className={`px-8 py-3 rounded-full font-bold transition-all ${
                    !selectedAnswer && !isAnswerChecked
                      ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                      : "bg-ayush-green-500 hover:bg-ayush-green-400 text-white shadow-lg shadow-ayush-green-500/30 hover:shadow-xl"
                  }`}
                >
                  {isAnswerChecked ? (currentQuestionIndex + 1 === quizQuestions.length ? "Finish" : "Next Question") : "Check Answer"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-12 rounded-3xl shadow-2xl text-center"
            >
              <div className="w-24 h-24 mx-auto bg-ayush-green-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-5xl">🏆</span>
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-4">Quiz Complete!</h2>
              <p className="text-xl text-slate-300 mb-4">
                You scored <span className="text-ayush-green-400 font-bold text-3xl">{score}</span> out of {quizQuestions.length}
              </p>
              
              <div className="bg-slate-700/50 rounded-xl p-4 mb-8 inline-block">
                <p className="text-yellow-400 font-bold flex items-center justify-center space-x-2">
                  <span className="text-2xl">🪙</span>
                  <span>+{score * 10} Coins Earned!</span>
                </p>
              </div>
              
              <div className="flex justify-center flex-col sm:flex-row gap-4">
                <button
                  onClick={restartQuiz}
                  className="px-8 py-3 bg-ayush-green-500 hover:bg-ayush-green-400 text-white font-bold rounded-full shadow-lg shadow-ayush-green-500/30 transition-all"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
