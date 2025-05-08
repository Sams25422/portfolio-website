import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { useInView } from 'react-intersection-observer';

const ProjectsSection = styled.section`
  padding: 5rem 0;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem auto;
  color: var(--light-text);
  font-size: 1.2rem;
  opacity: 0.9;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const FilterButton = styled(motion.button)`
  background: ${({ $active }) => $active ? 'var(--primary-color)' : 'transparent'};
  color: ${({ $active }) => $active ? 'white' : 'var(--light-text)'};
  border: 2px solid ${({ $active }) => $active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.2)'};
  padding: 8px 16px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ $active }) => $active ? 'var(--primary-color)' : 'rgba(243, 156, 18, 0.1)'};
    border-color: var(--primary-color);
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background-color: var(--dark-surface);
  border-radius: 12px;
  grid-column: 1 / -1;
`;

const LoadMoreButton = styled(motion.button)`
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin: 3rem auto 0 auto;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    } 
  }
};

// Define all projects outside the component
const projects = [
  {
    id: 1,
    title: "Smart Bartender",
    date: "Ongoing Project",
    category: "Hardware Engineering",
    description: "An automated drink dispensing system with a user-friendly interface for selecting and customizing drink recipes.",
    image: "/BartenderP1-2.jpeg",
    additionalMedia: [
      { src: "/BartenderP1.mp4", type: "video" },
      { src: "/BarPhase3.MOV", type: "video" },
      { src: "/saveddrinks.PNG", type: "image" },
      { src: "/drinkdetails2.PNG", type: "image" },
      { src: "/likeddrinks.PNG", type: "image" },
      { src: "/alldrinks.PNG", type: "image" },
      { src: "/Welcome2.PNG", type: "image" }
    ],
    detailsUrl: "/projects/smart-bartender",
    tags: ["Arduino", "Fluid Control", "UI Design", "IoT"],
    type: "ongoing",
    scope: "Personal Project"
  },
  {
    id: 2,
    title: "Aux to Bluetooth",
    date: "Ongoing Project",
    category: "Electronics Design",
    description: "Custom PCB design to convert traditional auxiliary audio inputs to Bluetooth connectivity.",
    image: "/AuxPCB.PNG",
    additionalMedia: [
      { src: "/AuxSchematic.PNG", type: "image" }
    ],
    detailsUrl: "/projects/aux-bluetooth",
    tags: ["PCB Design", "Bluetooth", "Audio", "Wireless Communication"],
    type: "ongoing",
    scope: "Personal Project"
  },
  {
    id: 3,
    title: "Electric Go-Kart",
    date: "Completed in 2021",
    category: "Automotive Engineering",
    description: "A custom electric go-kart powered by a series-parallel battery configuration to drive a DC motor.",
    image: "/Gokart1.jpeg",
    additionalMedia: [
      { src: "/Gokart2.jpeg", type: "image" },
      { src: "/GokartVideo.mp4", type: "video" }
    ],
    detailsUrl: "/projects/electric-gokart",
    tags: ["Power Systems", "Electric Vehicle", "DC Motor", "Battery Configuration"],
    type: "previous",
    scope: "Personal Project"
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    date: "Completed in 2020",
    category: "Audio Engineering",
    description: "Custom Bluetooth speaker with volume control and wooden enclosure.",
    image: "/speaker1.jpeg",
    additionalMedia: [
      { src: "/speaker2.png", type: "image" }
    ],
    detailsUrl: "/projects/bluetooth-speaker",
    tags: ["Audio", "Bluetooth", "Woodworking", "Electronics"],
    type: "previous",
    scope: "Personal Project"
  },
  {
    id: 5,
    title: "Karaoke Machine",
    date: "Completed in 2019",
    category: "Audio Engineering",
    description: "Built a karaoke machine with bass and treble controls using LF412CN operational amplifiers.",
    image: "/KaraokeFull.jpeg",
    additionalMedia: [
      { src: "/KarokePCB.jpeg", type: "image" },
      { src: "/Karaokevid.mp4", type: "video" }
    ],
    detailsUrl: "/projects/karaoke-machine",
    tags: ["Audio Processing", "Amplifier Design", "UI Controls", "Electronics"],
    type: "previous",
    scope: "Personal Project"
  },
  {
    id: 6,
    title: "Taser Build",
    date: "Completed in 2020",
    category: "Electronics Design",
    description: "Designed and built a functional taser with safety considerations for high-voltage circuits.",
    image: "/taser2.JPG",
    additionalMedia: [
      { src: "/Taser3.JPG", type: "image" },
      { src: "/XIRC5016.JPG", type: "image" },
      { src: "/Taser.mp4", type: "video" },
      { src: "/TaserVideo.MOV", type: "video" }
    ],
    detailsUrl: "/projects/taser-build",
    tags: ["High Voltage", "Safety Design", "Power Control", "Electronics"],
    type: "side",
    scope: "Personal Project"
  },
  {
    id: 7,
    title: "Car Battery Management System",
    date: "Ongoing Project",
    category: "Automotive Electronics",
    description: "A custom system to monitor and log current flow from car batteries.",
    image: "/project-placeholder.jpg",
    detailsUrl: "/projects/battery-management",
    tags: ["Current Monitoring", "Power Management", "Data Logging", "Automotive"],
    type: "ongoing",
    scope: "Personal Project"
  },
  {
    id: 8,
    title: "Airtag-style Tracking System",
    date: "Ongoing Project",
    category: "IoT Development",
    description: "Developing a custom tracking system similar to Airtags using Bluetooth technology.",
    image: "/project-placeholder.jpg",
    detailsUrl: "/projects/tracking-system",
    tags: ["Bluetooth", "Low Power", "Location Tracking", "IoT"],
    type: "ongoing",
    scope: "Personal Project"
  },
  {
    id: 9,
    title: "Door Lock System",
    date: "Completed in 2020",
    category: "Previous",
    description: "Custom electronic door lock system with secure access control.",
    image: "/door-lock1.png",
    additionalMedia: [
      { src: "/door-lock2.png", type: "image" },
      { src: "/DoorLock.MP4", type: "video" }
    ],
    detailsUrl: "/projects/door-lock",
    tags: ["Security", "Access Control", "Electronics"],
    type: "previous"
  }
];

// Filter categories
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'ongoing', name: 'Ongoing Projects' },
  { id: 'previous', name: 'Previous Projects' },
  { id: 'side', name: 'Side Projects' }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Filter projects based on selected category
  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.type === filter));
    }
    // Reset visible projects count when filter changes
    setVisibleProjects(6);
  }, [filter]);
  
  // Load more projects
  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };
  
  return (
    <ProjectsSection id="projects" ref={ref}>
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionTitle>My Projects</SectionTitle>
        <SectionSubtitle>
          Explore my portfolio of projects showcasing electrical engineering, hardware design, and software integration.
        </SectionSubtitle>
      </motion.div>
      
      <FilterContainer
        variants={titleVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {categories.map((category) => (
          <FilterButton
            key={category.id}
            $active={filter === category.id}
            onClick={() => setFilter(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </FilterButton>
        ))}
      </FilterContainer>
      
      <ProjectGrid
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            filteredProjects
              .slice(0, visibleProjects)
              .map(project => (
                <ProjectCard 
                  key={project.id}
                  title={project.title}
                  date={project.date}
                  category={project.category}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  detailsUrl={project.detailsUrl}
                  isVideo={project.image.toLowerCase().endsWith('.mp4') || 
                          project.image.toLowerCase().endsWith('.mov')}
                  additionalMedia={project.additionalMedia}
                />
              ))
          ) : (
            <EmptyState
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3>No projects found</h3>
              <p>Try selecting a different category</p>
            </EmptyState>
          )}
        </AnimatePresence>
      </ProjectGrid>
      
      {filteredProjects.length > visibleProjects && (
        <LoadMoreButton
          onClick={loadMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Load More
        </LoadMoreButton>
      )}
    </ProjectsSection>
  );
};

export default Projects; 