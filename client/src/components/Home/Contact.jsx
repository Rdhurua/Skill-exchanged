import React, { useState } from 'react';
import Header from './Header';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    // TODO: Send data to backend or email service
    console.log('Query Submitted:', formData);

    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-8 px-4">
        <h1 className="text-2xl font-semibold text-center text-purple-600 mb-6">
          Have a question? Ask us directly!
        </h1>

        {success && (
          <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded mb-4">
            Your message has been sent!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white  rounded-lg p-6">
          <div>
            <label className="block text-sm font-medium">Name<span className='text-red-400 text-md'>*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message *</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
