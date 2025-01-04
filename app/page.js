"use client";
import { useEffect, useState } from "react";
import { ScanTable } from "@/components/scan-table";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/scans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
          per_page: perPage,
          query: search,
          category_id: selectedCategory || undefined,
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
    fetchData();
  }, [page, perPage, search, selectedCategory]);

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Free Tools</h1>
      <ScanTable
        data={data}
        page={page}
        perPage={perPage}
        search={search}
        selectedCategory={selectedCategory}
        onSearchChange={setSearch}
        onCategoryChange={setSelectedCategory}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
        isLoading={loading}
      />
    </div>
  );
}
