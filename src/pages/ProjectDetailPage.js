import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  padding-top: 70px;
`;

const ProjectHeaderSection = styled.section`
  padding: 8rem 0 3rem 0;
  position: relative;
  background-color: var(--dark-surface);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(243, 156, 18, 0.1), transparent 70%);
    z-index: 0;
  }
`;

const ProjectHeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const BackButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  background: transparent;
  color: var(--light-text);
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  text-decoration: none;
  
  &:before {
    content: '←';
    margin-right: 8px;
    font-size: 1.2rem;
  }
`;

const BackButton = motion(BackButtonLink);

const ProjectTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetaLabel = styled.span`
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 0.3rem;
`;

const MetaValue = styled.span`
  font-size: 1.1rem;
  color: var(--light-text);
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 2rem;
`;

const ProjectTag = styled.span`
  background-color: rgba(243, 156, 18, 0.1);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
`;

const ProjectImageContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  margin-top: 2rem;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ProjectDetailsSection = styled.section`
  padding: 5rem 0;
`;

const ProjectDetailsContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
  }
`;

const ProjectDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--light-text);
  margin-bottom: 3rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const PhaseSection = styled.div`
  margin-bottom: 4rem;
`;

const PhaseTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--light-text);
  margin-bottom: 1rem;
`;

const PhaseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const PhaseImage = styled.div`
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img, &:hover video {
    transform: scale(1.05);
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const LightboxContent = styled(motion.div)`
  max-width: 900px;
  max-height: 80vh;
  background-color: var(--dark-surface);
  border-radius: 12px;
  overflow: auto;
  position: relative;
  
  img, video {
    width: 100%;
    max-height: 80vh;
    object-fit: contain;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 100;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 2px;
    background-color: white;
  }
  
  &:before {
    transform: rotate(45deg);
  }
  
  &:after {
    transform: rotate(-45deg);
  }
`;

const RelatedProjectsSection = styled.section`
  padding: 3rem 0 5rem 0;
  background-color: var(--dark-surface);
`;

const RelatedProjectsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const RelatedProjectsTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
`;

const RelatedProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const RelatedProjectLink = styled(Link)`
  text-decoration: none;
`;

const RelatedProjectCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const MotionRelatedProjectLink = motion(RelatedProjectLink);

const RelatedProjectImage = styled.div`
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${RelatedProjectCard}:hover & img {
    transform: scale(1.05);
  }
`;

const RelatedProjectContent = styled.div`
  padding: 1.5rem;
`;

const RelatedProjectName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--light-text);
`;

const RelatedProjectCategory = styled.span`
  font-size: 0.9rem;
  color: var(--primary-color);
`;

// Sample project data (in a real application, this would come from an API or database)
const projectsData = [
  {
    id: 'smart-bartender',
    title: 'Smart Bartender',
    date: 'Ongoing Project',
    category: 'Hardware Engineering',
    status: 'In Development',
    scope: 'Personal Project',
    description: [
      'The Smart Bartender is an automated drink dispensing system with a user-friendly interface for selecting and customizing drink recipes. It combines hardware control systems with intuitive software interaction.',
      'This project showcases the integration of mechanical components, electronic control systems, and user interface design to create a seamless experience for users wanting to create perfectly mixed drinks.'
    ],
    mainImage: '/BartenderP1-2.jpeg',
    tags: ['Arduino', 'Fluid Control', 'UI Design', 'IoT'],
    phases: [
      {
        title: 'Phase 1: Initial Design',
        description: 'Started with the basic concept, drafting the system\'s requirements, and selecting key components like relays and pumps for automating drink preparation.',
        images: [
          { src: '/BartenderP1-2.jpeg', isVideo: false },
          { src: '/BartenderP1.mp4', isVideo: true }
        ]
      },
      {
        title: 'Phase 2: UI Design and Improvement',
        description: 'Designing and improving the user interface to allow users to select drinks, with features for browsing drink options, saving favorites, and viewing detailed information.',
        images: [
          { src: '/Welcome2.PNG', isVideo: false },
          { src: '/alldrinks.PNG', isVideo: false },
          { src: '/drinkdetails2.PNG', isVideo: false },
          { src: '/likeddrinks.PNG', isVideo: false },
          { src: '/saveddrinks.PNG', isVideo: false }
        ]
      },
      {
        title: 'Phase 3: Hardware Selection and Testing',
        description: 'Selecting and testing appropriate hardware components, including pumps, relays, microcontrollers, and housing for the system.',
        images: [
          { src: '/BarPhase3.MOV', isVideo: true }
        ]
      }
    ],
    relatedProjects: ['electric-gokart', 'bluetooth-speaker', 'tracking-system']
  },
  {
    id: 'aux-bluetooth',
    title: 'Aux to Bluetooth',
    date: 'Ongoing Project',
    category: 'Electronics Design',
    status: 'In Design Phase',
    scope: 'Personal Project',
    description: [
      'The Aux to Bluetooth project is a custom PCB design to convert traditional auxiliary audio inputs to Bluetooth connectivity, allowing wireless audio streaming to devices with only wired audio inputs.',
      'This project involves PCB design, firmware development, and audio signal processing to ensure high-quality sound transmission with minimal latency.'
    ],
    mainImage: '/AuxPCB.PNG',
    tags: ['PCB Design', 'Bluetooth', 'Audio', 'Wireless Communication'],
    phases: [
      {
        title: 'Phase 1: Schematic and PCB Design',
        description: 'Creating the schematic design and PCB layout for the Aux to Bluetooth converter, with consideration for audio quality, power efficiency, and compact form factor.',
        images: [
          { src: '/AuxSchematic.PNG', isVideo: false },
          { src: '/AuxPCB.PNG', isVideo: false },
          { src: '/3DView.PNG', isVideo: false }
        ]
      }
    ],
    relatedProjects: ['bluetooth-speaker', 'karaoke-machine', 'tracking-system']
  },
  {
    id: 'electric-gokart',
    title: 'Electric Go-Kart',
    date: 'Completed in 2021',
    category: 'Automotive Engineering',
    status: 'Completed',
    scope: 'Personal Project',
    description: [
      'The Electric Go-Kart project involved designing and implementing a power system using six batteries connected in a series-parallel configuration to provide the necessary voltage and current for a DC motor.',
      'This project included power management, motor control, and mechanical integration to create a functional electric vehicle with good performance and reliability.'
    ],
    mainImage: '/Gokart1.jpeg',
    tags: ['Power Systems', 'Electric Vehicle', 'DC Motor', 'Battery Configuration'],
    phases: [
      {
        title: 'Design and Build',
        description: 'Designing the power system and building the electric go-kart, including battery configuration, motor selection, and mechanical assembly.',
        images: [
          { src: '/Gokart1.jpeg', isVideo: false },
          { src: '/Gokart2.jpeg', isVideo: false },
          { src: '/GokartVideo.mp4', isVideo: true }
        ]
      }
    ],
    relatedProjects: ['smart-bartender', 'taser-build', 'battery-management']
  },
  {
    id: 'battery-management',
    title: 'Car Battery Management System',
    date: 'Ongoing Project',
    category: 'Automotive Electronics',
    status: 'In Development',
    scope: 'Personal Project',
    description: [
      'The Car Battery Management System is designed to monitor and log current flow from car batteries. This system provides real-time data on battery performance, helping to prevent unexpected failures and optimize battery life.',
      'Using advanced current monitoring sensors and data logging capabilities, the system tracks battery usage patterns and provides analytics to identify potential issues before they become critical.'
    ],
    mainImage: '/project-placeholder.jpg',
    tags: ['Current Monitoring', 'Power Management', 'Data Logging', 'Automotive'],
    phases: [
      {
        title: 'Phase 1: System Design',
        description: 'Initial system architecture design, component selection, and circuit planning for accurate current flow measurement from automotive batteries.',
        images: [
          { src: '/project-placeholder.jpg', isVideo: false }
        ]
      },
      {
        title: 'Phase 2: Prototype Development',
        description: 'Building and testing the first prototype of the battery management system with focus on accuracy and reliability of current measurements.',
        images: []
      }
    ],
    relatedProjects: ['electric-gokart', 'smart-bartender', 'door-lock']
  },
  {
    id: 'tracking-system',
    title: 'Airtag-style Tracking System',
    date: 'Ongoing Project',
    category: 'IoT Development',
    status: 'Research Phase',
    scope: 'Personal Project',
    description: [
      'This project involves developing a custom tracking system similar to Apple\'s AirTags using Bluetooth technology. The system is designed to be energy-efficient with a focus on long battery life and reliable location tracking.',
      'The custom tracking devices communicate with a network of receivers and a mobile application to provide accurate location information for personal belongings, pets, or other tracked items.'
    ],
    mainImage: '/project-placeholder.jpg',
    tags: ['Bluetooth', 'Low Power', 'Location Tracking', 'IoT'],
    phases: [
      {
        title: 'Phase 1: Research and Technology Selection',
        description: 'Researching available technologies and selecting the most appropriate Bluetooth protocol and hardware components for the tracking system.',
        images: [
          { src: '/project-placeholder.jpg', isVideo: false }
        ]
      },
      {
        title: 'Phase 2: Initial Prototype',
        description: 'Developing the first prototype of the tracking device with emphasis on size optimization and power efficiency.',
        images: []
      }
    ],
    relatedProjects: ['aux-bluetooth', 'smart-bartender', 'door-lock']
  },
  {
    id: 'door-lock',
    title: 'Door Lock System',
    date: 'Completed in 2020',
    category: 'Home Automation',
    status: 'Completed',
    scope: 'Personal Project',
    description: [
      'The Door Lock System project resulted in a custom electronic door lock solution with secure access control. This system replaced traditional key-based locks with a more versatile electronic system.',
      'The system incorporates multiple authentication methods including RFID cards, PIN codes, and smartphone connectivity for convenient and secure access management.'
    ],
    mainImage: '/door-lock1.png',
    tags: ['Security', 'Access Control', 'Electronics', 'IoT'],
    phases: [
      {
        title: 'Phase 1: System Design',
        description: 'Designing the door lock system architecture with security as the primary consideration, including component selection and security protocol implementation.',
        images: [
          { src: '/door-lock1.png', isVideo: false },
          { src: '/door-lock2.png', isVideo: false }
        ]
      },
      {
        title: 'Phase 2: Implementation',
        description: 'Building and installing the electronic door lock system with secure access control mechanisms.',
        images: [
          { src: '/DoorLock.MP4', isVideo: true }
        ]
      }
    ],
    relatedProjects: ['tracking-system', 'smart-bartender', 'taser-build']
  },
  {
    id: 'bluetooth-speaker',
    title: 'Bluetooth Speaker',
    date: 'Completed in 2020',
    category: 'Audio Engineering',
    status: 'Completed',
    scope: 'Personal Project',
    description: [
      'This project involved building a custom Bluetooth speaker with volume control and a handcrafted wooden enclosure. The speaker combines quality audio components with aesthetic design.',
      'The wooden enclosure was specifically designed to enhance acoustic properties while providing a distinctive visual appeal.'
    ],
    mainImage: '/speaker1.jpeg',
    tags: ['Audio', 'Bluetooth', 'Woodworking', 'Electronics'],
    phases: [
      {
        title: 'Phase 1: Acoustic and Electronic Design',
        description: 'Designing the speaker\'s acoustic properties and electronic components for optimal sound quality.',
        images: [
          { src: '/speaker1.jpeg', isVideo: false }
        ]
      },
      {
        title: 'Phase 2: Enclosure Construction',
        description: 'Crafting the wooden enclosure with attention to both aesthetic appeal and acoustic performance.',
        images: [
          { src: 'https://via.placeholder.com/400x300/2c2c2c/f39c12?text=Woodworking', isVideo: false }
        ]
      }
    ],
    relatedProjects: ['aux-bluetooth', 'karaoke-machine', 'smart-bartender']
  },
  {
    id: 'karaoke-machine',
    title: 'Karaoke Machine',
    date: 'Completed in 2019',
    category: 'Audio Engineering',
    status: 'Completed',
    scope: 'Personal Project',
    description: [
      'This project involved building a karaoke machine with bass and treble controls using LF412CN operational amplifiers. The system provides high-quality audio processing for vocal enhancement.',
      'The custom-designed audio circuitry allows users to adjust sound characteristics to complement different music styles and vocal ranges.'
    ],
    mainImage: '/KaraokeFull.jpeg',
    tags: ['Audio Processing', 'Amplifier Design', 'UI Controls', 'Electronics'],
    phases: [
      {
        title: 'Phase 1: Circuit Design and Assembly',
        description: 'Designing the audio processing circuit with LF412CN operational amplifiers for precise control over bass and treble frequencies.',
        images: [
          { src: '/KaraokeFull.jpeg', isVideo: false },
          { src: '/KarokePCB.jpeg', isVideo: false }
        ]
      },
      {
        title: 'Phase 2: Testing and Demonstration',
        description: 'Testing the karaoke machine functionality and demonstrating audio quality with volume, bass, and treble controls.',
        images: [
          { src: '/Karaokevid.mp4', isVideo: true }
        ]
      }
    ],
    relatedProjects: ['bluetooth-speaker', 'aux-bluetooth', 'smart-bartender']
  },
  {
    id: 'taser-build',
    title: 'Taser Build',
    date: 'Completed in 2020',
    category: 'Electronics Design',
    status: 'Completed',
    scope: 'Personal Project',
    description: [
      'This project involved designing and building a functional taser with comprehensive safety considerations for high-voltage circuits. The build demonstrates principles of voltage multiplication and electrical safety.',
      'Careful attention was paid to insulation, discharge control, and fail-safe mechanisms to ensure the device could be safely operated and demonstrated.'
    ],
    mainImage: '/taser2.JPG',
    tags: ['High Voltage', 'Safety Design', 'Power Control', 'Electronics'],
    phases: [
      {
        title: 'Phase 1: Circuit Design',
        description: 'Designing the high-voltage circuit with multiple safety features and protections.',
        images: [
          { src: '/taser2.JPG', isVideo: false },
          { src: '/Taser3.JPG', isVideo: false },
          { src: '/XIRC5016.JPG', isVideo: false }
        ]
      },
      {
        title: 'Phase 2: Construction and Testing',
        description: 'Building the device with focus on insulation and safety, followed by controlled testing.',
        images: [
          { src: '/Taser.mp4', isVideo: true },
          { src: '/TaserVideo.MOV', isVideo: true }
        ]
      }
    ],
    relatedProjects: ['door-lock', 'electric-gokart', 'battery-management']
  }
  // Additional projects would be defined here
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.4,
      ease: "easeOut",
      delay: 0.1
    } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    } 
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [mediaLoadErrors, setMediaLoadErrors] = useState({});
  
  // Function to ensure all file paths use absolute URLs
  const getAbsolutePath = (path) => {
    // If path already starts with http or https, return it as is
    if (path.startsWith('http') || path.startsWith('https')) {
      return path;
    }
    
    // Make sure the path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    
    // Create absolute URL with origin (e.g., http://localhost:3000)
    return `${window.location.origin}${normalizedPath}`;
  };
  
  // Handle image loading error
  const handleImageError = (e, src) => {
    console.error(`Failed to load image: ${src}`);
    setMediaLoadErrors(prev => ({
      ...prev,
      [src]: true
    }));
    e.target.src = getAbsolutePath('/project-placeholder.jpg');
  };
  
  useEffect(() => {
    // In a real application, this would be an API call
    const foundProject = projectsData.find(p => p.id === projectId);
    
    // Simulate API call delay
    setTimeout(() => {
      setProject(foundProject);
      setLoading(false);
    }, 500);
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [projectId]);
  
  // Check that media files actually exist on mount
  useEffect(() => {
    if (!project) return;
    
    const checkMedia = async () => {
      // Check main image
      try {
        const response = await fetch(getAbsolutePath(project.mainImage), { method: 'HEAD' });
        console.log(`Main image check (${project.mainImage}): ${response.ok ? 'SUCCESS' : 'FAILED'}`);
      } catch (error) {
        console.error(`Error checking main image: ${error}`);
      }
      
      // Check phase images
      if (project.phases) {
        for (const phase of project.phases) {
          if (phase.images && phase.images.length > 0) {
            for (const image of phase.images) {
              try {
                const response = await fetch(getAbsolutePath(image.src), { method: 'HEAD' });
                console.log(`Phase image check (${image.src}): ${response.ok ? 'SUCCESS' : 'FAILED'}`);
              } catch (error) {
                console.error(`Error checking phase image: ${error}`);
              }
            }
          }
        }
      }
    };
    
    checkMedia();
  }, [project]);
  
  const openLightbox = (image) => {
    setCurrentImage(image);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  // Helper function to check if an image is a placeholder
  const isPlaceholder = (imageSrc) => {
    return imageSrc.includes('via.placeholder.com');
  };
  
  if (loading) {
    return (
      <PageContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2>Loading project details...</h2>
        </div>
      </PageContainer>
    );
  }
  
  if (!project) {
    return (
      <PageContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/projects">Back to Projects</Link>
        </div>
      </PageContainer>
    );
  }
  
  const relatedProjects = project.relatedProjects
    .map(relatedId => projectsData.find(p => p.id === relatedId))
    .filter(Boolean);
    
  // Filter out placeholder images from phase images
  const phasesWithRealImages = project.phases.map(phase => ({
    ...phase,
    images: phase.images.filter(image => !isPlaceholder(image.src))
  }));
  
  // Check if the project has any real images
  const hasMainImage = !isPlaceholder(project.mainImage);
  const hasAnyPhaseImages = phasesWithRealImages.some(phase => phase.images.length > 0);
  
  return (
    <PageContainer>
      <ProjectHeaderSection>
        <ProjectHeaderContent>
          <BackButton 
            to="/projects"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Projects
          </BackButton>
          
          <ProjectTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            {project.title}
          </ProjectTitle>
          
          <ProjectMeta>
            <MetaItem>
              <MetaLabel>Type</MetaLabel>
              <MetaValue>{project.category}</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue>{project.date}</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>Status</MetaLabel>
              <MetaValue>{project.status}</MetaValue>
            </MetaItem>
            
            <MetaItem>
              <MetaLabel>Scope</MetaLabel>
              <MetaValue>{project.scope}</MetaValue>
            </MetaItem>
          </ProjectMeta>
          
          <ProjectTags>
            {project.tags.map((tag, index) => (
              <ProjectTag key={index}>{tag}</ProjectTag>
            ))}
          </ProjectTags>
          
          {hasMainImage ? (
            <ProjectImageContainer
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
              onClick={() => openLightbox({ src: project.mainImage, isVideo: project.mainImage.endsWith('.mp4') || project.mainImage.endsWith('.MOV') })}
            >
              {project.mainImage.endsWith('.mp4') || project.mainImage.endsWith('.MOV') ? (
                <video autoPlay muted loop controls>
                  <source src={getAbsolutePath(project.mainImage)} type="video/mp4" />
                  <source src={getAbsolutePath(project.mainImage)} type="video/quicktime" />
                  <p>Your browser does not support the video tag.</p>
                </video>
              ) : (
                <img 
                  src={getAbsolutePath(project.mainImage)} 
                  alt={project.title} 
                  onError={(e) => handleImageError(e, project.mainImage)}
                />
              )}
            </ProjectImageContainer>
          ) : null}
          
          {/* Direct URL debugging link for main image */}
          <div style={{ fontSize: '10px', color: '#666', padding: '0.5rem', textAlign: 'center' }}>
            Main image URL: <a href={getAbsolutePath(project.mainImage)} target="_blank" rel="noreferrer">{getAbsolutePath(project.mainImage)}</a>
          </div>
        </ProjectHeaderContent>
      </ProjectHeaderSection>
      
      <ProjectDetailsSection>
        <ProjectDetailsContent>
          <SectionTitle>Project Overview</SectionTitle>
          <ProjectDescription>
            {project.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </ProjectDescription>
          
          <SectionTitle>Development Process</SectionTitle>
          {phasesWithRealImages.map((phase, phaseIndex) => (
            <PhaseSection key={phaseIndex}>
              <PhaseTitle>{phase.title}</PhaseTitle>
              <p>{phase.description}</p>
              
              {phase.images.length > 0 ? (
                <PhaseGrid>
                  {phase.images.map((image, imageIndex) => (
                    <PhaseImage 
                      key={imageIndex}
                      onClick={() => openLightbox(image)}
                    >
                      {image.isVideo ? (
                        <video muted controls>
                          <source src={getAbsolutePath(image.src)} type="video/mp4" />
                          <source src={getAbsolutePath(image.src)} type="video/quicktime" />
                          <p>
                            Your browser does not support the video tag.
                            <a href={getAbsolutePath(image.src)} target="_blank" rel="noreferrer">Open video</a>
                          </p>
                        </video>
                      ) : (
                        <img 
                          src={getAbsolutePath(image.src)} 
                          alt={`${phase.title} - Image ${imageIndex + 1}`} 
                          onError={(e) => handleImageError(e, image.src)}
                        />
                      )}
                      
                      {/* Debugging link */}
                      <div style={{ fontSize: '9px', textAlign: 'center', marginTop: '2px' }}>
                        <a href={getAbsolutePath(image.src)} target="_blank" rel="noreferrer">Direct link</a>
                      </div>
                    </PhaseImage>
                  ))}
                </PhaseGrid>
              ) : null}
            </PhaseSection>
          ))}
          
          {!hasMainImage && !hasAnyPhaseImages && (
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem', 
              margin: '2rem 0',
              backgroundColor: 'rgba(243, 156, 18, 0.1)', 
              borderRadius: '8px' 
            }}>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>
                Pictures coming soon
              </h3>
              <p>We're working on adding visual documentation for this project. Check back later!</p>
            </div>
          )}
        </ProjectDetailsContent>
      </ProjectDetailsSection>
      
      {relatedProjects.length > 0 && (
        <RelatedProjectsSection>
          <RelatedProjectsContent>
            <RelatedProjectsTitle>Related Projects</RelatedProjectsTitle>
            <RelatedProjectsGrid>
              {relatedProjects.map((relatedProject, index) => (
                <MotionRelatedProjectLink
                  key={index}
                  to={`/projects/${relatedProject.id}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <RelatedProjectCard>
                    <RelatedProjectImage>
                      <img 
                        src={getAbsolutePath(relatedProject.mainImage)} 
                        alt={relatedProject.title}
                        onError={(e) => {
                          console.error(`Failed to load related project image: ${relatedProject.mainImage}`);
                          e.target.src = getAbsolutePath('/project-placeholder.jpg');
                        }}
                      />
                    </RelatedProjectImage>
                    <RelatedProjectContent>
                      <RelatedProjectName>{relatedProject.title}</RelatedProjectName>
                      <RelatedProjectCategory>{relatedProject.category}</RelatedProjectCategory>
                    </RelatedProjectContent>
                  </RelatedProjectCard>
                </MotionRelatedProjectLink>
              ))}
            </RelatedProjectsGrid>
          </RelatedProjectsContent>
        </RelatedProjectsSection>
      )}
      
      {lightboxOpen && currentImage && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          onClick={closeLightbox}
        >
          <LightboxContent
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeLightbox} />
            {currentImage.isVideo ? (
              <video controls autoPlay>
                <source src={getAbsolutePath(currentImage.src)} type="video/mp4" />
                <source src={getAbsolutePath(currentImage.src)} type="video/quicktime" />
                <p>Your browser does not support the video tag.</p>
              </video>
            ) : (
              <img 
                src={getAbsolutePath(currentImage.src)} 
                alt={`Project ${project.title}`} 
                onError={(e) => handleImageError(e, currentImage.src)}
              />
            )}
            
            {/* Direct URL for debugging */}
            <div style={{ fontSize: '12px', color: '#aaa', padding: '0.5rem', wordBreak: 'break-all' }}>
              URL: <a href={getAbsolutePath(currentImage.src)} target="_blank" rel="noreferrer">{getAbsolutePath(currentImage.src)}</a>
            </div>
          </LightboxContent>
        </Overlay>
      )}
    </PageContainer>
  );
};

export default ProjectDetailPage; 