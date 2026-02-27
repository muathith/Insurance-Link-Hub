import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { useLinks } from "@/hooks/use-links";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Car, Shield, Link as LinkIcon, ExternalLink, Lock, FileText, Cookie, ChevronLeft, CheckCircle2, Sparkles, Star, Award, Zap, Users } from "lucide-react";
import { PolicyModal } from "@/components/PolicyModal";
import avatarImage from "@assets/favicon_(1)_1772226696138.png";

const securityRules = [
  "نلتزم بحماية بياناتك الشخصية وفقاً لأعلى معايير الأمان الدولية",
  "جميع المعاملات مشفرة باستخدام بروتوكول SSL/TLS",
  "لا نشارك بياناتك مع أي طرف ثالث دون موافقتك الصريحة",
  "نطبق قواعد NZCD لحماية البيانات والخصوصية",
  "يحق لك طلب حذف بياناتك في أي وقت",
  "نحتفظ ببياناتك فقط للمدة اللازمة لتقديم الخدمة",
  "نستخدم جدران حماية متقدمة لمنع الوصول غير المصرح به",
  "يتم مراجعة سياسات الأمان بشكل دوري لضمان الامتثال",
];

const stats = [
  { icon: Users, value: "+١٠٠ ألف", label: "عميل سعيد" },
  { icon: Award, value: "+٢٠", label: "شركة تأمين" },
  { icon: Zap, value: "٣ دقائق", label: "لإصدار التأمين" },
];

const linkIcons = [FileText, Car, Sparkles];

export default function PublicProfile() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: links, isLoading: isLoadingLinks } = useLinks();
  const [activeModal, setActiveModal] = useState<"privacy" | "cookie" | "security" | null>(null);

  if (isLoadingProfile || isLoadingLinks) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center premium-gradient gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-white"
        >
          <Shield className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/50 text-sm font-medium"
        >
          جاري التحميل...
        </motion.p>
      </div>
    );
  }

  const activeLinks = (links || [])
    .filter(link => link.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950 font-sans" dir="rtl">

      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-40%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-blue-400/8 blur-3xl animate-float" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/8 blur-3xl animate-float-delay" />
          <div className="absolute top-[20%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-blue-300/5 blur-3xl animate-float-delay-2" />
          <div className="absolute top-[60%] right-[60%] w-[20vw] h-[20vw] rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

          <div className="hidden sm:block absolute top-12 left-12 w-2 h-2 rounded-full bg-accent/50 animate-pulse" />
          <div className="hidden sm:block absolute top-24 right-[25%] w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="hidden sm:block absolute bottom-28 left-[35%] w-2 h-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="hidden md:block absolute top-[40%] right-12 w-1 h-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="hidden md:block absolute bottom-[35%] right-[40%] w-1.5 h-1.5 rounded-full bg-blue-300/20 animate-pulse" style={{ animationDelay: '2s' }} />

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-32 sm:pb-40 flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="relative mb-7 sm:mb-9"
          >
            <div className="absolute inset-[-16px] sm:inset-[-20px] bg-accent/15 rounded-full blur-2xl animate-glow-pulse" />
            <div className="absolute inset-[-8px] sm:inset-[-10px] rounded-full avatar-ring" />
            <img
              src={avatarImage}
              alt={profile?.name || "avatar"}
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full object-contain bg-white/15 backdrop-blur-md border-[3px] border-white/30 shadow-2xl relative z-10 p-3 sm:p-5"
            />
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-gradient-to-br from-accent to-amber-500 text-accent-foreground p-2.5 sm:p-3 rounded-2xl shadow-xl z-20 border-2 border-white/20"
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-4 sm:mb-5 bg-white/8 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs text-white/60 font-medium tracking-wide">متاح الآن</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display text-white mb-3 sm:mb-5 drop-shadow-lg px-2 shimmer-text leading-tight"
          >
            {profile?.name || "أفضل تأمين لسيارتك"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-xs sm:max-w-md mx-auto leading-relaxed px-2"
          >
            {profile?.bio || "وفّرنا عليك البحث بين أكثر من ٢٠ شركة تأمين في مكان واحد"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.1, type: "spring" }}
                className="relative flex flex-col items-center gap-1.5 sm:gap-2 bg-white/[0.07] backdrop-blur-md rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-white/[0.08] min-w-[90px] sm:min-w-[110px]"
              >
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent mb-0.5" />
                <span className="text-base sm:text-lg font-bold text-white">{stat.value}</span>
                <span className="text-[10px] sm:text-xs text-white/40 font-medium">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full h-auto block" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="[stop-color:theme(colors.slate.50)] dark:[stop-color:theme(colors.slate.950)]" stopOpacity="0.5" />
                <stop offset="100%" className="[stop-color:theme(colors.slate.50)] dark:[stop-color:theme(colors.slate.950)]" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d="M0,60 C240,90 480,20 720,50 C960,80 1200,30 1440,60 L1440,100 L0,100 Z" fill="url(#wave-fill)" />
          </svg>
        </div>
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 md:px-6 pb-12 sm:pb-16">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 sm:gap-5 mb-10 sm:mb-14"
        >
          {activeLinks.map((link, index) => {
            const Icon = linkIcons[index % linkIcons.length];
            return (
              <motion.a
                key={link.id}
                variants={itemVariants}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-card-${link.id}`}
                className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden link-card-shadow"
                style={{ minHeight: 'clamp(150px, 30vw, 210px)' }}
              >
                {link.imageUrl ? (
                  <img
                    src={link.imageUrl}
                    alt={link.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-108"
                  />
                ) : (
                  <div className="absolute inset-0 premium-gradient" />
                )}

                <div className="absolute inset-0 card-overlay transition-all duration-500" />

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-400 -translate-x-3 group-hover:translate-x-0">
                  <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/10">
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                </div>

                <div className="relative z-10 flex items-end justify-between p-5 sm:p-7 h-full" style={{ minHeight: 'clamp(150px, 30vw, 210px)' }}>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-accent/30 rounded-xl sm:rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative bg-gradient-to-br from-accent to-amber-500 text-accent-foreground p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold text-white drop-shadow-lg mb-1 sm:mb-1.5 leading-tight">
                        {link.title}
                      </h2>
                      <div className="flex items-center gap-1.5 text-white/35 text-xs sm:text-sm group-hover:text-white/60 transition-colors duration-300">
                        <Sparkles className="w-3 h-3" />
                        <span>اضغط للمزيد</span>
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}

          {activeLinks.length === 0 && (
            <div className="text-center p-8 sm:p-10 border-2 border-dashed rounded-2xl border-muted-foreground/20 text-muted-foreground text-sm sm:text-base">
              لا توجد روابط نشطة حالياً.
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-premium mb-8 sm:mb-10 border border-border/50 security-grid-bg"
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl sm:rounded-2xl blur-md" />
              <div className="relative bg-gradient-to-br from-primary to-blue-600 text-white p-3 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-lg">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-display text-foreground">قواعد الأمان والحماية</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">نلتزم بأعلى معايير الحماية</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
            {securityRules.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.06 }}
                className="group/rule flex items-start gap-2.5 sm:gap-3 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] dark:from-primary/[0.06] dark:to-accent/[0.03] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-primary/[0.06] hover:border-primary/15 hover:shadow-sm transition-all duration-300"
              >
                <div className="mt-0.5 bg-accent/10 rounded-lg p-1 group-hover/rule:bg-accent/20 transition-colors">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{rule}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <footer className="w-full text-center mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {[
              { id: "privacy" as const, icon: FileText, label: "سياسة الخصوصية" },
              { id: "cookie" as const, icon: Cookie, label: "سياسة ملفات تعريف الارتباط" },
              { id: "security" as const, icon: Lock, label: "قواعد الأمان" },
            ].map((item) => (
              <button
                key={item.id}
                data-testid={`button-${item.id}-policy`}
                onClick={() => setActiveModal(item.id)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-border/60" />
            <div className="flex items-center gap-1.5 text-muted-foreground/25">
              <Lock className="w-3 h-3" />
              <ShieldCheck className="w-3.5 h-3.5" />
              <Shield className="w-3 h-3" />
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-border/60" />
          </div>

          <p className="text-[11px] text-muted-foreground/35 font-medium">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} {profile?.name || "تأمين السيارات"}
          </p>
        </footer>
      </main>

      <PolicyModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="سياسة الخصوصية"
        content={profile?.privacyPolicy}
      />

      <PolicyModal
        isOpen={activeModal === "cookie"}
        onClose={() => setActiveModal(null)}
        title="سياسة ملفات تعريف الارتباط"
        content={profile?.cookiePolicy}
      />

      <PolicyModal
        isOpen={activeModal === "security"}
        onClose={() => setActiveModal(null)}
        title="قواعد الأمان والحماية"
        content={securityRules.map((r, i) => `${i + 1}. ${r}`).join("\n\n")}
      />
    </div>
  );
}
