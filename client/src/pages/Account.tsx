import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  CreditCard, 
  History, 
  Shield, 
  Crown,
  Check,
  Coins,
  ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";

const creditHistory = [
  { id: "1", type: "purchase", amount: 100, description: "Pro Plan Subscription", date: "2025-01-15" },
  { id: "2", type: "usage", amount: -20, description: "Video Generation", date: "2025-01-14" },
  { id: "3", type: "usage", amount: -5, description: "Image Generation", date: "2025-01-14" },
  { id: "4", type: "bonus", amount: 50, description: "Welcome Bonus", date: "2025-01-01" },
];

const plans = [
  { id: "starter", name: "Starter", price: 30, credits: 50, current: false },
  { id: "pro", name: "Pro", price: 79, credits: 200, current: true },
  { id: "agency", name: "Agency", price: 199, credits: 500, current: false },
];

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Account Settings</h1>
            <p className="text-muted-foreground mb-8">Please sign in to manage your account</p>
            <Button variant="hero" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/");
    toast.success("Signed out successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Account <span className="text-gradient-glow">Settings</span>
          </h1>
          <p className="text-muted-foreground mb-8">Manage your profile, subscription, and security</p>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="glass-strong w-full justify-start p-1 h-auto flex-wrap">
              <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-secondary">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="subscription" className="gap-2 data-[state=active]:bg-secondary">
                <Crown className="w-4 h-4" />
                Subscription
              </TabsTrigger>
              <TabsTrigger value="credits" className="gap-2 data-[state=active]:bg-secondary">
                <History className="w-4 h-4" />
                Credits History
              </TabsTrigger>
              <TabsTrigger value="billing" className="gap-2 data-[state=active]:bg-secondary">
                <CreditCard className="w-4 h-4" />
                Billing
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-secondary">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="glass-strong rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button variant="glow" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-6">
              <div className="glass-strong rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Current Plan</h2>
                    <p className="text-muted-foreground">You are currently on the Pro plan</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-glow">
                    <Coins className="w-5 h-5 text-white" />
                    <span className="text-xl font-bold text-white">{user.credits}</span>
                    <span className="text-white/80 text-sm">credits</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`glass-strong rounded-2xl p-6 transition-all ${
                      plan.current ? "border-2 border-glow-accent shadow-glow" : "hover:border-border/80"
                    }`}
                  >
                    {plan.current && (
                      <div className="text-xs font-medium text-glow-accent mb-2">CURRENT PLAN</div>
                    )}
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{plan.credits} credits/month</p>
                    <Button
                      variant={plan.current ? "outline" : "glow"}
                      className="w-full"
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : "Upgrade"}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Credits History Tab */}
            <TabsContent value="credits" className="glass-strong rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Credits History</h2>
              <div className="space-y-4">
                {creditHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.type === "purchase" 
                          ? "bg-green-500/20 text-green-400" 
                          : item.type === "bonus"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {item.type === "usage" ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <Coins className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${item.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                      {item.amount > 0 ? "+" : ""}{item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing" className="glass-strong rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-secondary/30 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <Button variant="ghost">Update</Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">Billing Address</h3>
                  <p className="text-muted-foreground">
                    John Doe<br />
                    123 Main Street<br />
                    San Francisco, CA 94102<br />
                    United States
                  </p>
                  <Button variant="outline" className="mt-4">Edit Address</Button>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="glass-strong rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
              
              <div className="space-y-8">
                <div className="space-y-4 max-w-md">
                  <h3 className="font-semibold">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button variant="glow" onClick={handleChangePassword}>
                    Update Password
                  </Button>
                </div>

                <div className="border-t border-border pt-8">
                  <h3 className="font-semibold mb-4 text-red-400">Danger Zone</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
