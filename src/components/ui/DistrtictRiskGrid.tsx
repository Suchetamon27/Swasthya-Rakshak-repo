import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type District = {
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  fraudCount: number;
  totalClaims: number;
  fraudRate: number;
};

const DistrictRiskGrid = () => {
  const [districts, setDistricts] = useState<District[]>([
    // High Risk Districts (>8% fraud rate)
    { name: 'Nadia', riskLevel: 'high', fraudCount: 89, totalClaims: 720, fraudRate: 12.4 },
    { name: 'Murshidabad', riskLevel: 'high', fraudCount: 67, totalClaims: 580, fraudRate: 11.6 },
    { name: 'Kolkata', riskLevel: 'high', fraudCount: 124, totalClaims: 1250, fraudRate: 9.9 },
    { name: 'Birbhum', riskLevel: 'high', fraudCount: 52, totalClaims: 560, fraudRate: 9.3 },
    { name: 'Malda', riskLevel: 'high', fraudCount: 34, totalClaims: 420, fraudRate: 8.1 },
    
    // Medium Risk Districts (4-8% fraud rate)
    { name: 'North Dinajpur', riskLevel: 'medium', fraudCount: 28, totalClaims: 380, fraudRate: 7.4 },
    { name: 'South Dinajpur', riskLevel: 'medium', fraudCount: 22, totalClaims: 320, fraudRate: 6.9 },
    { name: 'Paschim Medinipur', riskLevel: 'medium', fraudCount: 41, totalClaims: 680, fraudRate: 6.0 },
    { name: 'Howrah', riskLevel: 'medium', fraudCount: 45, totalClaims: 890, fraudRate: 5.1 },
    { name: 'North 24 Parganas', riskLevel: 'medium', fraudCount: 52, totalClaims: 1100, fraudRate: 4.7 },
    { name: 'Hooghly', riskLevel: 'medium', fraudCount: 36, totalClaims: 780, fraudRate: 4.6 },
    { name: 'Paschim Bardhaman', riskLevel: 'medium', fraudCount: 29, totalClaims: 640, fraudRate: 4.5 },
    { name: 'South 24 Parganas', riskLevel: 'medium', fraudCount: 38, totalClaims: 950, fraudRate: 4.0 },
    
    // Low Risk Districts (<4% fraud rate)
    { name: 'Purba Medinipur', riskLevel: 'low', fraudCount: 24, totalClaims: 620, fraudRate: 3.9 },
    { name: 'Purba Bardhaman', riskLevel: 'low', fraudCount: 21, totalClaims: 580, fraudRate: 3.6 },
    { name: 'Bankura', riskLevel: 'low', fraudCount: 18, totalClaims: 520, fraudRate: 3.5 },
    { name: 'Jalpaiguri', riskLevel: 'low', fraudCount: 15, totalClaims: 450, fraudRate: 3.3 },
    { name: 'Darjeeling', riskLevel: 'low', fraudCount: 12, totalClaims: 380, fraudRate: 3.2 },
    { name: 'Purulia', riskLevel: 'low', fraudCount: 10, totalClaims: 310, fraudRate: 3.2 },
    { name: 'Jhargram', riskLevel: 'low', fraudCount: 8, totalClaims: 260, fraudRate: 3.1 },
    { name: 'Kalimpong', riskLevel: 'low', fraudCount: 6, totalClaims: 210, fraudRate: 2.9 },
    { name: 'Cooch Behar', riskLevel: 'low', fraudCount: 8, totalClaims: 290, fraudRate: 2.8 },
    { name: 'Alipurduar', riskLevel: 'low', fraudCount: 7, totalClaims: 250, fraudRate: 2.8 },
  ]);

  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDistricts(prev => prev.map(district => {
        // Randomly update fraud counts (simulated)
        const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newFraudCount = Math.max(0, district.fraudCount + change);
        const newFraudRate = (newFraudCount / district.totalClaims) * 100;
        
        let newRiskLevel: 'low' | 'medium' | 'high' = 'low';
        if (newFraudRate > 8) newRiskLevel = 'high';
        else if (newFraudRate > 4) newRiskLevel = 'medium';

        return {
          ...district,
          fraudCount: newFraudCount,
          fraudRate: newFraudRate,
          riskLevel: newRiskLevel
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-500 border-red-600 shadow-red-500/50';
      case 'medium':
        return 'bg-amber-500 border-amber-600 shadow-amber-500/50';
      case 'low':
        return 'bg-emerald-500 border-emerald-600 shadow-emerald-500/50';
      default:
        return 'bg-slate-500';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4" />;
      case 'low':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          District Risk Grid - Geo-Analytics
        </CardTitle>
        <CardDescription>
          Real-time fraud risk visualization across West Bengal districts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {districts.map((district) => (
            <div
              key={district.name}
              onClick={() => setSelectedDistrict(district)}
              className={cn(
                "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105",
                getRiskColor(district.riskLevel),
                "shadow-lg hover:shadow-xl",
                selectedDistrict?.name === district.name && "ring-4 ring-primary ring-offset-2"
              )}
            >
              <div className="flex flex-col items-center text-white">
                <div className="mb-2">
                  {getRiskIcon(district.riskLevel)}
                </div>
                <h3 className="font-bold text-sm text-center mb-1">{district.name}</h3>
                <div className="text-xs opacity-90">
                  <div className="font-semibold">{district.fraudCount} frauds</div>
                  <div>{district.fraudRate.toFixed(1)}% rate</div>
                </div>
              </div>
              
              {/* Pulse animation for high risk */}
              {district.riskLevel === 'high' && (
                <div className="absolute inset-0 rounded-lg bg-red-500 animate-ping opacity-20" />
              )}
            </div>
          ))}
        </div>

        {/* Selected District Details */}
        {selectedDistrict && (
          <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {selectedDistrict.name} District Details
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <Badge className={cn(
                  "mt-1",
                  selectedDistrict.riskLevel === 'high' && "bg-red-100 text-red-700 border-red-300",
                  selectedDistrict.riskLevel === 'medium' && "bg-amber-100 text-amber-700 border-amber-300",
                  selectedDistrict.riskLevel === 'low' && "bg-emerald-100 text-emerald-700 border-emerald-300"
                )}>
                  {selectedDistrict.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fraud Count</p>
                <p className="text-2xl font-bold text-destructive">{selectedDistrict.fraudCount}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold text-primary">{selectedDistrict.totalClaims}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fraud Rate</p>
                <p className="text-2xl font-bold text-amber-600">{selectedDistrict.fraudRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-emerald-500 border-2 border-emerald-600" />
            <span className="text-sm text-muted-foreground">Low Risk (&lt;4%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500 border-2 border-amber-600" />
            <span className="text-sm text-muted-foreground">Medium Risk (4-8%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500 border-2 border-red-600" />
            <span className="text-sm text-muted-foreground">High Risk (&gt;8%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DistrictRiskGrid;
