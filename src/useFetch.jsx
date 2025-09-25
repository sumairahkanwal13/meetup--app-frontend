import { useState, useEffect } from "react";
const useFetch = (url, initialData) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch("https://meetup-app-orcin.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [url]);
  return { data, loading, error };
};
export default useFetch;