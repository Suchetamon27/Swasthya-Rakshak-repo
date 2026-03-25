import React, { useState } from 'react';
import { 
  Bell, 
  Lock, 
  User, 
  Shield, 
  Globe, 
  Database,
  Cloud,
  Mail,
  Save,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type ProfileData = {
  fullName: string;
  email: string;
  department: string;
  role: string;
};

type SystemPreferences = {
  autoVerification: boolean;
  realTimeSync: boolean;
};

type NotificationSettings = {
  highValueClaims: boolean;
  fraudPattern: boolean;
  systemOutage: boolean;
};

const Settings = () => {
  const { toast } = useToast();

  // Profile state
  const [profile, setProfile] = useState<ProfileData>({
    fullName: 'Dr. Sourav Ganguly',
    email: 'sourav.ganguly@wbhealth.gov.in',
    department: 'Health & Family Welfare',
    role: 'Admin Secretary'
  });

  const [originalProfile, setOriginalProfile] = useState<ProfileData>({ ...profile });

  // System preferences state
  const [preferences, setPreferences] = useState<SystemPreferences>({
    autoVerification: true,
    realTimeSync: true
  });

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    highValueClaims: true,
    fraudPattern: true,
    systemOutage: true
  });

  // Handle profile input changes
  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Save profile changes
  const handleSaveProfile = () => {
    setOriginalProfile({ ...profile });
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
      duration: 3000,
    });
  };

  // Cancel profile changes
  const handleCancelProfile = () => {
    setProfile({ ...originalProfile });
    toast({
      title: "Changes Discarded",
      description: "Profile changes have been cancelled.",
      variant: "destructive",
      duration: 3000,
    });
  };

  // Handle preference toggle
  const handlePreferenceToggle = (field: keyof SystemPreferences) => {
    setPreferences(prev => {
      const newValue = !prev[field];
      toast({
        title: field === 'autoVerification' ? 'Automated Verification' : 'Real-time Sync',
        description: `${newValue ? 'Enabled' : 'Disabled'} successfully.`,
        duration: 2000,
      });
      return { ...prev, [field]: newValue };
    });
  };

  // Handle notification toggle
  const handleNotificationToggle = (field: keyof NotificationSettings) => {
    setNotifications(prev => {
      const newValue = !prev[field];
      const titles = {
        highValueClaims: 'High-value Claims Alert',
        fraudPattern: 'Fraud Pattern Alert',
        systemOutage: 'System Outage Alert'
      };
      toast({
        title: titles[field],
        description: `${newValue ? 'Enabled' : 'Disabled'} successfully.`,
        duration: 2000,
      });
      return { ...prev, [field]: newValue };
    });
  };

  const hasProfileChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Configure the Shasthya-Rakshak dashboard and fraud detection engine</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-slate-100 p-1 rounded-2xl w-full sm:w-auto mb-8 h-12">
          <TabsTrigger value="general" className="rounded-xl px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">General</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">Security & Privacy</TabsTrigger>
          <TabsTrigger value="database" className="rounded-xl px-6 h-10 data-[state=active]:bg-white data-[state=active]:shadow-sm">API & Database</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-1">Administrative Profile</h3>
              <p className="text-sm text-muted-foreground">Update your official department credentials and contact info.</p>
            </div>
            <Card className="md:col-span-2 bg-white rounded-3xl border border-border/50 shadow-lg overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input 
                      id="fullname" 
                      value={profile.fullName}
                      onChange={(e) => handleProfileChange('fullName', e.target.value)}
                      className="h-11 rounded-xl bg-slate-50/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Official Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="h-11 rounded-xl bg-slate-50/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dept">Department</Label>
                    <Input 
                      id="dept" 
                      value={profile.department}
                      onChange={(e) => handleProfileChange('department', e.target.value)}
                      className="h-11 rounded-xl bg-slate-50/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Official Role</Label>
                    <Input 
                      id="role" 
                      value={profile.role}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      className="h-11 rounded-xl bg-slate-50/50" 
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-8 py-6 bg-slate-50 border-t border-border/50 flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  className="rounded-xl px-6"
                  onClick={handleCancelProfile}
                  disabled={!hasProfileChanges}
                >
                  Cancel
                </Button>
                <Button 
                  className="rounded-xl px-8 shadow-lg shadow-primary/20"
                  onClick={handleSaveProfile}
                  disabled={!hasProfileChanges}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold mb-1">System Preferences</h3>
              <p className="text-sm text-muted-foreground">Manage global system behaviors and appearance.</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <Card className="bg-white rounded-3xl border border-border/50 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold">Automated Claim Verification</p>
                        <p className="text-sm text-muted-foreground">Enable AI engine to flag suspicious claims automatically.</p>
                      </div>
                    </div>
                    <Switch 
                      checked={preferences.autoVerification}
                      onCheckedChange={() => handlePreferenceToggle('autoVerification')}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-3xl border border-border/50 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-emerald-50 rounded-xl">
                        <Cloud className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold">Real-time Data Sync</p>
                        <p className="text-sm text-muted-foreground">Sync hospital logs every 30 seconds.</p>
                      </div>
                    </div>
                    <Switch 
                      checked={preferences.realTimeSync}
                      onCheckedChange={() => handlePreferenceToggle('realTimeSync')}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="py-8">
          <Card className="bg-white rounded-3xl border border-border/50 shadow-lg">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-bold">Email & Push Notifications</CardTitle>
              <CardDescription>Configure when you want to be alerted about system activities.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Claim Alerts</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div>
                      <p className="font-bold">High-value Claims (&gt; ₹2 Lakhs)</p>
                      <p className="text-sm text-muted-foreground">Notify when a claim exceeds the threshold for manual audit.</p>
                    </div>
                    <Switch 
                      checked={notifications.highValueClaims}
                      onCheckedChange={() => handleNotificationToggle('highValueClaims')}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div>
                      <p className="font-bold">Fraudulent Pattern Detected</p>
                      <p className="text-sm text-muted-foreground">Immediate alert when AI flags a potential fraud network.</p>
                    </div>
                    <Switch 
                      checked={notifications.fraudPattern}
                      onCheckedChange={() => handleNotificationToggle('fraudPattern')}
                    />
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <div>
                      <p className="font-bold">System Outage Alerts</p>
                      <p className="text-sm text-muted-foreground">Notify if hospital sync nodes are unresponsive.</p>
                    </div>
                    <Switch 
                      checked={notifications.systemOutage}
                      onCheckedChange={() => handleNotificationToggle('systemOutage')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white rounded-3xl border border-border/50 shadow-lg">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-bold">Security & Privacy Settings</CardTitle>
              <CardDescription>Manage authentication, access control, and data privacy.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Password & Authentication</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      placeholder="Enter current password"
                      className="h-11 rounded-xl bg-slate-50/50" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      placeholder="Enter new password"
                      className="h-11 rounded-xl bg-slate-50/50" 
                    />
                  </div>
                </div>
                <Button className="rounded-xl px-6">
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Access Control</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-50 rounded-xl">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-amber-50 rounded-xl">
                        <Lock className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-bold">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Auto-logout after 30 minutes of inactivity.</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-red-50 rounded-xl">
                        <User className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-bold">Login Notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified of new login attempts.</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <Card className="bg-white rounded-3xl border border-border/50 shadow-lg">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-xl font-bold">API & Database Configuration</CardTitle>
              <CardDescription>Manage external integrations and database connections.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">API Keys</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Primary API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="api-key" 
                        type="password"
                        value="sk_live_••••••••••••••••••••••••"
                        readOnly
                        className="h-11 rounded-xl bg-slate-50/50 font-mono" 
                      />
                      <Button variant="outline" className="rounded-xl px-4">
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url" 
                      placeholder="https://api.wbhealth.gov.in/webhook"
                      className="h-11 rounded-xl bg-slate-50/50" 
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Database Status</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="bg-emerald-50 border-emerald-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="text-sm font-bold text-emerald-900">Primary Database</p>
                          <p className="text-xs text-emerald-700">Connected • 99.9% uptime</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Cloud className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-bold text-blue-900">Backup Server</p>
                          <p className="text-xs text-blue-700">Active • Last sync: 2 min ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Data Management</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="rounded-xl px-6">
                    <Database className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="rounded-xl px-6">
                    <Cloud className="w-4 h-4 mr-2" />
                    Backup Now
                  </Button>
                  <Button variant="destructive" className="rounded-xl px-6">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
