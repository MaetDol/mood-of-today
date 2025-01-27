import { useEffect, useState } from "react";

export enum Device {
  MOBILE = "mobile",
  DESKTOP = "desktop",
}
const getDeviceType = (width = 480): Device => {
  if (typeof window === "undefined") return Device.DESKTOP;
  return window.innerWidth <= width ? Device.MOBILE : Device.DESKTOP;
};

export function useDeviceSize() {
  const [device, setDevice] = useState<Device>(getDeviceType);
  useEffect(() => {
    const handler = () => {
      setDevice(getDeviceType());
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return device;
}
