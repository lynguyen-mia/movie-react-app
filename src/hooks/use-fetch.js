import { useState, useCallback } from "react";

const useFetch = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (fetchConfig, dataHandleFn) => {
    setError(null);
    try {
      const response = await fetch(fetchConfig.url, {
        method: fetchConfig.method ? fetchConfig.method : "GET",
        body: fetchConfig.body ? JSON.stringify(fetchConfig.body) : null,
        headers: fetchConfig.header ? fetchConfig.header : {}
      });

      if (!response.ok) {
        // throw new Error("Request failed!");
        console.log("Request failed!");
      }

      const data = await response.json();
      dataHandleFn(data);
    } catch (err) {
      console.error(err.message || "Something went wrong!");
    }
  }, []);

  return { error, sendRequest };
};

export default useFetch;
