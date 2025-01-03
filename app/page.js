"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const fetchData = async (pageNumber) => {
    try {
      setLoading(true);
      const response = await fetch("/api/scans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: pageNumber,
          per_page: perPage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page, perPage]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Scan Results</h1>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="px-4 py-2 border rounded"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={30}>30 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
}
