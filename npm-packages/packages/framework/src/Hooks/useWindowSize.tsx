import { useLayoutEffect, useState } from 'react';

type WindowSize = {
  height: number;
  width: number;
};

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState({
    height: 0,
    width: 0,
  } as WindowSize);

  useLayoutEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        height: window.screen.height,
        width: window.screen.width,
      });
    };

    window.addEventListener('resize', updateWindowSize);
    updateWindowSize();

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  return windowSize;
}
