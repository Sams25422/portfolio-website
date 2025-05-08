import React from 'react';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import WorkExperience from '../components/sections/WorkExperience';
import Contact from '../components/sections/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <WorkExperience />
      <Projects />
      <Contact />
    </>
  );
};

export default HomePage; 