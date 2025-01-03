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

const categories = [
  "DNS Controls",
  "SSL Controls",
  "Misconfiguration",
  "Network Vulnerabilities",
  "Web Vulnerabilities",
  "Information Scans",
  "Product Based Web Vulnerabilities",
  "Product Based Network Vulnerabilities",
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
}) {
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
              <SelectItem key={category} value={category}>
                {category}
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
            {data?.value?.data?.map((scan) => (
              <TableRow key={scan.slug}>
                <TableCell className="font-medium">{scan.meta_title}</TableCell>
                <TableCell>{scan.mini_desc}</TableCell>
              </TableRow>
            ))}
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
