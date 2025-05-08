import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: var(--dark-surface);
  padding: 3rem 0;
  margin-top: 2rem;
  box-shadow: 0px -5px 15px rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
`;

const FooterSection = styled.div`
  @media (max-width: 768px) {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

const FooterTitle = styled.h4`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 50px;
    height: 2px;
    background-color: var(--primary-color);
  }
`;

const FooterNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.8rem;
  }
`;

const FooterLink = styled.div`
  display: block;
  color: var(--light-text);
  padding: 0.5rem 0;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateX(5px);
    color: var(--primary-color);
  }
`;

const FooterContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  color: var(--light-text);
  margin-bottom: 0.8rem;
  
  span {
    min-width: 60px;
    font-weight: 500;
  }
  
  a {
    color: var(--light-text);
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--light-text);
  font-size: 0.9rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const FooterButton = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--hover-color);
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>About</FooterTitle>
          <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>Samuel Simkin is an Electrical Engineer passionate about creating innovative solutions through hardware design and software integration.</p>
          <FooterButton 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = "/contact"}
          >
            <span style={{ color: 'white' }}>Get In Touch</span>
          </FooterButton>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterNav>
            <li><FooterLink onClick={() => window.location.href = "/"}>Home</FooterLink></li>
            <li><FooterLink onClick={() => window.location.href = "/work"}>Work Experience</FooterLink></li>
            <li><FooterLink onClick={() => window.location.href = "/projects"}>Projects</FooterLink></li>
            <li><FooterLink onClick={() => window.location.href = "/contact"}>Contact</FooterLink></li>
          </FooterNav>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterContact>
            <ContactItem>
              <span>Email:</span>
              <a href="mailto:simkinsamuel@gmail.com">simkinsamuel@gmail.com</a>
            </ContactItem>
            <ContactItem>
              <span>Phone:</span>
              <a href="tel:+17868162220">(786) 816-2220</a>
            </ContactItem>
          </FooterContact>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {currentYear} Samuel Simkin. All Rights Reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 