import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactSection = styled.section`
  padding: 5rem 0;
  background-color: var(--dark-bg);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(243, 156, 18, 0.1), transparent 60%);
    z-index: 0;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.03;
  background-size: 30px 30px;
  background-image: 
    linear-gradient(to right, white 1px, transparent 1px),
    linear-gradient(to bottom, white 1px, transparent 1px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 1rem;
  font-size: 3rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem auto;
  color: var(--light-text);
  font-size: 1.5rem;
  opacity: 0.9;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const InfoTitle = styled.h3`
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background-color: var(--primary-color);
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const InfoContent = styled.div`
  font-size: 1.6rem;
  color: var(--light-text);
  line-height: 1.6;
  
  a {
    color: var(--light-text);
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

// Animation variants
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      delay: custom * 0.1,
      ease: "easeOut" 
    } 
  })
};

const Contact = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <ContactSection id="contact">
      <Background />
      
      <Container>
        <div ref={titleRef}>
          <SectionTitle
            variants={titleVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
          >
            Get In Touch
          </SectionTitle>
          
          <SectionSubtitle
            variants={titleVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            Feel free to contact me!
          </SectionSubtitle>
        </div>
        
        <ContactInfo ref={contentRef}>
          <InfoItem
            as={motion.div}
            variants={itemVariants}
            custom={0}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
          >
            <InfoTitle>Email</InfoTitle>
            <InfoContent>
              <a href="mailto:simkinsamuel@gmail.com">simkinsamuel@gmail.com</a>
            </InfoContent>
          </InfoItem>
          
          <InfoItem
            as={motion.div}
            variants={itemVariants}
            custom={1}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
          >
            <InfoTitle>Phone</InfoTitle>
            <InfoContent>
              <a href="tel:+17868162220">(786) 816-2220</a>
            </InfoContent>
          </InfoItem>
        </ContactInfo>
      </Container>
    </ContactSection>
  );
};

export default Contact; 