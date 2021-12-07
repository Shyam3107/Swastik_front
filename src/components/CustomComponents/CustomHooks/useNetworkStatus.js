import { useState, useEffect } from "react";

const useNetworkStatus = () => {
  const [isOnline, setOnline] = useState(navigator.onLine);

  const handleOnline = () => setOnline(true);

  const handleOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("online", handleOffline);
    };
  }, []);
  return isOnline;
};

export default useNetworkStatus;
