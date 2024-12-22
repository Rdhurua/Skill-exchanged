import { scroller } from 'react-scroll';

const goToSection = (sectionId) => {
  scroller.scrollTo(sectionId, {
    duration: 500,      // Smooth scroll duration in milliseconds
    delay: 0,           // Delay before scrolling starts
    smooth: 'easeInOutQuart', // Smooth animation type
    offset: -70,        // Offset to account for sticky headers (adjust as needed)
  });
};

export default goToSection;
