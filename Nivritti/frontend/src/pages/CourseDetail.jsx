import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../config/axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaPlay, FaCheck, FaLock, FaQuestionCircle, FaTrophy } from 'react-icons/fa';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('lessons');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(`/api/training/courses/${id}`);
      if (response.data.success) {
        setCourse(response.data.data);
        
        // Set current lesson if course is in progress
        if (response.data.data.userProgress?.started) {
          setCurrentLesson(response.data.data.userProgress.currentLesson);
        }
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleStartCourse = async () => {
    try {
      const response = await axios.post(`/api/training/courses/${id}/start`);
      if (response.data.success) {
        setCourse(response.data.data.course);
        toast.success('Course started successfully!');
      }
    } catch (error) {
      console.error('Error starting course:', error);
      toast.error('Failed to start course');
    }
  };

  const handleLessonComplete = async (lessonIndex) => {
    try {
      const response = await axios.post(`/api/training/courses/${id}/lessons/${lessonIndex}/complete`);
      if (response.data.success) {
        setCourse(response.data.data.course);
        toast.success('Lesson completed!');
        
        // If all lessons are completed, show quiz
        if (response.data.data.allLessonsCompleted) {
          setShowQuiz(true);
        }
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast.error('Failed to complete lesson');
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const handleQuizSubmit = async () => {
    // Check if all questions are answered
    if (quizAnswers.some(answer => answer === undefined)) {
      toast.error('Please answer all questions before submitting');
      return;
    }

    try {
      const response = await axios.post(`/api/training/courses/${id}/quizzes/0/submit`, {
        answers: quizAnswers
      });
      
      if (response.data.success) {
        setQuizResults(response.data.data);
        setQuizSubmitted(true);
        toast.success('Quiz submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <button
            onClick={() => navigate('/training')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Training
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {course.level}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {course.duration} min
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
            </div>
            {!course.userProgress?.started ? (
              <button
                onClick={handleStartCourse}
                className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
              >
                Start Course
              </button>
            ) : (
              <div className="mt-4 md:mt-0">
                <div className="text-sm text-gray-600 mb-2">Progress</div>
                <div className="w-64 bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${(course.userProgress.completedLessons.length / course.lessons.length) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {course.userProgress.completedLessons.length} of {course.lessons.length} lessons completed
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Course Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'lessons'
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('lessons')}
                >
                  Lessons
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === 'quizzes'
                      ? 'border-b-2 border-indigo-600 text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('quizzes')}
                >
                  Quizzes
                </button>
              </div>

              {activeTab === 'lessons' ? (
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => {
                    const isCompleted = course.userProgress?.completedLessons.includes(index);
                    const isCurrent = index === currentLesson;
                    const isLocked = !course.userProgress?.started || index > currentLesson;

                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-md cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-50 border border-indigo-300'
                            : isCompleted
                            ? 'bg-green-50 border border-green-300'
                            : isLocked
                            ? 'bg-gray-50 border border-gray-300 cursor-not-allowed'
                            : 'hover:bg-gray-50 border border-gray-200'
                        }`}
                        onClick={() => !isLocked && setCurrentLesson(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {isCompleted ? (
                              <FaCheck className="text-green-500 mr-2" />
                            ) : isLocked ? (
                              <FaLock className="text-gray-400 mr-2" />
                            ) : (
                              <FaPlay className="text-indigo-500 mr-2" />
                            )}
                            <span className={isLocked ? 'text-gray-500' : ''}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">{lesson.duration} min</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {course.quizzes.map((quiz, index) => {
                    const isCompleted = course.userProgress?.quizResults.some(
                      q => q.quiz.toString() === quiz._id.toString()
                    );

                    return (
                      <div
                        key={index}
                        className={`p-3 rounded-md cursor-pointer ${
                          isCompleted
                            ? 'bg-green-50 border border-green-300'
                            : 'hover:bg-gray-50 border border-gray-200'
                        }`}
                        onClick={() => setShowQuiz(true)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {isCompleted ? (
                              <FaTrophy className="text-green-500 mr-2" />
                            ) : (
                              <FaQuestionCircle className="text-indigo-500 mr-2" />
                            )}
                            <span>{quiz.title}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            {quiz.questions.length} questions
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {showQuiz ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {course.quizzes[0].title}
                </h2>
                <p className="text-gray-600 mb-6">{course.quizzes[0].description}</p>

                {quizSubmitted ? (
                  <div>
                    <div className="text-center mb-6">
                      <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-lg font-semibold mb-4">
                        Score: {quizResults.score}%
                      </div>
                      <p className="text-gray-600">
                        {quizResults.passed
                          ? 'Congratulations! You passed the quiz.'
                          : 'You need to score at least 70% to pass. Try again!'}
                      </p>
                    </div>

                    <div className="space-y-6">
                      {course.quizzes[0].questions.map((question, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <p className="font-medium mb-2">{question.question}</p>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-md ${
                                  quizResults.answerResults[index].selectedOption === optionIndex
                                    ? quizResults.answerResults[index].isCorrect
                                      ? 'bg-green-100 border border-green-300'
                                      : 'bg-red-100 border border-red-300'
                                    : 'bg-gray-50'
                                }`}
                              >
                                {option}
                                {quizResults.answerResults[index].selectedOption === optionIndex && (
                                  <span className="ml-2">
                                    {quizResults.answerResults[index].isCorrect ? '✓' : '✗'}
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                          {!quizResults.answerResults[index].isCorrect && (
                            <div className="mt-2 text-sm text-gray-600">
                              <span className="font-medium">Explanation:</span> {question.explanation}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      {quizResults.passed ? (
                        <button
                          onClick={() => navigate('/training')}
                          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
                        >
                          Back to Training Dashboard
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setQuizSubmitted(false);
                            setQuizAnswers([]);
                          }}
                          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-6">
                      {course.quizzes[0].questions.map((question, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <p className="font-medium mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-md cursor-pointer ${
                                  quizAnswers[index] === optionIndex
                                    ? 'bg-indigo-50 border border-indigo-300'
                                    : 'hover:bg-gray-50 border border-gray-200'
                                }`}
                                onClick={() => handleQuizAnswer(index, optionIndex)}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        onClick={handleQuizSubmit}
                        disabled={quizAnswers.some(answer => answer === undefined)}
                        className={`px-6 py-3 rounded-md ${
                          quizAnswers.some(answer => answer === undefined)
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        Submit Quiz
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                {course.userProgress?.started ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {course.lessons[currentLesson].title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {course.lessons[currentLesson].description}
                    </p>

                    <div className="aspect-w-16 aspect-h-9 mb-6">
                      <iframe
                        src={course.lessons[currentLesson].videoUrl}
                        title={course.lessons[currentLesson].title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                      ></iframe>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button
                        onClick={() => setCurrentLesson(currentLesson - 1)}
                        disabled={currentLesson === 0}
                        className={`px-4 py-2 rounded-md ${
                          currentLesson === 0
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Previous Lesson
                      </button>
                      <button
                        onClick={() => handleLessonComplete(currentLesson)}
                        disabled={course.userProgress.completedLessons.includes(currentLesson)}
                        className={`px-4 py-2 rounded-md ${
                          course.userProgress.completedLessons.includes(currentLesson)
                            ? 'bg-green-200 text-green-700 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {course.userProgress.completedLessons.includes(currentLesson)
                          ? 'Completed'
                          : 'Mark as Complete'}
                      </button>
                      <button
                        onClick={() => setCurrentLesson(currentLesson + 1)}
                        disabled={currentLesson === course.lessons.length - 1}
                        className={`px-4 py-2 rounded-md ${
                          currentLesson === course.lessons.length - 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Next Lesson
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Start the course to view lessons
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Click the "Start Course" button to begin learning.
                    </p>
                    <button
                      onClick={handleStartCourse}
                      className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
                    >
                      Start Course
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 