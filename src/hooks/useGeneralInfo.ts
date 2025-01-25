import { useEffect, useState } from "react";

export interface GeneralInfo {
  _id: string;
  name: string;
  title: string;
  about: string;
  resumeURL: string;
  logo: string;
  avatar: string;
}

const useGeneralInfo = () => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeneralInfo = async () => {
      try {
        const response = await fetch("/api/generalinfos");
        if (!response.ok) {
          throw new Error("Failed to fetch general info");
        }
        const output = await response.json();
        const dataan: GeneralInfo = await output[0];
        setGeneralInfo(dataan);
      } catch (error) {
        console.error("Error fetching general info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGeneralInfo();
  }, []);

  return { generalInfo, loading };
};

export default useGeneralInfo;
