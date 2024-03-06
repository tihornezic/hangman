import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";

type UseAxiosProps = AxiosRequestConfig & {
  enabled?: boolean;
};

export const useAxios = <T>({
  enabled = false,
  ...axiosParams
}: UseAxiosProps) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response: AxiosResponse<T> = await axios.request({
          ...axiosParams,
          signal: controller.signal,
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error getting the data");
        setLoading(false);
      }
    };

    if (enabled) fetchData();
    // fetchData();

    return () => controller.abort();
  }, [enabled]);

  return { data, error, loading };
};
