import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RefreshCw } from 'lucide-react';

const Coprimes = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
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
    const f1 = getFactors(n1);
    const f2 = getFactors(n2);
    const shared = f1.filter(f => f2.includes(f));
    const isCoprime = shared.length === 1 && shared[0] === 1;
    
    setNum1(n1);
    setNum2(n2);
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
    setShowSteps(false);
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

  React.useEffect(() => {
    generateNumbers();
  }, []);

  return (
    <div className="bg-gray-100 p-8 w-[780px] overflow-auto">
      <Card className="w-[748px] mx-auto shadow-md bg-white">
        <div className="bg-sky-50 p-6 rounded-t-lg w-[748px]">
          <h1 className="text-sky-900 text-2xl font-bold">Coprime Numbers</h1>
          <p className="text-sky-800">Learn how to identify coprime numbers!</p>
        </div>

        <CardContent className="space-y-6 pt-6 w-[748px]">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <h2 className="text-blue-900 font-bold mb-2">What are Coprime Numbers?</h2>
            <p className="text-blue-600">
              Coprime numbers are two numbers that share no common factors other than 1. 
              Coprime numbers can be prime numbers themselves, but do not have to be.
              Practice identifying coprime numbers below!
            </p>
          </div>

          <Card className="border border-gray-200">
            <CardContent className="space-y-4 pt-4 p-6">
              <h3 className="font-semibold mb-2">Examples:</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">15 and 28 are coprime because they only have 1 as a common factor</p>
                  <p className="text-sm text-gray-600">Factors of 15: 1, 3, 5, 15</p>
                  <p className="text-sm text-gray-600">Factors of 28: 1, 2, 4, 7, 14, 28</p>
                  <p className="text-sm text-green-600">Only common factor: 1</p>
                </div>
                <div>
                  <p className="font-semibold">12 and 18 are not coprime because they have common factors other than 1</p>
                  <p className="text-sm text-gray-600">Factors of 12: 1, 2, 3, 4, 6, 12</p>
                  <p className="text-sm text-gray-600">Factors of 18: 1, 2, 3, 6, 9, 18</p>
                  <p className="text-sm text-red-600">Common factors: 1, 2, 3, 6</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-purple-900 font-bold">Practice Time!</h2>
              <Button 
                onClick={generateNumbers}
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                New Numbers
              </Button>
            </div>

            <div className="text-center text-2xl mb-4">
              <span className="font-mono">Are {num1} and {num2} coprime?</span>
            </div>

            <Button 
              onClick={() => setShowSteps(true)}
              className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3"
            >
              Solve Step by Step
            </Button>

            {showSteps && (
              <div className="bg-purple-50 p-4 rounded-lg mt-4">
                <p className="mb-4">1. What are the factors of {num1}?</p>
                {completedSteps.step1 ? (
                  <p className="text-green-600 font-bold mb-6">
                    {correctAnswers.factors1.join(', ')}
                  </p>
                ) : (
                  <div className="flex items-center gap-4 mb-6">
                    <Input 
                      type="text"
                      value={userAnswers.factors1}
                      onChange={(e) => {
                        setUserAnswers(prev => ({ ...prev, factors1: e.target.value }));
                        setHasError(prev => ({ ...prev, step1: false }));
                      }}
                      placeholder="e.g., 1, 2, 3"
                      className={`flex-1 ${hasError.step1 ? 'border-red-500' : 'border-blue-300'}`}
                    />
                    <div className="flex gap-4">
                      <Button
                        onClick={() => checkAnswer(1, userAnswers.factors1)}
                        className="bg-blue-400 hover:bg-blue-500"
                      >
                        Check
                      </Button>
                      <Button
                        onClick={() => skipStep(1)}
                        className="bg-gray-400 hover:bg-gray-500 text-white"
                      >
                        Skip
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep >= 2 && (
                  <>
                    <p className="mb-4">2. What are the factors of {num2}?</p>
                    {completedSteps.step2 ? (
                      <p className="text-green-600 font-bold mb-6">
                        {correctAnswers.factors2.join(', ')}
                      </p>
                    ) : (
                      <div className="flex items-center gap-4 mb-6">
                        <Input 
                          type="text"
                          value={userAnswers.factors2}
                          onChange={(e) => {
                            setUserAnswers(prev => ({ ...prev, factors2: e.target.value }));
                            setHasError(prev => ({ ...prev, step2: false }));
                          }}
                          placeholder="e.g., 1, 2, 3"
                          className={`flex-1 ${hasError.step2 ? 'border-red-500' : 'border-blue-300'}`}
                        />
                        <div className="flex gap-4">
                          <Button
                            onClick={() => checkAnswer(2, userAnswers.factors2)}
                            className="bg-blue-400 hover:bg-blue-500"
                          >
                            Check
                          </Button>
                          <Button
                            onClick={() => skipStep(2)}
                            className="bg-gray-400 hover:bg-gray-500 text-white"
                          >
                            Skip
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {currentStep >= 3 && (
                  <>
                    <p className="mb-4">3. What factors do they share?</p>
                    {completedSteps.step3 ? (
                      <p className="text-green-600 font-bold mb-6">
                        {correctAnswers.sharedFactors.join(', ')}
                      </p>
                    ) : (
                      <div className="flex items-center gap-4 mb-6">
                        <Input 
                          type="text"
                          value={userAnswers.sharedFactors}
                          onChange={(e) => {
                            setUserAnswers(prev => ({ ...prev, sharedFactors: e.target.value }));
                            setHasError(prev => ({ ...prev, step3: false }));
                          }}
                          placeholder="e.g., 1, 2, 3"
                          className={`flex-1 ${hasError.step3 ? 'border-red-500' : 'border-blue-300'}`}
                        />
                        <div className="flex gap-4">
                          <Button
                            onClick={() => checkAnswer(3, userAnswers.sharedFactors)}
                            className="bg-blue-400 hover:bg-blue-500"
                          >
                            Check
                          </Button>
                          <Button
                            onClick={() => skipStep(3)}
                            className="bg-gray-400 hover:bg-gray-500 text-white"
                          >
                            Skip
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {currentStep >= 4 && (
                  <>
                    <p className="mb-4">4. Are these numbers coprime?</p>
                    {completedSteps.step4 ? (
                      <>
                        <p className="text-green-600 font-bold mb-6">
                          {correctAnswers.isCoprime ? 'Yes, these numbers are coprime because they only have a common factor of 1!' : 'No, these numbers are not coprime because they have a common factor other than 1!'}
                        </p>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                          <h3 className="text-green-800 text-xl font-bold">Great Work!</h3>
                          <p className="text-green-700">
                            You've successfully identified whether these numbers are coprime!
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex gap-4">
                          <Button
                            onClick={() => checkAnswer(4, true)}
                            className={`bg-blue-400 hover:bg-blue-500 w-32 ${hasError.step4 && correctAnswers.isCoprime === false ? 'border-2 border-red-500' : ''}`}
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={() => checkAnswer(4, false)}
                            className={`bg-blue-400 hover:bg-blue-500 w-32 ${hasError.step4 && correctAnswers.isCoprime === true ? 'border-2 border-red-500' : ''}`}
                          >
                            No
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-gray-600 mt-4">
        Understanding coprime numbers is essential for working with fractions and more advanced math concepts!
      </p>
    </div>
  );
};

export default Coprimes;