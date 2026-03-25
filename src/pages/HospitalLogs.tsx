import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const logs = [
  { id: "CLM-001", hospital: "SSKM Hospital", patient: "Abhijit Roy", amount: "₹45,200", status: "Approved", date: "2026-02-10", type: "Cardiology" },
  { id: "CLM-002", hospital: "Apollo Multispecialty", patient: "Priya Singh", amount: "₹1,12,000", status: "Flagged", date: "2026-02-09", type: "Orthopedic" },
  { id: "CLM-003", hospital: "AMRI Salt Lake", patient: "Subhash Das", amount: "₹28,500", status: "Rejected", date: "2026-02-09", type: "General" },
  { id: "CLM-004", hospital: "Woodlands Hospital", patient: "Sneha Ghosh", amount: "₹65,800", status: "Pending", date: "2026-02-08", type: "Neurology" },
  { id: "CLM-005", hospital: "Ruby General Hospital", patient: "Manoj Kumar", amount: "₹12,400", status: "Approved", date: "2026-02-08", type: "Dermatology" },
  { id: "CLM-006", hospital: "Peerless Hospital", patient: "Ananya Sen", amount: "₹1,85,000", status: "Flagged", date: "2026-02-07", type: "Oncology" },
  { id: "CLM-007", hospital: "Medica Superspecialty", patient: "Rahul Gupta", amount: "₹34,000", status: "Approved", date: "2026-02-07", type: "Urology" },
  { id: "CLM-008", hospital: "Fortis Hospital", patient: "Soma Bose", amount: "₹52,300", status: "Pending", date: "2026-02-06", type: "Gastroenterology" },
  { id: "CLM-009", hospital: "Narayana Health", patient: "Deepak Jha", amount: "₹98,000", status: "Approved", date: "2026-02-06", type: "Cardiology" },
  { id: "CLM-010", hospital: "Belle Vue Clinic", patient: "Tanmay Das", amount: "₹76,500", status: "Rejected", date: "2026-02-05", type: "Pediatrics" },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Approved':
      return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge>;
    case 'Flagged':
      return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"><AlertCircle className="w-3 h-3 mr-1" /> Flagged</Badge>;
    case 'Rejected':
      return <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
    default:
      return <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">Pending</Badge>;
  }
};

const HospitalLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">Hospital Claim Logs</h1>
          <p className="text-sm md:text-base text-muted-foreground">Monitor and manage all healthcare claims across the state</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-3 md:px-4 border-border/60 bg-white shadow-sm hover:bg-slate-50">
            <Download className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">Export CSV</span>
          </Button>
          <Button className="rounded-xl h-11 px-4 md:px-6 shadow-lg shadow-primary/20">
            <span className="hidden sm:inline">Manual </span>Audit
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border/50 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by Hospital, Patient or ID..." 
              className="pl-10 h-11 bg-slate-50 border-transparent focus-visible:bg-white focus-visible:ring-1 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-11 rounded-xl bg-slate-50 border-transparent">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11 rounded-xl px-4 border-border/60 bg-white shadow-sm hover:bg-slate-50">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-b-border/30">
                <TableHead className="font-bold text-primary py-5 px-6">Claim ID</TableHead>
                <TableHead className="font-bold text-primary">Hospital Name</TableHead>
                <TableHead className="font-bold text-primary">Patient Name</TableHead>
                <TableHead className="font-bold text-primary">Claim Date</TableHead>
                <TableHead className="font-bold text-primary">Department</TableHead>
                <TableHead className="font-bold text-primary">Amount</TableHead>
                <TableHead className="font-bold text-primary">Status</TableHead>
                <TableHead className="text-right px-6 font-bold text-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="hover:bg-slate-50/50 group transition-colors border-b-border/30">
                  <TableCell className="font-bold text-primary py-5 px-6">{log.id}</TableCell>
                  <TableCell className="font-medium">{log.hospital}</TableCell>
                  <TableCell>{log.patient}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {log.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal border-slate-200">{log.type}</Badge>
                  </TableCell>
                  <TableCell className="font-bold text-primary">{log.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={log.status} />
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-slate-200/50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-slate-200/50">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl shadow-xl border-border/50">
                          <DropdownMenuItem className="p-2.5 cursor-pointer rounded-lg mx-1 my-0.5">Approve Claim</DropdownMenuItem>
                          <DropdownMenuItem className="p-2.5 cursor-pointer rounded-lg mx-1 my-0.5">Flag for Review</DropdownMenuItem>
                          <DropdownMenuItem className="p-2.5 cursor-pointer rounded-lg mx-1 my-0.5 text-red-600 focus:text-red-600 focus:bg-red-50">Reject Claim</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-6 border-t border-border/50 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1-10 of 1,284 claims</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg bg-white shadow-sm border-border/60 disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg bg-white shadow-sm border-border/60 hover:bg-slate-50">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogs;
