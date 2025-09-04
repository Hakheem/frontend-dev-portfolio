import { useCallback } from 'react';
import { scroller } from 'react-scroll';

interface SmoothScrollOptions {
  duration?: number;
  delay?: number;
  smooth?: string | boolean;
  offset?: number;
  isDynamic?: boolean;
  ignoreCancelEvents?: boolean;
}

const useSmoothScroll = (defaultOptions?: SmoothScrollOptions) => {
  const scrollTo = useCallback((
    target: string,
    options?: SmoothScrollOptions
  ) => {
    const finalOptions = {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80,
      isDynamic: true,
      ignoreCancelEvents: false,
      ...defaultOptions,
      ...options,
    };

    // Remove # from target if present
    const cleanTarget = target.replace('#', '');

    scroller.scrollTo(cleanTarget, finalOptions);
  }, [defaultOptions]);

  const scrollToTop = useCallback((options?: SmoothScrollOptions) => {
    const finalOptions = {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      ...defaultOptions,
      ...options,
    };

    scroller.scrollTo('top', finalOptions);
  }, [defaultOptions]);

  return { scrollTo, scrollToTop };
};

export default useSmoothScroll;
