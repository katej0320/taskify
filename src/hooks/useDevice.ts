import { useState, useEffect } from 'react';

function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width >= 768 && width < 1024) return 'tablet';
  return 'desktop';
}

export function useDevice() {
  const [device, setDevice] = useState(getDeviceType());

  useEffect(() => {
    function handleResize() {
      setDevice(getDeviceType());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
}
