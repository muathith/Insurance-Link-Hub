import { useState, useEffect } from "react";
import { useProfile, useUpdateProfile } from "@/hooks/use-profile";
import { Link } from "wouter";
import { LayoutDashboard, Settings, Globe, Save, AlertCircle, Menu } from "lucide-react";

export default function AdminSettings() {
  const { data: profile, isLoading } = useProfile();
  const updateMutation = useUpdateProfile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatarUrl: "",
    privacyPolicy: "",
    cookiePolicy: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        bio: profile.bio || "",
        avatarUrl: profile.avatarUrl || "",
        privacyPolicy: profile.privacyPolicy || "يجب تضمين قواعد NZCD هنا...\n\nسياسة الخصوصية الخاصة بنا تلتزم بالمعايير...",
        cookiePolicy: profile.cookiePolicy || "نحن نستخدم ملفات تعريف الارتباط لتحسين تجربتك..."
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(formData);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save settings");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative">

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white dark:bg-slate-900 border-r border-border flex flex-col p-6 shadow-sm shrink-0
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 mb-10 text-primary font-display text-xl font-bold">
          <Settings className="w-6 h-6" />
          <span>Admin Panel</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Manage Links
          </Link>
          <Link href="/admin/settings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Profile Settings
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl font-medium transition-colors">
            <Globe className="w-5 h-5" />
            View Public Page
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border p-3 flex items-center gap-3 lg:hidden">
          <button 
            data-testid="button-toggle-sidebar-settings"
            onClick={() => setSidebarOpen(true)} 
            className="p-2 rounded-lg hover:bg-secondary"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-bold text-foreground">Profile Settings</span>
        </div>

        <div className="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-display text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Configure your public bio and legal policies.</p>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading settings...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              
              <div className="bg-white dark:bg-slate-900 p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-border">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Public Profile
                </h2>
                
                <div className="grid gap-4 sm:gap-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Display Name (Arabic)</label>
                    <input 
                      name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-3 rounded-xl border border-input bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="e.g. تأمين السيارات الشامل"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Bio / Description</label>
                    <textarea 
                      name="bio" value={formData.bio} onChange={handleChange} required rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                      placeholder="Short description of your services..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Avatar Image URL</label>
                    <div className="flex gap-3 sm:gap-4">
                      <input 
                        name="avatarUrl" value={formData.avatarUrl} onChange={handleChange}
                        className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-input bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="https://..."
                      />
                      {formData.avatarUrl && (
                        <img src={formData.avatarUrl} alt="Preview" className="w-12 h-12 rounded-full object-cover border flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-border">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      Legal & Compliance
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Ensure your policies comply with local and NZCD rules.</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:gap-8">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Privacy Policy (Arabic)</label>
                    <textarea 
                      name="privacyPolicy" value={formData.privacyPolicy} onChange={handleChange} rows={6}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="سياسة الخصوصية الخاصة بك..."
                      dir="rtl"
                    />
                    <p className="text-xs text-muted-foreground mt-2">* Must include mentions of NZCD rules as per requirements.</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block">Cookie Policy (Arabic)</label>
                    <textarea 
                      name="cookiePolicy" value={formData.cookiePolicy} onChange={handleChange} rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="سياسة ملفات تعريف الارتباط..."
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 sm:pt-4">
                <button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {updateMutation.isPending ? "Saving Changes..." : "Save All Settings"}
                </button>
              </div>

            </form>
          )}
        </div>
      </main>
    </div>
  );
}
