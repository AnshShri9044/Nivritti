import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaLightbulb, FaHandshake, FaShieldAlt, FaSeedling } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const missionPoints = [
    "Providing accessible financial services to underserved communities",
    "Creating sustainable economic growth through community initiatives",
    "Empowering individuals through financial education and literacy",
    "Building strong, resilient communities through collaborative efforts"
  ];

  const values = [
    { 
      title: 'Financial Inclusion',
      description: 'Breaking barriers to make financial services accessible to everyone, regardless of their background.',
      icon: <FaUsers className="text-4xl" />
    },
    { 
      title: 'Innovation First',
      description: 'Leveraging cutting-edge technology to create solutions that address real community needs.',
      icon: <FaLightbulb className="text-4xl" />
    },
    { 
      title: 'Community Empowerment',
      description: 'Building platforms that enable communities to grow and prosper together.',
      icon: <FaHandshake className="text-4xl" />
    },
    { 
      title: 'Sustainable Impact',
      description: 'Creating lasting positive change through responsible and sustainable practices.',
      icon: <FaSeedling className="text-4xl" />
    }
  ];

  const team = [
    { 
      name: 'SHWETA SRIVASTAVA',
      role: 'CEO & Founder',
      image: '/team/avira.jpg',
      bio: 'Passionate about financial inclusion and community development.'
    },
    { 
      name: 'ANSH SHRIVASTAV',
      role: 'Chief Technology Officer',
      image: '/team/avanish.jpg',
      bio: 'Tech innovator with 15+ years in fintech solutions.'
    },
    { 
      name: 'Ayansh Yadav',
      role: 'Head of Community',
      image: '/team/ayansh.jpg',
      bio: 'Expert in community engagement and program development.'
    },
    { 
      name: 'Ayush Singh',
      role: 'Financial Director',
      image: '/team/ayush.jpg',
      bio: 'Seasoned financial expert focused on sustainable growth.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7edd4]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-[#f7edd4] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
              About <span className="bg-gradient-to-r from-[#b4d9a3] via-[#b28071] to-[#b4d9a3] bg-clip-text text-transparent">Nivritti</span>
            </h1>
            <p className="text-lg text-[#34495e] max-w-3xl mx-auto">
              We are dedicated to empowering communities through sustainable development and financial inclusion.
            </p>
          </motion.div>
        </div>
      </section>
        
          {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Our Mission</h2>
              <p className="text-lg text-[#34495e] mb-6">
                To create sustainable impact in communities by providing accessible financial services,
                education, and opportunities for growth.
              </p>
              <ul className="space-y-4">
                {missionPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <span className="text-[#b4d9a3] mr-3">•</span>
                    <span className="text-[#34495e]">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-[#b4d9a3]/10 rounded-lg p-8 h-full flex items-center justify-center">
                <FaChartLine className="text-[#b4d9a3] text-8xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#f7edd4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Our Team</h2>
            <p className="text-lg text-[#34495e] max-w-2xl mx-auto">
              Meet the passionate individuals driving our mission forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card card-hover"
              >
                <div className="w-32 h-32 rounded-full bg-[#b4d9a3]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#b4d9a3] text-4xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{member.name}</h3>
                <p className="text-[#b4d9a3] mb-2">{member.role}</p>
                <p className="text-[#34495e]">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Our Values</h2>
            <p className="text-lg text-[#34495e] max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card card-hover"
              >
                <div className="text-[#b4d9a3] text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{value.title}</h3>
                <p className="text-[#34495e]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#b4d9a3] to-[#b28071]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of the change you want to see in the world.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-[#b4d9a3] px-8 py-3 rounded-lg font-medium hover:bg-[#f7edd4] transition-colors duration-200"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
      </div>
  );
};

export default About; 