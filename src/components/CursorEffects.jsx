import React, { useEffect, useRef } from 'react';

export const CursorEffects = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const hoverElementsRef = useRef([]);

  useEffect(() => {
    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    cursorDotRef.current = cursorDot;

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    document.body.appendChild(cursorRing);
    cursorRingRef.current = cursorRing;

    // Apply styles
    const styles = document.createElement('style');
    styles.innerHTML = `
      .cursor-dot {
        position: fixed;
        top: 0;
        left: 0;
        width: 8px;
        height: 8px;
        background-color: #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.15s ease-in-out, transform 0.08s ease-in-out;
      }
      
      .cursor-ring {
        position: fixed;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(59, 130, 246, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border 0.3s, transform 0.15s ease-out;
      }
      
      .link-grow-cursor {
        width: 60px;
        height: 60px;
        border-color: rgba(59, 130, 246, 0.3);
        background-color: rgba(59, 130, 246, 0.1);
        mix-blend-mode: difference;
      }
    `;
    document.head.appendChild(styles);

    // Mouse move event
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Animate dot immediately for responsiveness
      cursorDotRef.current.style.left = `${clientX}px`;
      cursorDotRef.current.style.top = `${clientY}px`;
      
      // Animate ring with slight delay for smooth effect
      requestAnimationFrame(() => {
        cursorRingRef.current.style.left = `${clientX}px`;
        cursorRingRef.current.style.top = `${clientY}px`;
      });
    };

    // Track hover effects on interactive elements
    const trackHoverElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"], input[type="submit"], input[type="button"]');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursorRingRef.current.classList.add('link-grow-cursor');
          cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
          cursorRingRef.current.classList.remove('link-grow-cursor');
          cursorDotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        hoverElementsRef.current.push(el);
      });
    };

    // Hide cursor when leaving window
    const onMouseLeave = () => {
      cursorDotRef.current.style.opacity = '0';
      cursorRingRef.current.style.opacity = '0';
    };

    // Show cursor when entering window
    const onMouseEnter = () => {
      cursorDotRef.current.style.opacity = '1';
      cursorRingRef.current.style.opacity = '1';
    };

    // Setup event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Initial setup and observer for dynamically added elements
    trackHoverElements();
    
    const observer = new MutationObserver(() => {
      trackHoverElements();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      
      hoverElementsRef.current.forEach(el => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      
      if (cursorDotRef.current) document.body.removeChild(cursorDotRef.current);
      if (cursorRingRef.current) document.body.removeChild(cursorRingRef.current);
      document.head.removeChild(styles);
      observer.disconnect();
    };
  }, []);

  return null;
};