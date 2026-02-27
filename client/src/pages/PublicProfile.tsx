import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { useLinks } from "@/hooks/use-links";
import { motion } from "framer-motion";
import { ShieldCheck, Car, Shield, Link as LinkIcon, ExternalLink, Lock, FileText, Cookie, ChevronLeft, CheckCircle2, Sparkles, Star } from "lucide-react";
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

const trustBadges = [
  { icon: ShieldCheck, label: "حماية كاملة" },
  { icon: Lock, label: "تشفير SSL" },
  { icon: Star, label: "+20 شركة" },
];

export default function PublicProfile() {
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: links, isLoading: isLoadingLinks } = useLinks();
  const [activeModal, setActiveModal] = useState<"privacy" | "cookie" | "security" | null>(null);

  if (isLoadingProfile || isLoadingLinks) {
    return (
      <div className="min-h-screen flex items-center justify-center premium-gradient">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-white"
        >
          <Shield className="w-12 h-12 sm:w-16 sm:h-16" />
        </motion.div>
      </div>
    );
  }

  const activeLinks = (links || [])
    .filter(link => link.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950 font-sans" dir="rtl">

      <div className="premium-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-40%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-blue-400/8 blur-3xl animate-float" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/8 blur-3xl animate-float-delay" />
          <div className="absolute top-[20%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-blue-300/5 blur-3xl animate-float-delay-2" />

          <div className="hidden sm:block absolute top-12 left-12 w-2 h-2 rounded-full bg-accent/50 animate-pulse" />
          <div className="hidden sm:block absolute top-24 right-[25%] w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="hidden sm:block absolute bottom-20 left-[35%] w-2 h-2 rounded-full bg-accent/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="hidden md:block absolute top-[40%] right-12 w-1 h-1 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="hidden md:block absolute bottom-[30%] right-[40%] w-1.5 h-1.5 rounded-full bg-blue-300/20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-24 sm:pb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative mb-6 sm:mb-8"
          >
            <div className="absolute inset-[-12px] sm:inset-[-16px] bg-accent/20 rounded-full blur-2xl animate-glow-pulse" />
            <div className="absolute inset-[-4px] sm:inset-[-6px] bg-gradient-to-br from-accent/40 to-blue-400/40 rounded-full blur-md" />
            <img
              src={avatarImage}
              alt={profile?.name || "avatar"}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-contain bg-white/15 backdrop-blur-md border-[3px] border-white/25 shadow-2xl relative z-10 p-3 sm:p-4"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-accent text-accent-foreground p-2 sm:p-2.5 rounded-full shadow-xl z-20 border-2 border-white/20"
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display text-white mb-3 sm:mb-4 drop-shadow-lg px-2 shimmer-text"
          >
            {profile?.name || "أفضل تأمين لسيارتك"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-base sm:text-lg md:text-xl text-white/75 max-w-sm sm:max-w-md mx-auto leading-relaxed px-2"
          >
            {profile?.bio || "وفّرنا عليك البحث بين أكثر من ٢٠ شركة تأمين في مكان واحد"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 sm:gap-6 mt-7 sm:mt-9"
          >
            {trustBadges.map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.1 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-2.5 sm:p-3 border border-white/10">
                  <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                </div>
                <span className="text-[10px] sm:text-xs text-white/50 font-medium">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto block fill-slate-50 dark:fill-slate-950" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 md:px-6 -mt-2 pb-12 sm:pb-16">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 sm:gap-5 mb-10 sm:mb-14"
        >
          {activeLinks.map((link, index) => (
            <motion.a
              key={link.id}
              variants={itemVariants}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-card-${link.id}`}
              className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden shadow-premium card-shine"
              style={{ minHeight: 'clamp(140px, 28vw, 200px)' }}
            >
              {link.imageUrl ? (
                <img
                  src={link.imageUrl}
                  alt={link.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 premium-gradient" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5 group-hover:from-black/90 transition-all duration-500" />

              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/10 backdrop-blur-md rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 border border-white/10">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>

              <div className="relative z-10 flex items-end justify-between p-5 sm:p-7 h-full" style={{ minHeight: 'clamp(140px, 28vw, 200px)' }}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-accent text-accent-foreground p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500 border border-accent/20">
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-[1.65rem] font-bold text-white drop-shadow-lg mb-0.5 sm:mb-1">
                      {link.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs sm:text-sm group-hover:text-white/60 transition-colors">
                      <Sparkles className="w-3 h-3" />
                      <span>اضغط للمزيد</span>
                      <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}

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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-t-2xl sm:rounded-t-3xl" />

          <div className="flex items-center gap-3 mb-5 sm:mb-7">
            <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-display text-foreground">قواعد الأمان والحماية</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">نلتزم بأعلى معايير الحماية</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {securityRules.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className="flex items-start gap-2.5 sm:gap-3 bg-primary/[0.03] dark:bg-primary/[0.06] rounded-xl p-3 sm:p-4 border border-primary/5"
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{rule}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <footer className="w-full text-center mt-8 sm:mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-5 sm:mb-7">
            <button
              data-testid="button-privacy-policy"
              onClick={() => setActiveModal("privacy")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              سياسة الخصوصية
            </button>
            <button
              data-testid="button-cookie-policy"
              onClick={() => setActiveModal("cookie")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <Cookie className="w-4 h-4" />
              سياسة ملفات تعريف الارتباط
            </button>
            <button
              data-testid="button-security-rules"
              onClick={() => setActiveModal("security")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <Lock className="w-4 h-4" />
              قواعد الأمان
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border" />
            <ShieldCheck className="w-4 h-4 text-muted-foreground/30" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border" />
          </div>

          <p className="text-xs text-muted-foreground/40">
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
