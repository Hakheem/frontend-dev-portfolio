import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface TransitionOptions {
  delay?: number;
  duration?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  transitionType?: 'slide' | 'fade' | 'zoom' | 'blur' | 'glitch' | 'morph';
  color?: string;
  gradient?: [string, string];
  pattern?: 'dots' | 'lines' | 'grid' | 'circular' | 'diagonal';
  showLoader?: boolean;
  loaderType?: 'spinner' | 'bars' | 'dots' | 'pulse';
}

const usePageTransition = () => {
  const router = useRouter();

  const navigateWithTransition = useCallback(async (
    href: string, 
    options: TransitionOptions = {}
  ) => {
    const { 
      delay = 200, 
      duration = 400, 
      direction = 'right',
      transitionType = 'slide',
      color = '#1f2937',
      gradient = ['#1f2937', '#111827'],
      pattern = 'dots',
      showLoader = true,
      loaderType = 'spinner'
    } = options;

    // Create overlay for transition effect
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: ${gradient ? `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)` : color};
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      ${getInitialStyle(transitionType, direction)}
      transition: all ${duration}ms cubic-bezier(0.65, 0, 0.35, 1);
    `;

    // Add pattern if specified
    if (pattern) {
      overlay.style.backgroundImage = getPatternStyle(pattern);
      overlay.style.backgroundSize = '100px 100px';
    }

    // Add loader if enabled
    if (showLoader) {
      const loader = document.createElement('div');
      loader.style.cssText = getLoaderStyle(loaderType);
      overlay.appendChild(loader);
    }

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Trigger animation
    requestAnimationFrame(() => {
      overlay.style.cssText += getFinalStyle(transitionType);
    });

    // Navigate after animation starts
    setTimeout(() => {
      router.push(href);
      
      // Clean up overlay after navigation
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.remove();
        }
        document.body.style.overflow = '';
      }, duration + 100);
    }, delay);
  }, [router]);

  return { navigateWithTransition };
};

const getInitialStyle = (type: string, direction: string): string => {
  switch (type) {
    case 'fade':
      return 'opacity: 0;';
    case 'zoom':
      return 'opacity: 0; transform: scale(1.2);';
    case 'blur':
      return 'opacity: 0; backdrop-filter: blur(0px);';
    case 'glitch':
      return 'opacity: 0; clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);';
    case 'morph':
      return 'opacity: 0; border-radius: 50%; transform: scale(0) rotate(180deg);';
    case 'slide':
    default:
      return `transform: ${getSlideTransform(direction)};`;
  }
};

const getFinalStyle = (type: string): string => {
  switch (type) {
    case 'fade':
      return 'opacity: 1;';
    case 'zoom':
      return 'opacity: 1; transform: scale(1);';
    case 'blur':
      return 'opacity: 1; backdrop-filter: blur(10px);';
    case 'glitch':
      return 'opacity: 1; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);';
    case 'morph':
      return 'opacity: 1; border-radius: 0; transform: scale(1) rotate(0deg);';
    case 'slide':
    default:
      return 'transform: translateX(0) translateY(0);';
  }
};

const getSlideTransform = (direction: string): string => {
  switch (direction) {
    case 'left':
      return 'translateX(-100%)';
    case 'right':
      return 'translateX(100%)';
    case 'up':
      return 'translateY(-100%)';
    case 'down':
      return 'translateY(100%)';
    default:
      return 'translateX(100%)';
  }
};

const getPatternStyle = (pattern: string): string => {
  switch (pattern) {
    case 'dots':
      return 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)';
    case 'lines':
      return 'repeating-linear-gradient(0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 1px, transparent 1px, transparent 10px)';
    case 'grid':
      return 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)';
    case 'circular':
      return 'repeating-radial-gradient(circle, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 4px, transparent 4px, transparent 10px)';
    case 'diagonal':
      return 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 2px, transparent 2px, transparent 12px)';
    default:
      return '';
  }
};

const getLoaderStyle = (type: string): string => {
  const baseStyle = `
    width: 48px;
    height: 48px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  `;

  switch (type) {
    case 'bars':
      return `
        display: flex;
        gap: 4px;
        align-items: flex-end;
        justify-content: center;
        width: 40px;
        height: 40px;
        
        &::before, &::after {
          content: '';
          width: 8px;
          background: white;
          animation: grow 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        &::before {
          height: 20px;
          animation-delay: -0.24s;
        }
        
        &::after {
          height: 28px;
          animation-delay: -0.48s;
        }
      `;
    case 'dots':
      return `
        display: flex;
        gap: 6px;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 20px;
        
        &::before, &::after {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          opacity: 0.6;
          animation: pulse 1.4s ease-in-out infinite both;
        }
        
        &::before {
          animation-delay: -0.32s;
        }
        
        &::after {
          animation-delay: -0.16s;
        }
      `;
    case 'pulse':
      return `
        width: 40px;
        height: 40px;
        background: white;
        border-radius: 50%;
        opacity: 0.6;
        animation: pulse 1.4s ease-in-out infinite both;
      `;
    case 'spinner':
    default:
      return baseStyle + `border-top-color: white;`;
  }
};

// Add these styles to your global CSS
const injectGlobalStyles = () => {
  if (typeof document !== 'undefined' && !document.getElementById('page-transition-styles')) {
    const style = document.createElement('style');
    style.id = 'page-transition-styles';
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes grow {
        0%, 100% { transform: scaleY(0.3); }
        50% { transform: scaleY(1); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(0.8); opacity: 0.6; }
        50% { transform: scale(1.2); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
};

// Inject styles when hook is imported
if (typeof window !== 'undefined') {
  injectGlobalStyles();
}

export default usePageTransition;
