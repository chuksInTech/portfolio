import React, { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    animateOnce = true,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (animateOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!animateOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );
    
    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, rootMargin, animateOnce]);
  
  return [domRef, isVisible];
};

export const ScrollFadeIn = ({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0,
  duration = 0.6,
  distance = 50,
  threshold = 0.1,
  once = true,
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold, animateOnce: once });
  
  const getTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      default: return `translateY(${distance}px)`;
    }
  };
  
  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        transform: isVisible ? 'translate(0)' : getTransform(),
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionProperty: 'transform, opacity',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {children}
    </div>
  );
};

// Staggered animation for lists
export const ScrollStagger = ({ 
  children,
  className = '',
  baseDelay = 0.1,
  staggerDelay = 0.1,
  threshold = 0.1,
}) => {
  const [ref, isVisible] = useScrollAnimation({ threshold });
  
  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s ease, transform 0.5s ease`,
            transitionDelay: `${baseDelay + index * staggerDelay}s`,
          },
        });
      })}
    </div>
  );
};