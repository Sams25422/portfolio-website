import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0;
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-bg);
  z-index: -1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(243, 156, 18, 0.2), transparent 50%);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at bottom left, rgba(211, 84, 0, 0.1), transparent 50%);
  }
`;

const GridLines = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  opacity: 0.4;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  
  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 3rem;
  }
`;

const HeroText = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 992px) {
    max-width: 100%;
    order: 2;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  span {
    display: block;
    color: var(--light-text);
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--light-text);
  opacity: 0.9;
  line-height: 1.6;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PrimaryButtonLink = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SecondaryButtonLink = styled(Link)`
  background-color: transparent;
  color: var(--light-text);
  border: 2px solid var(--primary-color);
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const MotionPrimaryButton = motion(PrimaryButtonLink);
const MotionSecondaryButton = motion(SecondaryButtonLink);

const HeroImage = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 992px) {
    max-width: 100%;
    order: 1;
  }
`;

const ImageFrame = styled(motion.div)`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--primary-color);
    box-sizing: border-box;
    border-radius: 10px;
    opacity: 0.5;
  }
  
  @media (max-width: 992px) {
    width: 300px;
    height: 300px;
  }
  
  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: 'var(--dark-surface)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--primary-color)',
  fontSize: '1.5rem',
  textAlign: 'center',
  padding: '1rem'
};

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const ScrollText = styled.span`
  color: var(--light-text);
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid var(--light-text);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  
  &:before {
    content: '';
    width: 4px;
    height: 10px;
    background-color: var(--primary-color);
    border-radius: 2px;
    margin-top: 10px;
  }
`;

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut" 
    } 
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut",
      delay: 0.4 
    } 
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut" 
    } 
  }
};

const scrollVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 1,
      ease: "easeOut",
      delay: 1.2,
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.5
    } 
  }
};

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <HeroSection>
      <HeroBackground />
      <GridLines />
      
      <HeroContent>
        <HeroText>
          <HeroTitle
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            Samuel Simkin
            <span>Electrical Engineer</span>
          </HeroTitle>
          
          <HeroSubtitle
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Creating innovative solutions through hardware design and software integration. Passionate about developing cutting-edge electronic systems and devices.
          </HeroSubtitle>
          
          <HeroButtons
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <MotionPrimaryButton 
              to="/projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </MotionPrimaryButton>
            
            <MotionSecondaryButton 
              to="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </MotionSecondaryButton>
          </HeroButtons>
        </HeroText>
        
        <HeroImage
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <ImageFrame
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ duration: 0.3 }}
          >
            <HeroImg 
              src="/Mifoto.jpg" 
              alt="Samuel Simkin"
            />
          </ImageFrame>
        </HeroImage>
      </HeroContent>
      
      <ScrollIndicator
        onClick={scrollToProjects}
        variants={scrollVariants}
        initial="initial"
        animate="animate"
      >
        <ScrollText>Scroll Down</ScrollText>
        <ScrollIcon />
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero; 