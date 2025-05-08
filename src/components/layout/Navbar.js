import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background: rgba(31, 31, 31, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  
  span {
    color: var(--light-text);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.div`
  color: var(--light-text);
  font-size: 1rem;
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  &.active:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  cursor: pointer;
  z-index: 101;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  div {
    width: 25px;
    height: 3px;
    background-color: var(--light-text);
    margin: 5px 0;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0)'};
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 0;
    right: ${({ open }) => open ? '0' : '-100%'};
    width: 250px;
    height: 100vh;
    background-color: var(--dark-surface);
    flex-direction: column;
    padding-top: 100px;
    transition: all 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
    z-index: 99;
  }
`;

const MobileNavLink = styled.div`
  color: var(--light-text);
  font-size: 1.2rem;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(243, 156, 18, 0.1);
  }
`;

const navVariants = {
  hidden: { y: -70 },
  visible: { y: 0, transition: { duration: 0.5, ease: "easeInOut" } }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <Nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{ 
        boxShadow: scrollPosition > 70 ? '0 10px 20px rgba(0, 0, 0, 0.1)' : 'none',
        height: scrollPosition > 70 ? '60px' : '70px'
      }}
    >
      <Logo>
        Samuel<span>Simkin</span>
      </Logo>
      
      <NavLinks>
        <NavLink onClick={() => window.location.href = "/"}>Home</NavLink>
        <NavLink onClick={() => window.location.href = "/work"}>Work</NavLink>
        <NavLink onClick={() => window.location.href = "/projects"}>Projects</NavLink>
        <NavLink onClick={() => window.location.href = "/contact"}>Contact</NavLink>
      </NavLinks>
      
      <MobileMenuButton open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </MobileMenuButton>
      
      <MobileMenu open={open}>
        <MobileNavLink onClick={() => {
          setOpen(false);
          window.location.href = "/";
        }}>Home</MobileNavLink>
        <MobileNavLink onClick={() => {
          setOpen(false);
          window.location.href = "/work";
        }}>Work</MobileNavLink>
        <MobileNavLink onClick={() => {
          setOpen(false);
          window.location.href = "/projects";
        }}>Projects</MobileNavLink>
        <MobileNavLink onClick={() => {
          setOpen(false);
          window.location.href = "/contact";
        }}>Contact</MobileNavLink>
      </MobileMenu>
    </Nav>
  );
};

export default Navbar; 