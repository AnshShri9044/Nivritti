import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Assessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/api/training/assessment');
      if (response.data.success) {
        setQuestions(response.data.data);
        setAnswers(new Array(response.data.data.length).fill(null));
      }
    } catch (error) {
      console.error('Error fetching assessment questions:', error);
      toast.error('Failed to load assessment questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.some(answer => answer === null)) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('/api/training/assessment/submit', { answers });
      if (response.data.success) {
        setResults(response.data.data);
        toast.success('Assessment submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Failed to submit assessment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Results</h1>
              <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-lg font-semibold mb-4">
                Score: {results.score}%
              </div>
              <p className="text-gray-600">
                Your financial literacy level is: <span className="font-semibold">{results.level}</span>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <p className="font-medium mb-2">{question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-md ${
                            results.answerResults[index].selectedOption === optionIndex
                              ? results.answerResults[index].isCorrect
                                ? 'bg-green-100 border border-green-300'
                                : 'bg-red-100 border border-red-300'
                              : 'bg-gray-50'
                          }`}
                        >
                          {option}
                          {results.answerResults[index].selectedOption === optionIndex && (
                            <span className="ml-2">
                              {results.answerResults[index].isCorrect ? '✓' : '✗'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/training')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
              >
                Go to Training Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Financial Literacy Assessment</h1>
            <p className="text-gray-600">
              This assessment will help us understand your current financial knowledge and recommend the right courses for you.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <div className="text-sm text-gray-500">
                {answers.filter(answer => answer !== null).length} of {questions.length} answered
              </div>
            </div>

            <div className="mb-6">
              <p className="text-lg font-medium mb-4">{questions[currentQuestion].question}</p>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-md cursor-pointer transition-colors ${
                      answers[currentQuestion] === index
                        ? 'bg-indigo-50 border-indigo-300'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(currentQuestion, index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`px-4 py-2 rounded-md ${
                  currentQuestion === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === null}
                  className={`px-4 py-2 rounded-md ${
                    answers[currentQuestion] === null
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || answers.some(answer => answer === null)}
                  className={`px-4 py-2 rounded-md ${
                    submitting || answers.some(answer => answer === null)
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {submitting ? 'Submitting...' : 'Submit Assessment'}
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-3 h-3 rounded-full ${
                  currentQuestion === index
                    ? 'bg-indigo-600'
                    : answers[index] !== null
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Assessment; 