import React from "react";
import { FaReact, FaPython } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import ToxIcon from "./tox.png";

const About: React.FC = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        About Us
      </h2>
      <p className="text-justify leading-relaxed">
        Welcome to our Image and Video Summary Tool! Our goal is to provide an
        efficient solution for users looking to quickly understand the content
        of their media.
      </p>

      <h3 className="text-xl md:text-2xl font-semibold mt-6">What We Do</h3>
      <p className="text-justify leading-relaxed">
        In an era where visual content dominates, we recognize the need for
        quick comprehension. Our platform allows users to upload images and
        videos effortlessly. Leveraging the power of the
        <span className="px-1">
          <a
            className="text-indigo-600 underline underline-offset-2 font-semibold hover:text-indigo-500"
            href="https://huggingface.co/microsoft/Florence-2-large"
          >
            Florence-2 model
          </a>
        </span>
        and
        <span className="px-1">
          <a
            className="text-indigo-600 font-semibold underline underline-offset-2 hover:text-indigo-500"
            href="https://huggingface.co/facebook/bart-large-cnn"
          >
            Bart-large-cnn model
          </a>
        </span>
        from Hugging Face, we generate concise and meaningful text summaries
        that encapsulate the essence of your media.
      </p>

      <h3 className="text-xl md:text-2xl font-semibold mt-6">How It Works</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Upload Your Media:</strong> Use our intuitive interface to
          upload your images or videos.
        </li>
        <li>
          <strong>Smart Processing:</strong> Our advanced AI analyzes your
          content in real-time, identifying key elements and themes.
        </li>
        <li>
          <strong>Instant Summary:</strong> Receive a succinct text summary
          within moments, helping you grasp the main ideas.
        </li>
      </ul>

      <h3 className="text-xl md:text-2xl font-semibold mt-6">Why Choose Us?</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Advanced AI Technology:</strong> Powered by the
          state-of-the-art Florence-2 model, we ensure accurate and relevant
          summaries.
        </li>
        <li>
          <strong>User-Friendly Interface:</strong> Accessible to everyone,
          regardless of technical skills.
        </li>
        <li>
          <strong>Time-Saving Solution:</strong> Get quick insights from your
          media and focus on what matters.
        </li>
      </ul>

      <h2 className="text-xl md:text-2xl font-semibold mt-6 text-center">
        Technique and Language
      </h2>
      <div className="flex flex-wrap justify-center space-x-4 space-y-4 text-xl mt-4">
        <div className="flex items-center space-x-2">
          <SiTailwindcss className="text-2xl" />
          <span>Tailwind CSS</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaReact className="text-2xl" />
          <span>React</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaPython className="text-2xl" />
          <span>Python</span>
        </div>
        <div className="flex items-center space-x-2">
          <img src={ToxIcon} alt="Tox" className="w-8 h-8" />
          <span>Tox</span>
        </div>
        <div className="flex items-center space-x-2">
          <SiTypescript className="text-2xl" />
          <span>TypeScript</span>
        </div>
        <div className="flex items-center space-x-2">
          <SiVite className="text-2xl" />
          <span>Vite</span>
        </div>
      </div>
    </div>
  );
};

export default About;
