import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CommunitySavings = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const [savingsGroups, setSavingsGroups] = useState([
    {
      id: 1,
      name: 'Women Entrepreneurs Group',
      totalMembers: 15,
      monthlyContribution: 1000,
      totalPool: 15000,
      nextMeeting: '2024-05-15',
      status: 'active',
    },
    {
      id: 2,
      name: 'Local Business Owners',
      totalMembers: 20,
      monthlyContribution: 2000,
      totalPool: 40000,
      nextMeeting: '2024-05-20',
      status: 'active',
    },
    {
      id: 3,
      name: 'Student Support Group',
      totalMembers: 10,
      monthlyContribution: 500,
      totalPool: 5000,
      nextMeeting: '2024-05-25',
      status: 'active',
    },
  ]);

  useEffect(() => {
    gsap.from('.savings-card', {
      scrollTrigger: {
        trigger: '.savings-card',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    });
  }, []);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    // Handle group creation
    alert('Savings group created successfully!');
  };

  const handleJoinGroup = (groupId) => {
    // Handle joining a group
    alert(`Joining group ${groupId}`);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Community Savings</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'groups'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('groups')}
          >
            Savings Groups
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'create'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('create')}
          >
            Create Group
          </button>
        </div>

        {/* Create Group Form */}
        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create a Savings Group</h2>
            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter group name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Monthly Contribution (₹)
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meeting Frequency
                </label>
                <select className="input" required>
                  <option value="">Select frequency</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Create Group
              </button>
            </form>
          </div>
        )}

        {/* Savings Groups List */}
        {activeTab === 'groups' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savingsGroups.map((group) => (
                <div
                  key={group.id}
                  className="savings-card card hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{group.name}</h3>
                      <p className="text-gray-600">
                        {group.totalMembers} members
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        group.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {group.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Monthly Contribution: ₹{group.monthlyContribution}</p>
                    <p>Total Pool: ₹{group.totalPool}</p>
                    <p>Next Meeting: {group.nextMeeting}</p>
                  </div>
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className="btn btn-primary w-full mt-4"
                  >
                    Join Group
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitySavings; 