import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #f39c12;
    --dark-bg: #1f1f1f;
    --dark-surface: #2c2c2c;
    --light-text: #e0e0e0;
    --header-bg: #333;
    --hover-color: #d35400;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: var(--dark-bg);
    color: var(--light-text);
    line-height: 1.6;
    overflow-x: hidden;
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--hover-color);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 3rem;
    color: var(--primary-color);
  }

  h2 {
    font-size: 2.5rem;
    color: var(--primary-color);
  }

  h3 {
    font-size: 2rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  img, video {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    cursor: pointer;
    border: none;
    background: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--hover-color);
  }

  section {
    padding: 5rem 0;
  }

  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    h2 {
      font-size: 2rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    section {
      padding: 3rem 0;
    }
  }
`;

export default GlobalStyle; 