import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = styled(motion.div)`
  background-color: var(--dark-surface);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const CardImage = styled.div`
  height: 240px;
  overflow: hidden;
  position: relative;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img, &:hover video {
    transform: scale(1.05);
  }
`;

const CardCategory = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.8rem;
  padding: 5px 10px;
  border-radius: 20px;
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: var(--light-text);
`;

const CardDate = styled.span`
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 15px;
  display: block;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: var(--light-text);
  opacity: 0.9;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: rgba(243, 156, 18, 0.1);
  color: var(--primary-color);
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardButtonLink = styled(Link)`
  background-color: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

const MotionCardButton = motion(CardButtonLink);

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

const MediaGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  
  .thumbnail {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    
    &.active {
      border-color: var(--primary-color);
    }
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  .video-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }
  
  .play-icon {
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 10px solid white;
    margin-left: 2px;
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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    } 
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
    transition: { 
      duration: 0.3,
      ease: "easeOut" 
    }
  }
};

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

const ProjectCard = ({ 
  image, 
  title, 
  date, 
  category, 
  description, 
  tags, 
  detailsUrl,
  isVideo = false,
  additionalMedia = []
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({ src: image, type: isVideo ? 'video' : 'image' });
  const [mediaVisible, setMediaVisible] = useState(false);
  
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
  
  const openLightbox = (e) => {
    e.preventDefault();
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  
  const handleMediaChange = (media) => {
    setCurrentMedia(media);
  };
  
  const handleImageError = (e) => {
    console.error(`Failed to load image: ${e.target.src}`);
    // Log complete URL for debugging
    const fullUrl = new URL(e.target.src);
    console.error('Complete URL that failed:', fullUrl.href);
    e.target.src = getAbsolutePath('/project-placeholder.jpg');
  };
  
  const handleVideoError = (e) => {
    console.error(`Failed to load video: ${e.target.src}`);
    // Try to debug by logging the actual URL that's failing
    const videoElement = e.target;
    if (videoElement.querySelectorAll('source').length > 0) {
      console.error('Sources:', Array.from(videoElement.querySelectorAll('source')).map(src => src.src));
    }
  };
  
  const handleImageLoad = () => {
    setMediaVisible(true);
    console.log(`Successfully loaded media for ${title}`);
  };
  
  // Check if file exists by making a HEAD request
  const checkFileExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const exists = response.ok;
      // Log additional details for debugging
      console.log(`File check for ${url}: status=${response.status}, exists=${exists}`);
      return exists;
    } catch (error) {
      console.error(`Error checking file at ${url}:`, error);
      return false;
    }
  };
  
  // Add effect to check if files exist on component mount
  useEffect(() => {
    const checkMediaFiles = async () => {
      const mainMediaUrl = getAbsolutePath(image);
      const exists = await checkFileExists(mainMediaUrl);
      console.log(`${title} main media (${mainMediaUrl}): ${exists ? 'EXISTS' : 'NOT FOUND'}`);
      
      // Log direct URL to test in browser
      console.log(`Direct URL to try in browser: ${mainMediaUrl}`);
      
      if (additionalMedia && additionalMedia.length > 0) {
        for (const media of additionalMedia) {
          const mediaUrl = getAbsolutePath(media.src);
          const mediaExists = await checkFileExists(mediaUrl);
          console.log(`${title} additional media (${mediaUrl}): ${mediaExists ? 'EXISTS' : 'NOT FOUND'}`);
        }
      }
    };
    
    checkMediaFiles();
  }, [title, image, additionalMedia]);
  
  // Combine main image with additional media, ensuring all paths use absolute URLs
  const allMedia = [
    { src: getAbsolutePath(image), type: isVideo ? 'video' : 'image' },
    ...(additionalMedia || []).map(media => ({
      ...media,
      src: getAbsolutePath(media.src)
    }))
  ];
  
  // Try a different approach using an Image object to test loading
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.onload = () => {
      console.log(`Successfully preloaded image: ${image}`);
    };
    preloadImage.onerror = () => {
      console.error(`Failed to preload image: ${image}`);
    };
    preloadImage.src = getAbsolutePath(image);
  }, [image]);
  
  return (
    <>
      <Card
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <CardImage onClick={openLightbox}>
          {isVideo ? (
            <video 
              loop 
              muted 
              autoPlay 
              playsInline
              poster={getAbsolutePath(image.replace('.mp4', '.jpg').replace('.MOV', '.jpg'))}
              onError={handleVideoError}
              onLoadedData={handleImageLoad}
              controls // Add controls to help debug
            >
              <source src={getAbsolutePath(image)} type="video/mp4" />
              <source src={getAbsolutePath(image)} type="video/quicktime" />
              <p>Your browser does not support the video tag. Try this direct link: 
                <a href={getAbsolutePath(image)} target="_blank" rel="noreferrer">Open video</a>
              </p>
            </video>
          ) : (
            <img 
              src={getAbsolutePath(image)} 
              alt={title} 
              onError={handleImageError} 
              onLoad={handleImageLoad}
              style={{ opacity: mediaVisible ? 1 : 0.3 }}
            />
          )}
          {category && <CardCategory>{category}</CardCategory>}
        </CardImage>
        
        {/* Add direct link for debugging */}
        <div style={{ fontSize: '10px', color: '#666', padding: '0.5rem', wordBreak: 'break-all' }}>
          Try direct URL: <a href={getAbsolutePath(image)} target="_blank" rel="noreferrer">{getAbsolutePath(image)}</a>
        </div>
        
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardDate>{date}</CardDate>
          <CardDescription>{description}</CardDescription>
          
          {tags && tags.length > 0 && (
            <CardTags>
              {tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </CardTags>
          )}
          
          <CardActions>
            <MotionCardButton 
              to={detailsUrl}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </MotionCardButton>
          </CardActions>
        </CardContent>
      </Card>
      
      {lightboxOpen && (
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
            {currentMedia.type === 'video' ? (
              <video 
                controls 
                autoPlay
                poster={getAbsolutePath(currentMedia.src.replace('.mp4', '.jpg').replace('.MOV', '.jpg'))}
                onError={handleVideoError}
                onLoadedData={handleImageLoad}
              >
                <source src={currentMedia.src} type="video/mp4" />
                <source src={currentMedia.src} type="video/quicktime" />
                <p>Your browser does not support the video tag. Try this direct link: 
                  <a href={currentMedia.src} target="_blank" rel="noreferrer">Open video</a>
                </p>
              </video>
            ) : (
              <img 
                src={currentMedia.src} 
                alt={title} 
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            )}
            
            {/* Add direct link for debugging */}
            <div style={{ fontSize: '12px', color: '#aaa', padding: '0.5rem', wordBreak: 'break-all' }}>
              URL: <a href={currentMedia.src} target="_blank" rel="noreferrer">{currentMedia.src}</a>
            </div>
            
            {allMedia.length > 1 && (
              <MediaGallery>
                {allMedia.map((media, index) => (
                  <div 
                    key={index}
                    className={`thumbnail ${currentMedia.src === media.src ? 'active' : ''}`}
                    onClick={() => handleMediaChange(media)}
                  >
                    {media.type === 'video' ? (
                      <>
                        <img 
                          src={getAbsolutePath("/project-placeholder.jpg")}
                          alt={`${title} video ${index + 1}`}
                          onError={handleImageError}
                        />
                        <div className="video-indicator">
                          <div className="play-icon"></div>
                        </div>
                      </>
                    ) : (
                      <img 
                        src={media.src} 
                        alt={`${title} ${index + 1}`}
                        onError={handleImageError}
                      />
                    )}
                  </div>
                ))}
              </MediaGallery>
            )}
          </LightboxContent>
        </Overlay>
      )}
    </>
  );
};

export default ProjectCard; 