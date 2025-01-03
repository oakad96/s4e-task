import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/pagination";
import { useEffect } from "react";

const categories = [
  { id: 1, label: "DNS Controls" },
  { id: 2, label: "SSL Controls" },
  { id: 3, label: "Misconfiguration" },
  { id: 4, label: "Network Vulnerabilities" },
  { id: 5, label: "Web Vulnerabilities" },
  { id: 6, label: "Information Scans" },
  { id: 7, label: "Product Based Web Vulnerabilities" },
  { id: 8, label: "Product Based Network Vulnerabilities" },
];

export function ScanTable({
  data,
  page,
  perPage,
  search,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onPageChange,
  onPerPageChange,
  isLoading,
}) {
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, onSearchChange]);

  return (
    <div className="p-4 rounded-md">
      <div className="flex justify-start items-baseline gap-4 mb-4">
        <div>
          <Input
            placeholder="Search scans..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              data?.value?.data?.map((scan) => (
                <TableRow key={scan.slug}>
                  <TableCell className="font-medium">
                    {scan.meta_title}
                  </TableCell>
                  <TableCell>{scan.mini_desc}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Pagination
          page={page}
          perPage={perPage}
          total={data?.value?.total_count || 0}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
        />
      </div>
    </div>
  );
}
