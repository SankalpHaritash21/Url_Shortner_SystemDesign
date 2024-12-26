import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Hop = {
  url: string;
  statusCode: number;
};

type TrackingResult = {
  hops: Hop[];
  finalUrl: string;
};

interface TraceTableProps {
  result: TrackingResult;
}

function getStatusCodeColor(statusCode: number): string {
  if (statusCode >= 200 && statusCode < 300)
    return "bg-green-100 text-green-800";
  if (statusCode >= 300 && statusCode < 400)
    return "bg-yellow-100 text-yellow-800";
  if (statusCode >= 400 && statusCode < 500) return "bg-red-100 text-red-800";
  return "bg-gray-100 text-gray-800";
}

function getDomainFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.startsWith("www.") ? domain.slice(4) : domain;
  } catch {
    return url;
  }
}

export function TraceTable({ result }: TraceTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">HOP</TableHead>
            <TableHead className="w-[120px]">Status Code</TableHead>
            <TableHead className="w-[200px]">Destination Domain</TableHead>
            <TableHead>Complete URL</TableHead>
            <TableHead className="w-[120px]">WHOIS Record</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.hops.map((hop, index) => {
            const isLastHop = index === result.hops.length - 1;
            const domain = getDomainFromUrl(hop.url);
            return (
              <TableRow
                key={index}
                className={isLastHop ? "border-red-500 border-2" : ""}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusCodeColor(
                      hop.statusCode
                    )}`}
                  >
                    {hop.statusCode}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{domain}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate" title={hop.url}>
                  {hop.url}
                </TableCell>
                <TableCell>
                  <a
                    href={`https://whois.com/whois/${domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    WHOIS
                  </a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
