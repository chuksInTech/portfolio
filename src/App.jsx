import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import emailjs from "@emailjs/browser";
import { FaXTwitter } from "react-icons/fa6";
import { CursorEffects } from './components/CursorEffects';
import { ScrollFadeIn, ScrollStagger } from './components/UseScrollAnimation';
import Spinner from './components/Spinner';
import AnimatedLaptop from './components/AnimatedLaptop';
import { Github, ExternalLink, Mail, Linkedin, ChevronDown, Menu, X } from 'lucide-react';

const NavLink = ({ to, children, onClick }) => (
  <ScrollLink
    to={to}
    spy={true}
    smooth={true}
    offset={-80}
    duration={1000}
    className="px-4 py-2 cursor-pointer hover:text-blue-400 transition-colors relative group"
    onClick={onClick}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
  </ScrollLink>
);

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sent, setSent] = useState(false);
  const form = useRef()

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // send email through form
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_fbkfnfd",
      "template_512eedq",
      form.current,
      "ALE4Y1nBWZXEnqRDs"
    )
      .then(
        (result) => {
          console.log(result.text);
          setSent(true);
          form.current.reset(); // clear the form
          setTimeout(() => {
            setSent(false);
          }, 2000);
        },
        (error) => {
          console.log(error.text);
        }
      );

  };

  // Simulated loading state for buttons
  const handleButtonClick = async (action) => {
    setIsLoading(true);

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Scroll to section based on action
    if (action === 'work') {
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'contact') {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }

    setIsLoading(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const projects = [
    {
      id: 5,
      title: "Movie Finder App",
      description: "A React-based application that allows users to search for movies, view details, and save favorites/watchlist. Implements modern React hooks, Authentication, movie interaction, userPreferences, profile management, context API, and responsive design.",
      tags: ["React", "API Integration", "Responsive Design", "Context API"],
      image: "./movie.png",
      github: "https://github.com/chuksInTech/react-movie-app",
      live: "https://moviefinder-psi.vercel.app/"
    },
    {
      id: 2,
      title: "Mobile Todo",
      description: "This is a simple yet dynamic To-Do List app built using Vanilla JavaScript, HTML, and CSS. It offers a clean user interface, persistent storage via localStorage, mobile touch gestures (like swipe-to-delete), and supports live editing, animations, and keyboard accessibility.",
      tags: ["Javascript", "CSS", "HTML", "Local Storage"],
      image: "./todo2.png",
      github: "https://github.com/chuksInTech/vanilla-js-todo",
      live: "http://bit.ly/42iQe16"
    },
    {
      id: 3,
      title: "AI Chatbot",
      description: "A flexible and customizable chatbot built with OpenAI's GPT models and Gradio, designed for business applications with dynamic system prompting capabilities, real-time response generation for better user experience, pre-configured for retail/sales scenarios with customizable prompts.",
      tags: ["Python", "OpenAI", "Jupyter", "Gradio"],
      image: "./chatbot.png",
      github: "https://github.com/chuksInTech/chatbot",
      // live: "https://weather.yourdomain.com"
    },
    {
      id: 4,
      title: "AI-Quiz-Generator",
      description: "An AI-powered quiz generator that creates quizzes based on user-provided topics, auto-evaluated answers with feedback, multiple-choice questions with 4 options, leveraging OpenAI's GPT-4o model for dynamic question generation and Gradio for a user-friendly interface.",
      tags: ["Python", "dotenv", "Gradio", "GPT-4o"],
      image: "./quiz.png",
      github: "https://github.com/chuksInTech/AI-Quiz-Generator",
    },
    {
      id: 1,
      title: "My Tutor",
      description: "MyTutor is a powerful, stream-based, interactive command-line AI assistant that uses both OpenAI and Ollama models to help users learn programming, academic subjects, and general knowledge effectively.",
      tags: ["Python", "GPT-4o-mini", "Ollama", "Stream"],
      image: "./my-tutor.png",
      github: "https://github.com/chuksInTech/my-tutor"
    },
    {
      id: 6,
      title: "Competitive-analyser",
      description: "A powerful Python tool that scrapes companies' websites and performs comprehensive competitive analysis using OpenAI's GPT-4 model. The tool extracts company information, compares competitors, and generates detailed reports.",
      tags: ["Python", "BeautifulSoup", "GPT-4", "Selenium"],
      image: "./competitive-analyser.png",
      github: "https://github.com/chuksInTech/competitive-analyser"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Custom cursor effect for desktop only */}
      {!isMobile && <CursorEffects />}

      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              CD.
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="home">Home</NavLink>
              <NavLink to="about">About</NavLink>
              <NavLink to="projects">Projects</NavLink>
              <NavLink to="contact">Contact</NavLink>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`md:hidden absolute w-full bg-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen
            ? 'opacity-100 translate-y-0 shadow-lg'
            : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
        >
          <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
            <NavLink to="home" onClick={closeMenu}>Home</NavLink>
            <NavLink to="about" onClick={closeMenu}>About</NavLink>
            <NavLink to="projects" onClick={closeMenu}>Projects</NavLink>
            <NavLink to="contact" onClick={closeMenu}>Contact</NavLink>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 md:px-8 pt-20 pb-8 relative overflow-hidden bg-[#050014] text-white">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-grid-pattern"></div>

        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-8 relative z-10">
          {/* Text Content */}
          <div className={`w-full lg:w-1/2 text-center lg:text-left transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} relative z-10`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text">
              Hi There 👋
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text">
              I'm <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Chukwuma Duru</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-xl mb-8 mx-auto lg:mx-0">
              Building cutting-edge AI-powered web experiences with scalable code, elegant interfaces, and seamless LLM integration.
            </p>
            <div className="flex gap-4 mb-6 flex-wrap justify-center lg:justify-start">
              <button
                className="bg-gradient-to-r from-blue-400 to-purple-400 hover:opacity-80 px-6 py-3 rounded-md transition-all font-medium shadow-md flex items-center justify-center min-w-36"
                onClick={() => handleButtonClick('work')}
                disabled={isLoading}
                aria-label="View my work"
              >
                {isLoading ? <Spinner size="small" /> : "View My Work"}
              </button>
              <button
                className="border border-blue-500 hover:bg-blue-500/10 px-6 py-3 rounded-md transition-all font-medium shadow-md flex items-center justify-center min-w-36"
                onClick={() => handleButtonClick('contact')}
                disabled={isLoading}
                aria-label="Contact me"
              >
                {isLoading ? <Spinner size="small" /> : "Contact Me"}
              </button>
            </div>
            <div className="flex gap-6 justify-center lg:justify-start">
              <a href="https://github.com/chuksInTech" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub profile">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn profile">
                <Linkedin size={24} />
              </a>
              <a href="mailto:chyootch@gmail.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Email me">
                <Mail size={24} />
              </a>
              <a href="https://x.com/chuksInTech" className="text-gray-400 hover:text-white transition-colors" aria-label="X profile">
                <FaXTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Laptop Container */}
          <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
            {/* <div className="w-full max-w-md"> */}
            <AnimatedLaptop />
            {/* </div> */}
          </div>
        </div>

        {/* Scroll Down Icon */}
        <div className="absolute bottom-6 w-full flex justify-center animate-bounce z-20">
          <ScrollLink
            to="about"
            smooth={true}
            duration={1000}
            offset={-80}
            className="cursor-pointer"
            aria-label="Scroll to About section"
          >
            <ChevronDown size={32} className="text-gray-400" />
          </ScrollLink>
        </div>

        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-xl"
              style={{
                width: `${Math.random() * 200 + 50}px`,
                height: `${Math.random() * 200 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 20 + 15}s`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.3 + 0.1,
                animation: 'floatBubble 20s infinite ease-in-out',
              }}
            />
          ))}
        </div>

        {/* Animation keyframes */}
        <style jsx>{`
          @keyframes floatBubble {
            0%, 100% { transform: translateY(0) translateX(0) scale(1); }
            25% { transform: translateY(-20px) translateX(10px) scale(1.05); }
            50% { transform: translateY(0) translateX(20px) scale(1); }
            75% { transform: translateY(20px) translateX(10px) scale(0.95); }
          }
          .bg-grid-pattern {
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}</style>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeIn direction="up" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              About <span className="text-blue-400">Me</span>
            </h2>
          </ScrollFadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn direction="right" delay={0.2}>
              <div className="bg-blue-500/10 p-1 rounded-lg rotate-3 transform hover:-rotate-3 transition-transform duration-500">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="w-full h-64 bg-gray-700 rounded-md mb-6">
                    <img src="./ai-generated.jpg" alt="Developer" className="w-full h-full object-cover rounded-md" />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300">Python</span>
                    <span className="px-3 py-1 bg-yellow-500/20 rounded-full text-sm text-yellow-300">React</span>
                    <span className="px-3 py-1 bg-pink-500/20 rounded-full text-sm text-pink-300">Jupyter</span>
                    <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300">Context API</span>
                    <span className="px-3 py-1 bg-green-500/20 rounded-full text-sm text-green-300">Router</span>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn direction="left" delay={0.3}>
              <p className="text-lg text-gray-300 mb-6">
                LLM & AI Engineer specializing in RAG, fine-tuning, and AI agents. I build production-ready language systems—from optimized retrieval to efficient model tuning—bridging research with real-world applications
              </p>
              <p className="text-lg text-gray-300 mb-8">
                My recent projects include an AI Chatbot, Quiz Generator, and My-Tutor (educational assistant). I focus on creating scalable AI solutions that push technical boundaries. </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Technologies</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li>• OpenAI/Ollama/Anthropic</li>
                    <li>• Python</li>
                    <li>• React (JavaScript)</li>
                    <li>• HTML5 / CSS3 / Tailwind</li>
                    <li>• Appwrite SDK</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">Tools</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Gradio</li>
                    <li>• Git / GitHub</li>
                    <li>• Vite</li>
                    <li>• Jupyter</li>
                    <li>• Selenium</li>
                  </ul>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 md:px-8 bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeIn direction="up" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
          </ScrollFadeIn>

          <ScrollStagger baseDelay={0.1} staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 
                hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10
                group relative perspective-1000"
                style={{
                  transformStyle: 'preserve-3d'
                }}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                <div className="relative transform transition-transform duration-500 group-hover:rotate-x-2 overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
                    style={{
                      transform: activeProject === project.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  <div className={`absolute inset-0 bg-blue-500/80 flex items-center justify-center gap-4 transition-opacity duration-300 ${activeProject === project.id ? 'opacity-100' : 'opacity-0'}`}>
                    {project.github && (
                      <a href={project.github} className="bg-gray-900 p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="View GitHub repository">
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} className="bg-gray-900 p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="View live project">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ScrollStagger>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollFadeIn direction="up" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Get In <span className="text-blue-400">Touch</span>
            </h2>
          </ScrollFadeIn>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollFadeIn direction="right" delay={0.2}>
              <p className="text-lg text-gray-300 mb-6">
                I'm currently open to freelance collaborations and full-time positions. Hit me up let me help bring your vision to life with creative solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-400" />
                  <a href="mailto:chyootch@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    chyootch@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Github className="text-blue-400" />
                  <a href="https://github.com/chuksInTech" className="text-gray-300 hover:text-white transition-colors">
                    chuksInTech
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="text-blue-400" />
                  <a href="https://linkedin.com/in/yourusername" className="text-gray-300 hover:text-white transition-colors">
                    Linkedin
                  </a>
                </div>
                <div className='flex items-center gap-4'>
                  <FaXTwitter size={24} className='text-blue-400' />
                  <a href="https://x.com/ChuksInTech" className='text-gray-300 hover:text-white transition-colors'>
                    chuksInTech
                  </a>
                </div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn direction="left" delay={0.3}>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-blue-500 focus:border-blue-500"
                      aria-label="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-md transition-colors font-medium flex items-center justify-center"
                  >
                    Send Message
                  </button>
                  {sent && (
                    <p className="text-green-600 text-center font-medium">
                      ✅ Message sent!
                    </p>
                  )}
                </form>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 ChuksInTech. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/chuksintech" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub profile">
              <Github size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn profile">
              <Linkedin size={20} />
            </a>
            <a href="contact" className="text-gray-400 hover:text-white transition-colors" aria-label="Email me">
              <Mail size={20} />
            </a>
            <a href="x.com/ChuksInTech" className="text-gray-400 hover:text-white transition-colors" aria-label="X profile">
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;