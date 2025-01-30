import pwa from "next-pwa";

const withPWA = pwa({
  dest: "public", // 컴파일된 Service Worker 파일을 저장할 위치
  register: true, // 서비스 워커 자동 등록
  skipWaiting: true, // 기존 워커 대기 없이 교체
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  /* config options here */
});

export default nextConfig;
