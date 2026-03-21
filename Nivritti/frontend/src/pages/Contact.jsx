import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data.success) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      content: '123 Community Street, Financial District, City - 123456'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      content: '+91 123 456 7890'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'contact@nivritti.com'
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM'
    }
  ];

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
              Get in <span className="bg-gradient-to-r from-[#b4d9a3] via-[#b28071] to-[#b4d9a3] bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg text-[#34495e] max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card card-hover text-center"
              >
                <div className="text-[#b4d9a3] text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-semibold text-[#2c3e50] mb-2">{info.title}</h3>
                <p className="text-[#34495e]">{info.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-[#f7edd4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#2c3e50] mb-6">Send us a Message</h2>
              <p className="text-lg text-[#34495e] mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[#2c3e50] font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#2c3e50] font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[#2c3e50] font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#2c3e50] font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="input"
                    placeholder="Your message here..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-[#b4d9a3]/10 rounded-lg p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <FaEnvelope className="text-[#b4d9a3] text-8xl mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-[#2c3e50] mb-4">
                    We're Here to Help
                  </h3>
                  <p className="text-[#34495e] mb-6">
                    Have questions about our services? Need assistance with your account?
                    Our team is ready to help you.
                  </p>
                  <div className="space-y-4">
                    <p className="text-[#b4d9a3] font-medium">
                      <FaClock className="inline mr-2" />
                      Response Time: Within 24 hours
                    </p>
                    <p className="text-[#b4d9a3] font-medium">
                      <FaEnvelope className="inline mr-2" />
                      support@nivritti.com
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#2c3e50] mb-4">Find Us</h2>
            <p className="text-lg text-[#34495e] max-w-2xl mx-auto">
              Visit our office or reach out to us through any of our contact channels.
            </p>
          </motion.div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0139258348747!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzE3LjgiTiA3N8KwMzUnNDAuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Office Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 