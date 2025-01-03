import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); //for animation
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalVisible(false); //start closing animation
      setTimeout(() => setIsModalOpen(false), 10); //close modal after animation
    } else {
      setIsModalOpen(true);
      setTimeout(() => setIsModalVisible(true), 10); //start opening animation
    }
    setErrors({});
    setFormData({ name: "", email: "", message: "" });//reset the form
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.message) newErrors.message = "Message is required.";
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    emailjs
      .send(
        "service_ubbgn5q",
        "template_tkb9yzu",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "Pvywoaju9oS5ZyaQT"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Message sent!");
          toggleModal();
        },
        (error) => {
          console.error("Failed to send email.", error);
          alert("Failed to send message.");
        }
      );
  };
  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-black">
        <h1 className="text-8xl font-bold text-black dark:text-white">Ryan Acham</h1>
        <h2 className="text-4xl text-black dark:text-white">Full Stack Developer</h2>

        <button onClick={toggleModal} className="px-6 py-3 text-blue-500 border-2 border-blue-500 rounded-full bg-white hover:bg-blue-100 focus:outline-none">
          Contact Me
        </button>

        {/*Form Modal*/}
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div
          className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
            isModalVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Contact Form
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-black dark:text-white mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-black dark:text-white mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-black dark:text-white mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message"
                  rows="4"
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Submit
                </button>
               </div>
             </form>
           </div>
         </div>
        )}
      </div>
      
    </div>
  );
}

