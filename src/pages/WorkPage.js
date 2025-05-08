import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WorkExperience from '../components/sections/WorkExperience';

const PageHeader = styled.div`
  padding: 8rem 0 3rem 0;
  text-align: center;
  background-color: var(--dark-bg);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(243, 156, 18, 0.1), transparent 70%);
    z-index: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 30px 30px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    z-index: 0;
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageDescription = styled(motion.p)`
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  color: var(--light-text);
  opacity: 0.9;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    } 
  }
};

const WorkPage = () => {
  return (
    <>
      <PageHeader>
        <PageTitle
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Work Experience
        </PageTitle>
        <PageDescription
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          A detailed overview of my professional journey in electrical engineering, showcasing my roles, responsibilities, and achievements.
        </PageDescription>
      </PageHeader>
      
      <WorkExperience />
    </>
  );
};

export default WorkPage; 