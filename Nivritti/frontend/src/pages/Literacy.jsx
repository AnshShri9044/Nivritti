import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Literacy = () => {
  const [language, setLanguage] = useState('english');
  const [progress, setProgress] = useState(45); // Example progress percentage

  const courses = [
    {
      id: 1,
      title: 'Basic Financial Concepts',
      description: 'Learn about savings, budgeting, and basic banking.',
      duration: '30 mins',
      level: 'Beginner',
      completed: true,
    },
    {
      id: 2,
      title: 'Understanding Loans',
      description: 'Everything you need to know about borrowing money responsibly.',
      duration: '45 mins',
      level: 'Intermediate',
      completed: true,
    },
    {
      id: 3,
      title: 'Investment Basics',
      description: 'Introduction to different investment options and risk management.',
      duration: '60 mins',
      level: 'Advanced',
      completed: false,
    },
    {
      id: 4,
      title: 'Digital Banking',
      description: 'Learn how to use digital banking services safely and effectively.',
      duration: '40 mins',
      level: 'Intermediate',
      completed: false,
    },
  ];

  useEffect(() => {
    gsap.from('.course-card', {
      scrollTrigger: {
        trigger: '.course-card',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    });
  }, []);

  const handleStartCourse = (courseId) => {
    // Handle starting a course
    alert(`Starting course ${courseId}`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Financial Literacy</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input text-sm"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
            </select>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Learning Progress</h2>
          <div className="flex items-center space-x-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-primary-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progress}% of courses completed
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-card card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p className="text-gray-600 mt-2">{course.description}</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Duration: {course.duration}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      course.level === 'Beginner'
                        ? 'bg-green-100 text-green-800'
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {course.level}
                  </span>
                </div>
                {course.completed && (
                  <div className="flex items-center text-green-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Completed
                  </div>
                )}
              </div>
              <button
                onClick={() => handleStartCourse(course.id)}
                className={`btn w-full mt-4 ${
                  course.completed
                    ? 'btn-secondary'
                    : 'btn-primary'
                }`}
              >
                {course.completed ? 'Review Course' : 'Start Course'}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Video Tutorials</h3>
              <p className="text-gray-600 mb-4">
                Watch step-by-step video guides on various financial topics.
              </p>
              <button className="btn btn-primary">Watch Videos</button>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Interactive Quizzes</h3>
              <p className="text-gray-600 mb-4">
                Test your knowledge with interactive quizzes and track your progress.
              </p>
              <button className="btn btn-primary">Take Quiz</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Literacy; 