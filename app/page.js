"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ScanTable } from "@/components/scan-table";
import { X } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [perPage, setPerPage] = useState(
    Number(searchParams.get("per_page")) || 10
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    updateURL({ search: value, page: 1 });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    updateURL({ category: value, page: 1 });
  };

  const handlePageChange = (value) => {
    setPage(value);
    updateURL({ page: value });
  };

  const handlePerPageChange = (value) => {
    setPerPage(value);
    updateURL({ per_page: value, page: 1 });
  };

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
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
        isLoading={loading}
      />
    </div>
  );
}
