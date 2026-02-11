import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShieldAlert, 
  Wallet, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  FileSearch,
  AlertTriangle,
  Hospital,
  User as UserIcon,
  MapPin,
  Stethoscope,
  FileText,
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  AlertOctagon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useAppContext } from '@/contexts/AppContext';
import DistrictRiskGrid from '@/components/DistrictRiskGrid';

const data = [
  { name: 'Jan', claims: 4000, fraud: 240, saved: 2400 },
  { name: 'Feb', claims: 3000, fraud: 139, saved: 2210 },
  { name: 'Mar', claims: 2000, fraud: 980, saved: 2290 },
  { name: 'Apr', claims: 2780, fraud: 390, saved: 2000 },
  { name: 'May', claims: 1890, fraud: 480, saved: 2181 },
  { name: 'Jun', claims: 2390, fraud: 380, saved: 2500 },
  { name: 'Jul', claims: 3490, fraud: 430, saved: 2100 },
];

const initialClaimsData = [
  { id: "CLM-001", patient: "Amit Roy", hospital: "Apollo Gleneagles", district: "Kolkata", amount: "₹45,200", status: "Approved", date: "2026-02-10", diagnosis: "Cardiac Arrest", summary: "Patient admitted with chest pain. ECG showed ST elevation." },
  { id: "CLM-002", patient: "Priya Das", hospital: "Nadia District Hospital", district: "Nadia", amount: "₹12,400", status: "Flagged", date: "2026-02-10", diagnosis: "Viral Fever", summary: "High fever for 3 days. Platelet count normal." },
  { id: "CLM-003", patient: "Rahim Khan", hospital: "City Life", district: "Malda", amount: "₹34,000", status: "Review", date: "2026-02-09", diagnosis: "Fracture", summary: "Right leg tibia fracture. Plaster applied." },
  { id: "CLM-004", patient: "Soumen Sarkar", hospital: "Bankura Sammilani", district: "Bankura", amount: "₹56,800", status: "Approved", date: "2026-02-09", diagnosis: "Appendicitis", summary: "Emergency appendectomy performed. Appendix removed." },
  { id: "CLM-005", patient: "Anjali Sharma", hospital: "Apollo Gleneagles", district: "Kolkata", amount: "₹89,000", status: "Flagged", date: "2026-02-08", diagnosis: "Cataract", summary: "Bilateral cataract surgery." },
  { id: "CLM-006", patient: "Bikram Das", hospital: "SSKM Hospital", district: "Kolkata", amount: "₹1,20,000", status: "Approved", date: "2026-02-08", diagnosis: "Kidney Stone", summary: "Laser lithotripsy performed for 12mm stone." },
  { id: "CLM-007", patient: "Mousumi Pal", hospital: "Nadia District Hospital", district: "Nadia", amount: "₹22,500", status: "Review", date: "2026-02-07", diagnosis: "Dengue", summary: "Admitted with low platelets. Supportive care given." },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'Approved':
      return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 font-medium"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge>;
    case 'Flagged':
      return <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 font-medium"><XCircle className="w-3 h-3 mr-1" /> Flagged</Badge>;
    case 'Review':
      return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 font-medium"><AlertOctagon className="w-3 h-3 mr-1" /> Review</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const KPICard = ({ title, value, subValue, icon: Icon, color, trend, trendValue }: any) => {
  const colorMap: any = {
    red: "from-red-500/20 to-red-600/10 border-red-500/20 text-red-600",
    green: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/20 text-emerald-600",
    yellow: "from-amber-400/20 to-amber-500/10 border-amber-400/20 text-amber-600",
    blue: "from-blue-500/20 to-blue-600/10 border-blue-500/20 text-blue-600",
  };

  const bgIconMap: any = {
    red: "bg-red-500/10",
    green: "bg-emerald-500/10",
    yellow: "bg-amber-500/10",
    blue: "bg-blue-500/10",
  };

  return (
    <Card className={`relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white/40 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group`}>
      <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${colorMap[color].split(' ')[0]} ${colorMap[color].split(' ')[1]}`} />
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <h3 className="text-3xl font-extrabold text-primary tracking-tight">{value}</h3>
            <div className="flex items-center gap-2">
              <span className={cn(
                "flex items-center text-xs font-bold px-2 py-0.5 rounded-full",
                trend === 'up' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              )}>
                {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {trendValue}
              </span>
              <span className="text-xs text-muted-foreground font-medium">{subValue}</span>
            </div>
          </div>
          <div className={`p-4 rounded-2xl ${bgIconMap[color]} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${colorMap[color].split(' ').pop()}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

const Dashboard = () => {
  const { addLog, kpiStats, setKpiStats } = useAppContext();
  const [claimsData, setClaimsData] = useState(initialClaimsData);
  const [testClaim, setTestClaim] = useState({
    diagnosis: '',
    amount: '',
    gender: '',
    summary: ''
  });
  const [riskScore, setRiskScore] = useState(0);
  const [riskStatus, setRiskStatus] = useState<'safe' | 'warning' | 'danger'>('safe');
  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const analyzeClaim = () => {
    addLog(`Analyzing new claim: ${testClaim.diagnosis}...`);
    let score = 20; // Base risk
    let status: 'safe' | 'warning' | 'danger' = 'safe';

    const amount = parseFloat(testClaim.amount);

    if (testClaim.diagnosis === 'Cataract' && amount > 25000) {
      score = 90;
      status = 'danger';
      addLog(`RISK DETECTED: Cataract claim > ₹25,000 (₹${amount})`);
    } else if (testClaim.diagnosis === 'Appendicitis' && !testClaim.summary.toLowerCase().includes('appendix')) {
      score = 95;
      status = 'danger';
      addLog(`FRAUD ALERT: Appendicitis claim missing 'appendix' keyword`);
    } else if (testClaim.diagnosis === 'Cardiac' && amount < 10000) {
      score = 80;
      status = 'warning';
      addLog(`ANOMALY: Low cost for Cardiac procedure`);
    } else {
      score = 15;
      addLog(`Claim analysis complete. Risk level: Low`);
    }

    setRiskScore(score);
    setRiskStatus(status);
  };

  const simulateSurge = () => {
    addLog('WARNING: SURGE DETECTED FROM APOLLO GLENEAGLES');
    const newClaims = Array(10).fill(null).map((_, i) => ({
      id: `SURGE-${Math.floor(Math.random() * 10000)}`,
      patient: `Unknown Patient ${i+1}`,
      hospital: "Apollo Gleneagles",
      district: "Kolkata",
      amount: "₹45,000",
      status: "Flagged",
      date: new Date().toISOString().split('T')[0],
      diagnosis: "Cataract",
      summary: "Routine checkup turned into surgery."
    }));

    setClaimsData(prev => [...newClaims, ...prev]);
    setKpiStats(prev => ({
      ...prev,
      total: prev.total + 10,
      fraud: prev.fraud + 10,
      pending: prev.pending + 10
    }));
    
    addLog('Surge claims ingested. 10 flagged for immediate review.');
  };

  const handleRowClick = (claim: any) => {
    setSelectedClaim(claim);
    // Simulate AI analysis for existing claims
    let reason = "Routine verification required.";
    if (claim.amount.replace(/[^0-9]/g, '') > 50000 && claim.diagnosis === 'Cataract') reason = "Cost Mismatch: Exceeds standard rates for Cataract.";
    if (claim.status === 'Flagged') reason = "Pattern Match: Similar to known fraud cluster #429.";
    if (claim.status === 'Review') reason = "Data Inconsistency: Discharge summary date mismatch.";
    
    setAnalysisResult(reason);
    setIsModalOpen(true);
    addLog(`Opening evidence file for ${claim.id}`);
  };

  const handleDecision = (decision: 'Approve' | 'Reject') => {
    if (!selectedClaim) return;
    
    addLog(`${decision} claim ${selectedClaim.id}`);
    
    setClaimsData(prev => prev.map(c => c.id === selectedClaim.id ? { 
      ...c, 
      status: decision === 'Approve' ? 'Approved' : 'Flagged' // Reject effectively means flagged as fraud in this context or we can add 'Rejected'
    } : c));

    setKpiStats(prev => ({
      ...prev,
      funds: decision === 'Reject' ? prev.funds + parseInt(selectedClaim.amount.replace(/[^0-9]/g, '')) : prev.funds,
      fraud: decision === 'Reject' ? prev.fraud + 1 : prev.fraud,
      pending: prev.pending > 0 ? prev.pending - 1 : 0
    }));

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Controls */}
      <div className="flex justify-end">
        <Button onClick={simulateSurge} variant="destructive" className="animate-pulse shadow-lg shadow-red-500/20">
          <Zap className="w-4 h-4 mr-2" />
          Simulate Surge
        </Button>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Claims" 
          value={kpiStats.total.toLocaleString()} 
          subValue="vs last month" 
          icon={Users} 
          color="blue" 
          trend="up" 
          trendValue="+12.5%" 
        />
        <KPICard 
          title="Fraud Detected" 
          value={kpiStats.fraud.toLocaleString()} 
          subValue="vs last month" 
          icon={ShieldAlert} 
          color="red" 
          trend="up" 
          trendValue="+4.2%" 
        />
        <KPICard 
          title="Funds Saved" 
          value={`₹${(kpiStats.funds / 10000000).toFixed(2)} Cr`} 
          subValue="vs last month" 
          icon={Wallet} 
          color="green" 
          trend="up" 
          trendValue="+18.7%" 
        />
        <KPICard 
          title="Pending Review" 
          value={kpiStats.pending.toLocaleString()} 
          subValue="vs yesterday" 
          icon={Clock} 
          color="yellow" 
          trend="down" 
          trendValue="-2.1%" 
        />
      </div>

      {/* District Risk Grid */}
      <DistrictRiskGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area - Left Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Analytics Section */}
          <Card className="bg-white/60 backdrop-blur-lg border-white/40 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
              <div>
                <CardTitle className="text-lg font-bold">Claim & Fraud Trends</CardTitle>
                <CardDescription>Monthly overview of processed claims and detected fraud cases</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full h-8 px-4">Download Report</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="claims" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorClaims)" />
                    <Area type="monotone" dataKey="fraud" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorFraud)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Claims Table */}
          <Card className="bg-white/60 backdrop-blur-lg border-white/40 shadow-lg overflow-hidden">
            <CardHeader className="p-6 border-b border-border/50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Recent Claims Activity</CardTitle>
                <CardDescription>Live feed of healthcare claims from various districts</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl h-9 border-border/60 hover:bg-slate-50 transition-colors">
                View All Logs
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-b-border/30">
                      <TableHead className="font-bold text-primary py-4 px-6">Claim ID</TableHead>
                      <TableHead className="font-bold text-primary">Patient</TableHead>
                      <TableHead className="font-bold text-primary">Hospital</TableHead>
                      <TableHead className="font-bold text-primary">District</TableHead>
                      <TableHead className="font-bold text-primary">Amount</TableHead>
                      <TableHead className="font-bold text-primary">Status</TableHead>
                      <TableHead className="font-bold text-primary">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claimsData.map((claim) => (
                      <TableRow 
                        key={claim.id} 
                        className="hover:bg-blue-50/50 group transition-colors border-b-border/30 cursor-pointer"
                        onClick={() => handleRowClick(claim)}
                      >
                        <TableCell className="font-bold text-primary py-4 px-6">{claim.id}</TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-muted-foreground" />
                            {claim.patient}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Hospital className="w-4 h-4 text-muted-foreground" />
                            {claim.hospital}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {claim.district}
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-primary">{claim.amount}</TableCell>
                        <TableCell>
                          <StatusBadge status={claim.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{claim.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Test New Claim */}
        <div className="space-y-8">
          <Card className="bg-white rounded-3xl border border-border/50 shadow-xl overflow-hidden sticky top-24">
            <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 border-b border-border/50 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Stethoscope className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-primary">Test New Claim</CardTitle>
              </div>
              <CardDescription>
                Run AI verification on a new claim entry.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Select 
                    value={testClaim.diagnosis} 
                    onValueChange={(val) => setTestClaim({...testClaim, diagnosis: val})}
                  >
                    <SelectTrigger id="diagnosis" className="h-11 bg-slate-50">
                      <SelectValue placeholder="Select Diagnosis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cataract">Cataract</SelectItem>
                      <SelectItem value="Appendicitis">Appendicitis</SelectItem>
                      <SelectItem value="Cardiac">Cardiac</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Bill Amount (₹)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="e.g. 25000" 
                      className="h-11 bg-slate-50"
                      value={testClaim.amount}
                      onChange={(e) => setTestClaim({...testClaim, amount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={testClaim.gender} 
                      onValueChange={(val) => setTestClaim({...testClaim, gender: val})}
                    >
                      <SelectTrigger id="gender" className="h-11 bg-slate-50">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Discharge Summary</Label>
                  <Textarea 
                    id="summary" 
                    placeholder="Enter key findings..." 
                    className="h-32 bg-slate-50 resize-none" 
                    value={testClaim.summary}
                    onChange={(e) => setTestClaim({...testClaim, summary: e.target.value})}
                  />
                </div>

                <Button onClick={analyzeClaim} className="w-full h-11 text-lg font-bold shadow-lg shadow-primary/20">
                  <Activity className="w-5 h-5 mr-2" />
                  Analyze Risk
                </Button>
              </div>

              {/* Risk Meter */}
              <div className="space-y-3 pt-4 border-t border-border/50">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Risk Score</span>
                  <span className={cn(
                    "font-black text-xl",
                    riskStatus === 'danger' ? "text-red-600" : 
                    riskStatus === 'warning' ? "text-amber-500" : "text-emerald-600"
                  )}>{riskScore}%</span>
                </div>
                <Progress value={riskScore} className={cn(
                  "h-3",
                  riskStatus === 'danger' ? "bg-red-100 [&>div]:bg-red-600" : 
                  riskStatus === 'warning' ? "bg-amber-100 [&>div]:bg-amber-500" : "bg-emerald-100 [&>div]:bg-emerald-600"
                )} />
                <p className="text-xs text-center font-medium text-muted-foreground">
                  {riskStatus === 'danger' ? 'High Risk Detected - Recommend Rejection' : 
                   riskStatus === 'warning' ? 'Moderate Risk - Manual Review Needed' : 
                   'Low Risk - Safe to Process'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Evidence Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-[#f8fafc]">
          <div className="grid grid-cols-1 md:grid-cols-2 h-[600px]">
            {/* Left Side - Scanned Document View */}
            <div className="bg-white p-8 border-r border-border/50 overflow-y-auto relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500" />
              <div className="mb-6 flex justify-between items-start opacity-70">
                <div className="border-2 border-black p-2 rounded-sm inline-block">
                  <h3 className="font-serif font-bold text-xl uppercase tracking-widest">Medical Record</h3>
                </div>
                <div className="text-right font-mono text-xs">
                  <p>REF: {selectedClaim?.id}</p>
                  <p>DATE: {selectedClaim?.date}</p>
                </div>
              </div>
              
              <div className="space-y-6 font-serif text-sm leading-relaxed opacity-90">
                <div className="border-b border-black/10 pb-4">
                  <p className="font-bold text-xs uppercase text-muted-foreground mb-1">Patient Details</p>
                  <p className="text-lg">{selectedClaim?.patient}</p>
                  <p className="text-muted-foreground">District: {selectedClaim?.district}</p>
                </div>
                
                <div className="border-b border-black/10 pb-4">
                  <p className="font-bold text-xs uppercase text-muted-foreground mb-1">Diagnosis</p>
                  <p className="font-bold">{selectedClaim?.diagnosis || "Not Specified"}</p>
                </div>

                <div className="bg-yellow-50/50 p-4 border border-yellow-100 rounded-sm">
                  <p className="font-bold text-xs uppercase text-muted-foreground mb-2">Discharge Summary (OCR Scanned)</p>
                  <p className="italic">
                    "{selectedClaim?.summary || "Patient admitted with severe symptoms. Standard protocols followed. Discharged in stable condition after 3 days of observation and treatment."}"
                  </p>
                </div>

                <div>
                  <p className="font-bold text-xs uppercase text-muted-foreground mb-1">Billing</p>
                  <div className="flex justify-between items-center border-t border-black border-dashed pt-2 mt-2">
                    <span>Total Amount</span>
                    <span className="font-bold text-lg">{selectedClaim?.amount}</span>
                  </div>
                </div>
              </div>

              {/* Stamp Effect */}
              <div className="absolute bottom-12 right-12 border-4 border-red-500/30 text-red-500/30 rounded-full w-32 h-32 flex items-center justify-center -rotate-12 pointer-events-none">
                <span className="font-black text-2xl uppercase">Confidential</span>
              </div>
            </div>

            {/* Right Side - AI Analysis */}
            <div className="bg-slate-50/50 p-8 flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-lg text-primary">AI Analysis Report</h3>
                </div>
                <p className="text-sm text-muted-foreground">Automated risk assessment performed by Neural Engine v2.4</p>
              </div>

              <div className="flex-1 space-y-6">
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertOctagon className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-900 text-sm">Primary Flag</h4>
                      <p className="text-red-700 text-sm mt-1">{analysisResult}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Risk Factors</h4>
                  {[
                    { label: "Cost Deviation", val: "High", col: "text-red-600" },
                    { label: "Document Authenticity", val: "Verified", col: "text-green-600" },
                    { label: "Provider History", val: "Flagged", col: "text-amber-600" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-white rounded-lg border border-border/50 shadow-sm">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className={`text-sm font-bold ${item.col}`}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-12 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                  onClick={() => handleDecision('Reject')}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject Claim
                </Button>
                <Button 
                  className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20"
                  onClick={() => handleDecision('Approve')}
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
