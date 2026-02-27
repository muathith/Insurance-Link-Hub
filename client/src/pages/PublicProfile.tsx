import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { useLinks } from "@/hooks/use-links";
import { motion } from "framer-motion";
import { ShieldCheck, Car, Shield, Link as LinkIcon, ExternalLink } from "lucide-react";
import { PolicyModal } from "@/components/PolicyModal";

export default function PublicProfile() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: links, isLoading: isLoadingLinks } = useLinks();

  const [activeModal, setActiveModal] = useState<"privacy" | "cookie" | null>(null);

  if (isLoadingProfile || isLoadingLinks) {
    return (
      <div className="min-h-screen flex items-center justify-center premium-gradient">
        <div className="animate-spin text-accent">
          <Shield className="w-12 h-12" />
        </div>
      </div>
    );
  }

  // Active links sorted by order
  const activeLinks = (links || [])
    .filter(link => link.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans" dir="rtl">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/10 blur-[80px] pointer-events-none" />

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-16 flex flex-col items-center">
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-accent rounded-full blur-md opacity-50 animate-pulse" />
            {profile?.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-28 h-28 rounded-full object-cover border-4 border-background shadow-xl relative z-10"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-xl relative z-10 text-primary-foreground">
                <ShieldCheck className="w-12 h-12" />
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground p-2 rounded-full shadow-lg z-20">
              <Car className="w-5 h-5" />
            </div>
          </div>

          <h1 className="text-3xl font-display text-primary dark:text-primary-foreground mb-3">
            {profile?.name || "تأمين السيارات الشامل"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            {profile?.bio || "نوفر لك أفضل عروض تأمين السيارات بأسعار تنافسية وتغطية شاملة تضمن راحة بالك على الطريق."}
          </p>
        </motion.div>

        {/* Links List */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full flex flex-col gap-4 mb-16"
        >
          {activeLinks.map((link) => (
            <motion.a
              key={link.id}
              variants={itemVariants}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center p-4 rounded-2xl glass-panel btn-hover-effect overflow-hidden bg-white/80 hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
            >
              {/* Highlight strip on hover */}
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform origin-center rounded-r-2xl" />
              
              <div className="flex-shrink-0 ml-4">
                {link.imageUrl ? (
                  <img src={link.imageUrl} alt={link.title} className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <LinkIcon className="w-6 h-6" />
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {link.title}
                </h2>
              </div>

              <div className="flex-shrink-0 text-muted-foreground group-hover:text-accent transition-colors opacity-50 group-hover:opacity-100 mr-2">
                <ExternalLink className="w-5 h-5" />
              </div>
            </motion.a>
          ))}
          
          {activeLinks.length === 0 && (
            <div className="text-center p-8 border-2 border-dashed rounded-2xl border-muted-foreground/30 text-muted-foreground">
              لا توجد روابط نشطة حالياً.
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <footer className="w-full text-center mt-auto">
          <div className="flex items-center justify-center gap-6 mb-4">
            <button 
              onClick={() => setActiveModal("privacy")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              سياسة الخصوصية
            </button>
            <div className="w-1 h-1 rounded-full bg-border" />
            <button 
              onClick={() => setActiveModal("cookie")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
            >
              سياسة ملفات تعريف الارتباط
            </button>
          </div>
          <p className="text-xs text-muted-foreground/60">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} {profile?.name || "تأمين السيارات"}
          </p>
        </footer>

      </main>

      <PolicyModal 
        isOpen={activeModal === "privacy"} 
        onClose={() => setActiveModal(null)} 
        title="سياسة الخصوصية (Privacy Policy)" 
        content={profile?.privacyPolicy} 
      />
      
      <PolicyModal 
        isOpen={activeModal === "cookie"} 
        onClose={() => setActiveModal(null)} 
        title="سياسة ملفات تعريف الارتباط (Cookie Policy)" 
        content={profile?.cookiePolicy} 
      />
    </div>
  );
}
