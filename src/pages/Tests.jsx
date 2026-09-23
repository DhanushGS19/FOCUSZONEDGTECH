import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { CheckCircle, XCircle } from 'lucide-react';
import './Tests.css';

const mockQuiz = {
  title: "Science Daily Mock",
  questions: [
    { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], answer: 1 },
    { q: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "Sound speed"], answer: 0 },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], answer: 2 }
  ]
};

const Tests = () => {
  const { addXp } = useUser();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    
    if (idx === mockQuiz.questions[currentQ].answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQ < mockQuiz.questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
        // Add XP based on score
        const finalScore = score + (idx === mockQuiz.questions[currentQ].answer ? 1 : 0);
        addXp(finalScore * 50);
      }
    }, 1500);
  };

  return (
    <div className="tests-container">
      <h1 className="mb-4">Knowledge Tests</h1>
      
      {showResult ? (
        <div className="glass-panel result-panel text-center">
          <h2 className="text-3xl mb-4">Quiz Completed!</h2>
          <div className="score-display mb-4">
            {score} / {mockQuiz.questions.length}
          </div>
          <p className="text-accent text-xl mb-4">+{score * 50} XP Earned!</p>
          <button className="primary" onClick={() => {
            setShowResult(false);
            setCurrentQ(0);
            setScore(0);
            setSelectedOption(null);
            setIsAnswered(false);
          }}>Retake Quiz</button>
        </div>
      ) : (
        <div className="glass-panel quiz-panel">
          <div className="quiz-header flex justify-between items-center mb-4">
            <h2 className="text-xl">{mockQuiz.title}</h2>
            <span className="text-muted">Question {currentQ + 1}/{mockQuiz.questions.length}</span>
          </div>
          
          <h3 className="text-2xl mb-6">{mockQuiz.questions[currentQ].q}</h3>
          
          <div className="options-grid flex-col gap-4">
            {mockQuiz.questions[currentQ].options.map((opt, idx) => {
              let btnClass = "option-btn ";
              if (isAnswered) {
                if (idx === mockQuiz.questions[currentQ].answer) btnClass += "correct";
                else if (idx === selectedOption) btnClass += "incorrect";
                else btnClass += "disabled";
              }
              return (
                <button 
                  key={idx} 
                  className={btnClass}
                  onClick={() => handleSelect(idx)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === mockQuiz.questions[currentQ].answer && <CheckCircle size={18} />}
                  {isAnswered && idx === selectedOption && idx !== mockQuiz.questions[currentQ].answer && <XCircle size={18} />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tests;
