import { useState } from "react";
import { useProfile } from "@/hooks/use-profile";
import { useLinks } from "@/hooks/use-links";
import { motion } from "framer-motion";
import { ShieldCheck, Car, Shield, Link as LinkIcon, ExternalLink, Lock, FileText, Cookie, ChevronLeft, CheckCircle2 } from "lucide-react";
import { PolicyModal } from "@/components/PolicyModal";

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
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } }
  };

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 font-sans" dir="rtl">

      <div className="premium-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-50%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-[-30%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/10 blur-3xl" />
          <div className="hidden sm:block absolute top-10 left-10 w-3 h-3 rounded-full bg-accent/60 animate-pulse" />
          <div className="hidden sm:block absolute top-20 right-[20%] w-2 h-2 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="hidden sm:block absolute bottom-16 left-[30%] w-2 h-2 rounded-full bg-accent/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-20 sm:pb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative mb-6 sm:mb-8"
          >
            <div className="absolute inset-[-8px] bg-accent/30 rounded-full blur-xl animate-pulse" />
            {profile?.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/30 shadow-2xl relative z-10"
              />
            ) : (
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-4 border-white/20 shadow-2xl relative z-10">
                <ShieldCheck className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
              </div>
            )}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2 sm:-right-2 bg-accent text-accent-foreground p-2 sm:p-2.5 rounded-full shadow-lg z-20"
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display text-white mb-3 sm:mb-4 drop-shadow-lg px-2"
          >
            {profile?.name || "أفضل تأمين لسيارتك"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-base sm:text-lg text-white/80 max-w-sm sm:max-w-md mx-auto leading-relaxed px-2"
          >
            {profile?.bio || "وفّرنا عليك البحث بين أكثر من ٢٠ شركة تأمين في مكان واحد"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 mt-5 sm:mt-6 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 border border-white/10"
          >
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
            <span className="text-xs sm:text-sm text-white/70">محمي وآمن بالكامل</span>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 md:px-6 -mt-6 sm:-mt-8 pb-12 sm:pb-16">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3 sm:gap-5 mb-8 sm:mb-12"
        >
          {activeLinks.map((link) => (
            <motion.a
              key={link.id}
              variants={itemVariants}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-card-${link.id}`}
              className="group relative block rounded-xl sm:rounded-2xl overflow-hidden shadow-premium"
              style={{ minHeight: 'clamp(120px, 25vw, 180px)' }}
            >
              {link.imageUrl ? (
                <img
                  src={link.imageUrl}
                  alt={link.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 premium-gradient" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-colors duration-300" />

              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/10 backdrop-blur-md rounded-full p-1.5 sm:p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>

              <div className="relative z-10 flex items-end p-4 sm:p-6 h-full" style={{ minHeight: 'clamp(120px, 25vw, 180px)' }}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-accent text-accent-foreground p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg mb-0.5 sm:mb-1">
                      {link.title}
                    </h2>
                    <div className="flex items-center gap-1 text-white/50 text-xs sm:text-sm">
                      <span>اضغط للمزيد</span>
                      <ChevronLeft className="w-3 h-3" />
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
          className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-premium mb-6 sm:mb-8 border border-border/50"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-5">
            <div className="bg-primary/10 text-primary p-2 sm:p-2.5 rounded-lg sm:rounded-xl">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-display text-foreground">قواعد الأمان والحماية</h3>
          </div>
          <div className="space-y-2.5 sm:space-y-3">
            {securityRules.map((rule, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
                className="flex items-start gap-2.5 sm:gap-3"
              >
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{rule}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <footer className="w-full text-center mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <button
              data-testid="button-privacy-policy"
              onClick={() => setActiveModal("privacy")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 shadow-md border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            >
              <FileText className="w-4 h-4" />
              سياسة الخصوصية
            </button>
            <button
              data-testid="button-cookie-policy"
              onClick={() => setActiveModal("cookie")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 shadow-md border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            >
              <Cookie className="w-4 h-4" />
              سياسة ملفات تعريف الارتباط
            </button>
            <button
              data-testid="button-security-rules"
              onClick={() => setActiveModal("security")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white dark:bg-slate-900 shadow-md border border-border/50 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
            >
              <Lock className="w-4 h-4" />
              قواعد الأمان
            </button>
          </div>
          <p className="text-xs text-muted-foreground/50">
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
