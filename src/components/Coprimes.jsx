import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const Coprimes = () => {
  const [values, setValues] = useState({ value1: '', value2: '' });
  const [currentNumbers, setCurrentNumbers] = useState({ num1: null, num2: null });
  const [currentStep, setCurrentStep] = useState(1);
  const [showSteps, setShowSteps] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });
  const [userAnswers, setUserAnswers] = useState({
    factors1: '',
    factors2: '',
    sharedFactors: '',
    isCoprime: null
  });
  const [hasError, setHasError] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false
  });
  const [correctAnswers, setCorrectAnswers] = useState({
    factors1: [],
    factors2: [],
    sharedFactors: [],
    isCoprime: null
  });

  const getFactors = (num) => {
    const factors = [];
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };

  const generateNumbers = () => {
    let n1 = Math.floor(Math.random() * 20) + 1;
    let n2;
    do {
      n2 = Math.floor(Math.random() * 20) + 1;
    } while (n2 === n1);
    
    setValues({ value1: n1.toString(), value2: n2.toString() });
  };

  const handleValueChange = (e, field) => {
    const value = e.target.value;
    // Remove any "e" or "-" characters
    const sanitizedValue = value.replace(/[e-]/g, '');
    setValues(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  const validateInputs = () => {
    const { value1, value2 } = values;
    if (!value1 || !value2) {
      return false;
    }
    const num1 = parseInt(value1);
    const num2 = parseInt(value2);
    if (isNaN(num1) || isNaN(num2)) {
      return false;
    }
    if (num1 < 1 || num2 < 1) {
      return false;
    }
    return true;
  };

  const calculateSteps = () => {
    if (!validateInputs()) return;

    const { value1, value2 } = values;
    const num1 = parseInt(value1);
    const num2 = parseInt(value2);
    
    setCurrentNumbers({ num1, num2 });
    const f1 = getFactors(num1);
    const f2 = getFactors(num2);
    const shared = f1.filter(f => f2.includes(f));
    const isCoprime = shared.length === 1 && shared[0] === 1;
    
    setCurrentStep(1);
    setCompletedSteps({
      step1: false,
      step2: false,
      step3: false,
      step4: false
    });
    setUserAnswers({
      factors1: '',
      factors2: '',
      sharedFactors: '',
      isCoprime: null
    });
    setHasError({
      step1: false,
      step2: false,
      step3: false,
      step4: false
    });
    setCorrectAnswers({
      factors1: f1,
      factors2: f2,
      sharedFactors: shared,
      isCoprime: isCoprime
    });
    setShowSteps(true);
  };

  const checkAnswer = (step, answer) => {
    let correct = false;
    switch (step) {
      case 1:
        const userFactors1 = answer.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
        correct = JSON.stringify(userFactors1) === JSON.stringify(correctAnswers.factors1);
        if (correct) {
          setCompletedSteps(prev => ({ ...prev, step1: true }));
          setCurrentStep(2);
        }
        break;
      case 2:
        const userFactors2 = answer.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
        correct = JSON.stringify(userFactors2) === JSON.stringify(correctAnswers.factors2);
        if (correct) {
          setCompletedSteps(prev => ({ ...prev, step2: true }));
          setCurrentStep(3);
        }
        break;
      case 3:
        const userShared = answer.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n)).sort((a, b) => a - b);
        correct = JSON.stringify(userShared) === JSON.stringify(correctAnswers.sharedFactors);
        if (correct) {
          setCompletedSteps(prev => ({ ...prev, step3: true }));
          setCurrentStep(4);
        }
        break;
      case 4:
        correct = answer === correctAnswers.isCoprime;
        if (correct) {
          setCompletedSteps(prev => ({ ...prev, step4: true }));
        }
        break;
    }
    
    setHasError(prev => ({ ...prev, [`step${step}`]: !correct }));
    return correct;
  };

  const skipStep = (step) => {
    setCompletedSteps(prev => ({ ...prev, [`step${step}`]: true }));
    setCurrentStep(step + 1);
  };

  return (
    <>
      <style>{`
        @property --r {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        .glow-button { 
          min-width: auto; 
          height: auto; 
          position: relative; 
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          transition: all .3s ease;
          padding: 7px;
        }

        .glow-button::before {
          content: "";
          display: block;
          position: absolute;
          background: #fff;
          inset: 2px;
          border-radius: 4px;
          z-index: -2;
        }

        .simple-glow {
          background: conic-gradient(
            from var(--r),
            transparent 0%,
            rgb(0, 255, 132) 2%,
            rgb(0, 214, 111) 8%,
            rgb(0, 174, 90) 12%,
            rgb(0, 133, 69) 14%,
            transparent 15%
          );
          animation: rotating 3s linear infinite;
          transition: animation 0.3s ease;
        }

        .simple-glow.stopped {
          animation: none;
          background: none;
        }

        @keyframes rotating {
          0% {
            --r: 0deg;
          }
          100% {
            --r: 360deg;
          }
        }
      `}</style>
      <div className="w-[500px] h-auto mx-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] bg-white rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[#5750E3] text-sm font-medium select-none">Coprime Numbers</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="number"
                  value={values.value1}
                  onChange={(e) => handleValueChange(e, 'value1')}
                  onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === '-') {
                      e.preventDefault();
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5750E3]"
                  placeholder="First number"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  value={values.value2}
                  onChange={(e) => handleValueChange(e, 'value2')}
                  onKeyDown={(e) => {
                    if (e.key === 'e' || e.key === '-') {
                      e.preventDefault();
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5750E3]"
                  placeholder="Second number"
                />
              </div>
              <Button 
                onClick={generateNumbers}
                className="bg-[#008545] hover:bg-[#00703d] text-white px-4 h-[42px]"
              >
                Random
              </Button>
            </div>

            <div className={`glow-button ${!showSteps ? 'simple-glow' : 'simple-glow stopped'}`}>
              <button 
                onClick={calculateSteps}
                className="w-full bg-[#008545] hover:bg-[#00703d] text-white text-sm py-2 rounded"
              >
                Are They Coprime?
              </button>
            </div>
          </div>
        </div>

        {showSteps && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-4">
              <div className="w-full p-2 mb-1 bg-white border border-[#5750E3]/30 rounded-md">
                <p className="text-sm mb-2">1. What are the factors of {currentNumbers.num1}?</p>
                {!completedSteps.step1 ? (
                  <div className="flex items-center space-x-1 mt-2">
                    <Input 
                      type="text"
                      value={userAnswers.factors1}
                      onChange={(e) => {
                        setUserAnswers(prev => ({ ...prev, factors1: e.target.value }));
                        setHasError(prev => ({ ...prev, step1: false }));
                      }}
                      onKeyDown={(e) => {
                        // Allow: numbers, comma, space, backspace, delete, arrow keys
                        if (!/[\d,\s]/.test(e.key) && 
                            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      placeholder="e.g., 1, 2, 3"
                      className={`w-full ${hasError.step1 ? 'border-yellow-500' : 'border-gray-300'}`}
                    />
                    <div className="glow-button simple-glow">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => checkAnswer(1, userAnswers.factors1)}
                          className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md min-w-[80px]"
                        >
                          Check
                        </button>
                        <button 
                          onClick={() => skipStep(1)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md min-w-[80px]"
                        >
                          Skip
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#008545] font-medium">
                    {correctAnswers.factors1.join(', ')}
                  </p>
                )}
              </div>

              {currentStep >= 2 && (
                <div className="w-full p-2 mb-1 bg-white border border-[#5750E3]/30 rounded-md">
                  <p className="text-sm mb-2">2. What are the factors of {currentNumbers.num2}?</p>
                  {!completedSteps.step2 ? (
                    <div className="flex items-center space-x-1 mt-2">
                      <Input 
                        type="text"
                        value={userAnswers.factors2}
                        onChange={(e) => {
                          setUserAnswers(prev => ({ ...prev, factors2: e.target.value }));
                          setHasError(prev => ({ ...prev, step2: false }));
                        }}
                        onKeyDown={(e) => {
                          // Allow: numbers, comma, space, backspace, delete, arrow keys
                          if (!/[\d,\s]/.test(e.key) && 
                              !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="e.g., 1, 2, 3"
                        className={`w-full ${hasError.step2 ? 'border-yellow-500' : 'border-gray-300'}`}
                      />
                      <div className="glow-button simple-glow">
                        <div className="flex gap-1">
                          <button 
                            onClick={() => checkAnswer(2, userAnswers.factors2)}
                            className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md min-w-[80px]"
                          >
                            Check
                          </button>
                          <button 
                            onClick={() => skipStep(2)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md min-w-[80px]"
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#008545] font-medium">
                      {correctAnswers.factors2.join(', ')}
                    </p>
                  )}
                </div>
              )}

              {currentStep >= 3 && (
                <div className="w-full p-2 mb-1 bg-white border border-[#5750E3]/30 rounded-md">
                  <p className="text-sm mb-2">3. What factors do they share?</p>
                  {!completedSteps.step3 ? (
                    <div className="flex items-center space-x-1 mt-2">
                      <Input 
                        type="text"
                        value={userAnswers.sharedFactors}
                        onChange={(e) => {
                          setUserAnswers(prev => ({ ...prev, sharedFactors: e.target.value }));
                          setHasError(prev => ({ ...prev, step3: false }));
                        }}
                        onKeyDown={(e) => {
                          // Allow: numbers, comma, space, backspace, delete, arrow keys
                          if (!/[\d,\s]/.test(e.key) && 
                              !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="e.g., 1, 2, 3"
                        className={`w-full ${hasError.step3 ? 'border-yellow-500' : 'border-gray-300'}`}
                      />
                      <div className="glow-button simple-glow">
                        <div className="flex gap-1">
                          <button 
                            onClick={() => checkAnswer(3, userAnswers.sharedFactors)}
                            className="bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md min-w-[80px]"
                          >
                            Check
                          </button>
                          <button 
                            onClick={() => skipStep(3)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md min-w-[80px]"
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#008545] font-medium">
                      {correctAnswers.sharedFactors.join(', ')}
                    </p>
                  )}
                </div>
              )}

              {currentStep >= 4 && (
                <div className="w-full p-2 mb-1 bg-white border border-[#5750E3]/30 rounded-md">
                  <p className="text-sm mb-2">4. Are these numbers coprime?</p>
                  {!completedSteps.step4 ? (
                    <div className="flex gap-2">
                      <div className="glow-button simple-glow">
                        <div className="flex gap-1">
                          <button 
                            onClick={() => checkAnswer(4, true)}
                            className={`bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md min-w-[80px] ${hasError.step4 && correctAnswers.isCoprime === false ? 'border-2 border-yellow-500' : ''}`}
                          >
                            Yes
                          </button>
                          <button 
                            onClick={() => checkAnswer(4, false)}
                            className={`bg-[#008545] hover:bg-[#00703d] text-white text-sm px-4 py-2 rounded-md min-w-[80px] ${hasError.step4 && correctAnswers.isCoprime === true ? 'border-2 border-yellow-500' : ''}`}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[#008545] font-medium">
                      {correctAnswers.isCoprime ? 'Yes, these numbers are coprime because they only have a common factor of 1!' : 'No, these numbers are not coprime because they have a common factor other than 1!'}
                    </p>
                  )}
                </div>
              )}

              {completedSteps.step4 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <h3 className="text-green-800 text-xl font-bold">Great Work!</h3>
                  <p className="text-green-700">
                    You've successfully identified whether these numbers are coprime!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Coprimes;