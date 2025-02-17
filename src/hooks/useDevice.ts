"use client"; // 클라이언트에서만 실행되도록 설정

import { useState, useEffect } from "react";

export default function useDevice() {
  const [device, setDevice] = useState("desktop"); // 기본값 (SSR 대비)

  useEffect(() => {
    if (typeof window === "undefined") return; // 서버에서는 실행 안 함

    const getDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return "mobile";
      if (width >= 768 && width < 1024) return "tablet";
      return "desktop";
    };

    setDevice(getDeviceType()); // 마운트 시 한 번 실행

    const handleResize = () => setDevice(getDeviceType());
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}
