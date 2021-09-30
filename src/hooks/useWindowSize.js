import { useState, useEffect, useCallback } from 'react';

export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = useCallback(() => {
    return {
      width: isClient ? document.documentElement.clientWidth : undefined,
      height: isClient ? document.documentElement.clientHeight : undefined,
    };
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize());

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      setWindowSize(getSize);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getSize, isClient]);

  return windowSize;
};
