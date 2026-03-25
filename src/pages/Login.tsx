import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Fingerprint, Lock, User, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('swasthya@123');
  const [showPassword, setShowPassword] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState('');

  useEffect(() => {
    // Auto-fill animation
    const timer = setTimeout(() => {
      setUsername('Admin');
      setPassword('swasthya@123');
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'Admin' && password === 'swasthya@123') {
      setIsScanning(true);
      setScanProgress(0);
      
      const stages = [
        'Initializing secure connection...',
        'Verifying credentials...',
        'Scanning biometric signature...',
        'Validating government clearance...',
        'Establishing encrypted session...',
        'Access granted!'
      ];

      for (let i = 0; i < stages.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setScanStage(stages[i]);
        setScanProgress(((i + 1) / stages.length) * 100);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      login();
      navigate('/');
    } else {
      alert('Invalid credentials. Use Admin / swasthya@123');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-2 border-blue-200/50 shadow-2xl relative z-10">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">
              Shasthya-Rakshak
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-3 uppercase tracking-widest font-bold">
              Secure Admin Portal
            </p>
            <p className="text-sm font-semibold text-primary mt-2 tracking-wide">
              WEST BENGAL
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!isScanning ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-bold text-slate-700">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 h-12 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-bold text-slate-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 pr-11 h-12 bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                <p className="font-bold mb-1">🔐 Demo Credentials (Auto-filled)</p>
                <p className="font-mono">Username: <span className="font-bold">Admin</span></p>
                <p className="font-mono">Password: <span className="font-bold">swasthya@123</span></p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30"
              >
                <Fingerprint className="w-5 h-5 mr-2" />
                Secure Login
              </Button>
            </form>
          ) : (
            <div className="space-y-6 py-8">
              {/* Biometric Scanner Animation */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Fingerprint className="w-16 h-16 text-blue-600 animate-pulse" />
                </div>
                {/* Scanning Line */}
                <div 
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"
                  style={{ 
                    top: `${scanProgress}%`,
                    transition: 'top 0.3s ease-out'
                  }}
                />
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <p className="text-center text-sm font-bold text-slate-700 animate-pulse">
                  {scanStage}
                </p>
              </div>

              {scanProgress === 100 && (
                <div className="flex items-center justify-center gap-2 text-green-600 animate-fade-in">
                  <CheckCircle2 className="w-6 h-6" />
                  <span className="font-bold">Authentication Successful</span>
                </div>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-center text-slate-500">
              © Shasthya Rakshak 2026. All rights reserved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
