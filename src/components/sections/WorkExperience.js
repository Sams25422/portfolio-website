import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WorkSection = styled.section`
  padding: 5rem 0;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    width: 4px;
    height: calc(100% - 200px);
    background-color: rgba(243, 156, 18, 0.3);
    left: 50%;
    top: 180px;
    transform: translateX(-50%);
    
    @media (max-width: 992px) {
      left: 40px;
    }
    
    @media (max-width: 768px) {
      left: 20px;
    }
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem auto;
  color: var(--light-text);
  font-size: 1.2rem;
  opacity: 0.9;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TimelineEntry = styled(motion.div)`
  display: flex;
  margin-bottom: 5rem;
  
  &:nth-child(odd) {
    flex-direction: row;
    
    @media (max-width: 992px) {
      flex-direction: row;
    }
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: 992px) {
      flex-direction: row;
    }
  }
`;

const TimelineDot = styled.div`
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 0 5px rgba(243, 156, 18, 0.2);
  margin: 0 auto;
  
  @media (max-width: 992px) {
    margin: 0;
  }
`;

const TimelineDate = styled.div`
  flex: 1;
  text-align: right;
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  ${TimelineEntry}:nth-child(even) & {
    text-align: left;
  }
  
  @media (max-width: 992px) {
    flex: 0;
    width: 80px;
    padding: 0 20px 0 0;
    text-align: right;
    
    ${TimelineEntry}:nth-child(even) & {
      text-align: right;
    }
  }
`;

const Period = styled.span`
  font-size: 1rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Year = styled.span`
  font-size: 0.9rem;
  color: var(--light-text);
  opacity: 0.7;
`;

const TimelineContent = styled.div`
  flex: 1;
  background-color: var(--dark-surface);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    width: 20px;
    height: 20px;
    background-color: var(--dark-surface);
    transform: rotate(45deg);
    
    ${TimelineEntry}:nth-child(odd) & {
      left: -10px;
    }
    
    ${TimelineEntry}:nth-child(even) & {
      right: -10px;
    }
    
    @media (max-width: 992px) {
      ${TimelineEntry}:nth-child(even) & {
        left: -10px;
        right: auto;
      }
    }
  }
  
  @media (max-width: 992px) {
    margin-left: 2rem;
  }
`;

const CompanyName = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: var(--light-text);
`;

const Position = styled.h4`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--light-text);
  opacity: 0.9;
`;

const Skills = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SkillItem = styled.li`
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--primary-color);
    left: 0;
    top: 8px;
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

const timelineEntryVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: {
      duration: 0.5,
    }
  },
  visible: (custom) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      delay: custom * 0.2,
      ease: "easeOut" 
    } 
  })
};

const WorkExperience = () => {
  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Work experience data
  const workExperiences = [
    {
      id: 1,
      company: 'American Honda Motor Company',
      position: 'Electrical Quality Engineer',
      period: 'June 2022',
      year: 'Present',
      description: 'As an Electrical Quality Engineer at Honda, I work closely with cross-functional teams to improve processes and enhance vehicle quality.',
      responsibilities: [
        'Worked closely with cross-functional teams to identify and implement process improvements, enhancing overall quality.',
        'Conducted data analysis to identify trends, patterns, and opportunities for improvement, providing insights for hardware design validations.',
        'Utilized CAN and Ethernet logging tools to collect data and troubleshoot various vehicle issues, ensuring compliance with design specifications and functional safety requirements.',
        'Participated in updating software for over 8,000 cars, resulting in a significant reduction of software issues and improved system performance.'
      ]
    },
    {
      id: 2,
      company: 'Generator Supercenter',
      position: 'Field Project Supervisor/Engineering Consultant Intern',
      period: 'July 2021',
      year: 'August 2021',
      description: 'During my internship, I managed projects, oversaw team performance, and collaborated with the CEO to ensure the completion of generator installations across various sites.',
      responsibilities: [
        'Tracked project and team member performance to quickly intervene in mistakes or delays, ensuring efficient project completion.',
        'Collaborated with the CEO to maintain optimal levels of communication, effectively and efficiently completing projects.',
        'Worked with team members to reroute FPL cables through newly installed ATS, completing installations of various-sized generators and connecting them for autonomous operation.'
      ]
    }
  ];
  
  return (
    <WorkSection id="work">
      <div ref={titleRef}>
        <SectionTitle
          variants={titleVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          Work Experience
        </SectionTitle>
        
        <SectionSubtitle
          variants={titleVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
        >
          Professional journey and role experiences in the electrical engineering industry.
        </SectionSubtitle>
      </div>
      
      <Timeline ref={timelineRef}>
        {workExperiences.map((work, index) => (
          <TimelineEntry
            key={work.id}
            variants={timelineEntryVariants}
            custom={index}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
          >
            <TimelineDate>
              <Period>{work.period}</Period>
              <Year>{work.year}</Year>
            </TimelineDate>
            
            <TimelineDot />
            
            <TimelineContent>
              <CompanyName>{work.company}</CompanyName>
              <Position>{work.position}</Position>
              <Description>{work.description}</Description>
              
              <Skills>
                {work.responsibilities.map((responsibility, i) => (
                  <SkillItem key={i}>{responsibility}</SkillItem>
                ))}
              </Skills>
            </TimelineContent>
          </TimelineEntry>
        ))}
      </Timeline>
    </WorkSection>
  );
};

export default WorkExperience; 