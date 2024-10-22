import React from 'react';
import { FaReact, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiVite  } from 'react-icons/si';
import ToxIcon from './tox.png';

const About: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p>Welcome to our Image and Video Summary Tool! Our goal is to provide an efficient solution for users looking to quickly understand the content of their media.</p>
      <h3 className="text-xl font-semibold mt-4">What We Do</h3>
      <p>In an era where visual content dominates, we recognize the need for quick comprehension. Our platform allows users to upload images and videos effortlessly. Leveraging the power of the Florence-2 model from Hugging Face, we generate concise and meaningful text summaries that encapsulate the essence of your media.</p>
      <h3 className="text-xl font-semibold mt-4">How It Works</h3>
      <ul className="list-disc pl-5">
        <li>Upload Your Media: Use our intuitive interface to upload your images or videos.</li>
        <li>Smart Processing: Our advanced AI analyzes your content in real-time, identifying key elements and themes.</li>
        <li>Instant Summary: Within moments, you will receive a succinct text summary, helping you grasp the main ideas without having to view the entire media.</li>
      </ul>
      <h3 className="text-xl font-semibold mt-4">Why Choose Us?</h3>
      <ul className="list-disc pl-5">
        <li>Advanced AI Technology: Powered by the state-of-the-art Florence-2 model, we ensure accurate and relevant summaries.</li>
        <li>User-Friendly Interface: Designed with simplicity in mind, our tool is accessible to everyone, regardless of technical skills.</li>
        <li>Time-Saving Solution: Get quick insights from your media, allowing you to focus on what truly matters.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-4 text-center">Technique and language</h2>
      <p>
        <div className="flex justify-center space-x-8 text-xl">
            <div className="flex items-center">
                <SiTailwindcss className="text-2xl" />
                <span className="ml-2">Tailwind CSS</span>
            </div>
            <div className="flex items-center">
                <FaReact className="text-2xl" />
                <span className="ml-2">React</span>
            </div>
            <div className="flex items-center">
                <FaPython className="text-2xl" />
                <span className="ml-2">Python</span>
            </div>
            <div className="flex items-center">
                <img src={ToxIcon} alt="Tox" className="text-2xl" />
                <span className="ml-2">Tox</span>
            </div>
            <div className="flex items-center">
                <SiTypescript className="text-2xl" />
                <span className="ml-2">TypeScript</span>
            </div>
            <div className="flex items-center">
                <SiVite className="text-2xl" />
                <span className="ml-2">Vite</span>
            </div>
        </div>
      </p>
    </div>
  );
};

export default About;
