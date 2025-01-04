import './App.css';
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); //for animation
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [infoModalOpen, setInfoModalOpen] = useState(false); //for info modal visibility
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false); // for info modal animation
  const [currentWebsite, setCurrentWebsite] = useState(null); //tracks which website button was clicked

  const websiteInfo = {
    "PreprLabs Mockup": {
      description: "I created a mockup website for PreprLabs as part of my journey to acquire employability skills through Prepr's Flexible Upskilling Network (F.U.N.) program. Users can create new projects on this interactive platform, which also has dynamic content tabs for smooth navigation and dropdown menus that are easy to use. Constructed using contemporary web technologies like HTML, CSS, and JavaScript, I made use of GitHub for version control and React for its effective component-based architecture. Because it is hosted on GitHub Pages, the project is available for collaboration and demonstration. My technical abilities were improved by this practical experience, which complemented the program's objectives of encouraging creativity and preparedness for the workforce. ",
      url: "https://ryanacham.github.io/Frontend-Developer-Challenge-3-Dashboard-and-Project-Creation/",
      github: "https://github.com/RyanAcham/Frontend-Developer-Challenge-3-Dashboard-and-Project-Creation?tab=readme-ov-file",
      tech: "Javascript, CSS, HTML, React, GitHub",
      imageUrl: "https://via.placeholder.com/150/FF0000",
    },
    "Star Wars Database": {
      description: "As the CSS/Tailwind developer for our Star Wars Database project, I was instrumental in creating and putting into use a responsive and aesthetically pleasing user interface. Utilizing a variety of APIs, the website—which was constructed with JavaScript, HTML, CSS, React, and jQuery—offers dynamic access to information about individuals, species, and planets from the Star Wars universe. In a matter of days, I became proficient with Tailwind, utilizing its utility-first architecture to effectively style elements and smoothly integrate functions such as lightmode and darkmode. This project was centered around teamwork; I worked closely with the team to support the integration of a dynamic search system, deploy the site on GitHub Pages, and ensure consistent styling. ",
      url: "https://suedepritch.github.io/crispy-spork/",
      github: "https://github.com/SuedePritch/crispy-spork?tab=readme-ov-file",
      tech: "Javascript, HTML, CSS, React, Tailwind, jQuery, Various APIs, GitHub",
      imageUrl: "https://via.placeholder.com/150/00FF00",
    },
    "Weather Report": {
      description: "In this sideproject, I used HTML, CSS, and JavaScript to create a basic weather application with a responsive and slick user interface. Depending on the city typed into the search bar, the app displays important metrics like temperature, humidity, wind speed, and feels-like temperature by integrating with a weather API to retrieve real-time weather data. This project is a clear illustration of how I can combine clean front-end development techniques with dynamic APIs to create useful, user-friendly applications. ",
      url: "https://ryanacham.github.io/Weather-Report/",
      github: "https://github.com/RyanAcham/Weather-Report/tree/main",
      tech: "Javascript, CSS, HTML, Weather API, GitHub",
      imageUrl: "https://via.placeholder.com/150/0000FF",
    },
    "Coding Quiz": {
      description: "This website is an interactive coding test that uses HTML, CSS, and JavaScript to provide an enjoyable user experience. To add challenge, the quiz has a countdown timer that subtracts time for each wrong response. The logic for monitoring, adjusting the timer, and controlling the user's progress through the questions is handled by JavaScript. CSS is used to style the front-end for a responsive and clean that makes the quiz look great on all devices. The website also uses local storage to keep scores between sessions and saves high scores so users can compete with others. Through interactive features, this project keeps users interested while providing a real-world application of front-end and back-end skills.",
      url: "https://ryanacham.github.io/Coding-Quiz-Mark-II/",
      github: "https://github.com/RyanAcham/Coding-Quiz-Mark-II",
      tech: "Javascript, CSS, HTML, GitHub",
      imageUrl: "https://via.placeholder.com/150/FFFFFF",
    }
  };

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

  const toggleInfoModal = (website) => {
    setCurrentWebsite(website);
    setInfoModalOpen(!infoModalOpen);
    if (infoModalOpen) {
      setIsInfoModalVisible(false); //start closing animation
      setTimeout(() => setInfoModalOpen(false), 10); //complete closing animation
    } else {
      setInfoModalOpen(true);
      setTimeout(() => setIsInfoModalVisible(true), 10); //start opening animation
    }
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
    <div className="bg-white dark:bg-black">
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-8xl font-bold text-black dark:text-white">Ryan Acham</h1>
        <h2 className="text-4xl text-black dark:text-white">Full Stack Developer</h2>

        <button onClick={toggleModal} className="px-6 py-3 text-blue-500 border-2 border-blue-500 rounded-full bg-white hover:bg-blue-100 focus:outline-none">
          Contact Me
        </button>

        {/*Form Modal*/}
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
        <hr class="absolute bottom-0 w-full max-w-[1110px] h-[3px] bg-black" />
      </div>
      <section>
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-6xl font-bold text-black dark:text-white pt-4">Portfolio</h3>

          {/* Portfolio Buttons */}
          <ul className="flex flex-wrap justify-center items-center gap-4">
            {Object.entries(websiteInfo).map(([website, info]) => (
              <li key={website} className="flex flex-col items-center">
                <button onClick={() => toggleInfoModal(website)} className="text-center">
                  <img src={info.imageUrl} alt={website} className="mb-2" />
                  <span className="text-lg text-black dark:text-white">{website}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/*info modal */}
        {infoModalOpen && currentWebsite && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 ${
                isInfoModalVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } max-w-[600px] w-full`}
            >
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                Information about {currentWebsite}
              </h2>
              <p className="text-black dark:text-white">
                {websiteInfo[currentWebsite].description}
              </p>
              <p className="text-black dark:text-white mt-2">
                Live Site:{" "}
                <a
                  href={websiteInfo[currentWebsite].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {websiteInfo[currentWebsite].url}
                </a>
              </p>
              <p className="text-black dark:text-white mt-2">
                Github:{" "}
                <a
                  href={websiteInfo[currentWebsite].github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {websiteInfo[currentWebsite].github}
                </a>
              </p>
              <p className="text-black dark:text-white mt-2">
                Technology Used:{" "}
                  {websiteInfo[currentWebsite].tech}
              </p>
              <button
                onClick={() => setInfoModalOpen(false)}
                className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

