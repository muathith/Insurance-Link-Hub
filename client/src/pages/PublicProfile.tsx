import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Car,
  Shield,
  Link as LinkIcon,
  ExternalLink,
  Lock,
  FileText,
  Cookie,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
  Star,
  Award,
  Zap,
  Users,
  Heart,
} from "lucide-react";
import { PolicyModal } from "@/components/PolicyModal";
import avatarImage from "@assets/favicon_(1)_1772226696138.png";

const profile = {
  name: "تأمين السيارات الخاص بك",
  bio: "أفضل عروض تأمين السيارات في منطقتك. احصل على عرض سعر الآن!",
  privacyPolicy: "سياسة الخصوصية الخاصة بنا (تتضمن قواعد NZCD): نحن نحمي بياناتك ونلتزم بجميع قواعد الخصوصية. يتم استخدام بياناتك فقط لغرض تقديم عروض التأمين المناسبة لك.",
  cookiePolicy: "سياسة ملفات تعريف الارتباط: نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتقديم محتوى مخصص لك.",
};

const staticLinks = [
  {
    id: 1,
    title: "احصل على عرض سعر",
    url: "https://example.com/quote",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    title: "اتصل بنا",
    url: "https://example.com/contact",
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    order: 2,
    isActive: true,
  },
  {
    id: 3,
    title: "عروض مميزة",
    url: "https://example.com/offers",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
    order: 3,
    isActive: true,
  },
];

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

const securityIcons = [Shield, Lock, ShieldCheck, Award, Star, Heart, Zap, CheckCircle2];

export default function PublicProfile() {
  const [activeModal, setActiveModal] = useState<"privacy" | "cookie" | "security" | null>(null);

  const activeLinks = staticLinks
    .filter((link) => link.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.93 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 180, damping: 22 } },
  };

  return (
    <div className="min-h-screen relative font-sans page-bg" dir="rtl">

      <div className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-40%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-blue-400/[0.06] blur-3xl animate-float" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent/[0.06] blur-3xl animate-float-delay" />
          <div className="absolute top-[20%] left-[50%] w-[30vw] h-[30vw] rounded-full bg-blue-300/[0.04] blur-3xl animate-float-delay-2" />
          <div className="absolute top-[55%] right-[55%] w-[25vw] h-[25vw] rounded-full bg-accent/[0.04] blur-3xl animate-float" style={{ animationDelay: "3s" }} />

          <div className="hidden sm:block absolute top-16 left-16">
            <div className="w-12 h-12 border border-white/[0.06] rounded-lg rotate-45 animate-float" />
          </div>
          <div className="hidden md:block absolute top-[35%] right-16">
            <div className="w-8 h-8 border border-accent/[0.08] rounded-full animate-float-delay" />
          </div>
          <div className="hidden sm:block absolute bottom-[25%] left-[25%]">
            <div className="w-6 h-6 border border-white/[0.05] rounded-md rotate-12 animate-float-delay-2" />
          </div>

          <div className="hidden sm:block absolute top-14 left-[20%] w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
          <div className="hidden sm:block absolute top-28 right-[22%] w-1 h-1 rounded-full bg-white/25 animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="hidden sm:block absolute bottom-32 left-[38%] w-1.5 h-1.5 rounded-full bg-accent/25 animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="hidden md:block absolute top-[45%] right-[8%] w-1 h-1 rounded-full bg-white/15 animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="hidden md:block absolute bottom-[40%] right-[45%] w-1 h-1 rounded-full bg-blue-300/15 animate-pulse" style={{ animationDelay: "2s" }} />

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-14 sm:pt-24 pb-36 sm:pb-44 flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 18, duration: 0.8 }}
            className="relative mb-8 sm:mb-10"
          >
            <div className="absolute inset-[-20px] sm:inset-[-28px] bg-accent/10 rounded-full blur-3xl animate-glow-pulse" />
            <div className="absolute inset-[-10px] sm:inset-[-14px] rounded-full avatar-ring opacity-70" />
            <div className="absolute inset-[-5px] sm:inset-[-7px] rounded-full bg-gradient-to-b from-white/10 to-transparent" />
            <img
              src={avatarImage}
              alt={profile.name}
              className="w-32 h-32 sm:w-44 sm:h-44 rounded-full object-contain bg-white/10 backdrop-blur-md border-[3px] border-white/20 shadow-2xl relative z-10 p-4 sm:p-5"
            />
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
              className="absolute -bottom-1.5 -right-1.5 sm:-bottom-2.5 sm:-right-2.5 bg-gradient-to-br from-accent via-amber-400 to-amber-500 text-accent-foreground p-2.5 sm:p-3.5 rounded-2xl shadow-2xl z-20 border-2 border-white/20"
            >
              <Car className="w-4 h-4 sm:w-6 sm:h-6" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-2.5 mb-5 sm:mb-6 bg-white/[0.06] backdrop-blur-md rounded-full px-5 py-2 border border-white/[0.08]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-[11px] sm:text-xs text-white/55 font-medium tracking-wider">متاح الآن</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-display mb-4 sm:mb-5 px-2 shimmer-text leading-tight animate-text-glow"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-xs sm:max-w-lg mx-auto leading-relaxed px-2"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex items-center gap-3 sm:gap-4 mt-9 sm:mt-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.12, type: "spring" }}
                className="stat-card rounded-2xl px-4 sm:px-7 py-3.5 sm:py-5 min-w-[95px] sm:min-w-[120px] flex flex-col items-center gap-2"
              >
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span className="text-sm sm:text-lg font-bold text-white gold-text">{stat.value}</span>
                <span className="text-[9px] sm:text-[11px] text-white/35 font-medium tracking-wide">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto block" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="[stop-color:theme(colors.slate.50)] dark:[stop-color:theme(colors.slate.950)]" stopOpacity="0" />
                <stop offset="40%" className="[stop-color:theme(colors.slate.50)] dark:[stop-color:theme(colors.slate.950)]" stopOpacity="0.6" />
                <stop offset="100%" className="[stop-color:theme(colors.slate.50)] dark:[stop-color:theme(colors.slate.950)]" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d="M0,80 C180,110 360,40 540,65 C720,90 900,30 1080,55 C1200,70 1350,45 1440,60 L1440,120 L0,120 Z" fill="url(#wave-fill)" />
          </svg>
        </div>
      </div>

      <main className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 md:px-6 pb-12 sm:pb-16">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mb-6 sm:mb-8 px-1"
        >
          <div className="h-px flex-1 bg-gradient-to-l from-primary/20 to-transparent" />
          <span className="text-xs sm:text-sm text-muted-foreground/50 font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent/50" />
            خدماتنا
            <Sparkles className="w-3.5 h-3.5 text-accent/50" />
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 sm:gap-6 mb-10 sm:mb-14"
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
                className="group relative block rounded-2xl sm:rounded-3xl overflow-hidden link-card-shadow link-card-border"
                style={{ minHeight: "clamp(160px, 32vw, 220px)" }}
              >
                {link.imageUrl ? (
                  <img
                    src={link.imageUrl}
                    alt={link.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <div className="absolute inset-0 premium-gradient" />
                )}

                <div className="absolute inset-0 card-overlay transition-all duration-500" />

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />

                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-3 group-hover:translate-x-0">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 border border-white/10">
                    <ExternalLink className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="relative z-10 flex items-end justify-between p-5 sm:p-8 h-full" style={{ minHeight: "clamp(160px, 32vw, 220px)" }}>
                  <div className="flex items-center gap-3.5 sm:gap-5">
                    <div className="relative">
                      <div className="absolute inset-[-4px] bg-accent/25 rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
                      <div className="relative bg-gradient-to-br from-accent via-amber-400 to-amber-500 text-accent-foreground p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl group-hover:scale-105 transition-all duration-600">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-[1.75rem] font-bold text-white drop-shadow-lg mb-1 sm:mb-2 leading-tight">
                        {link.title}
                      </h2>
                      <div className="flex items-center gap-2 text-white/30 text-xs sm:text-sm group-hover:text-white/55 transition-colors duration-400">
                        <Sparkles className="w-3 h-3 text-accent/50 group-hover:text-accent/80 transition-colors" />
                        <span>اضغط للمزيد</span>
                        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-2 transition-transform duration-400" />
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
          className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-premium mb-8 sm:mb-10 border border-border/40 security-grid-bg overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/[0.04] to-transparent rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/[0.04] to-transparent rounded-tr-full" />

          <div className="relative flex items-center gap-4 mb-6 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-[-4px] bg-primary/15 rounded-2xl blur-md" />
              <div className="relative bg-gradient-to-br from-primary via-blue-600 to-blue-700 text-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-display text-foreground">قواعد الأمان والحماية</h3>
              <p className="text-xs sm:text-sm text-muted-foreground/70 mt-0.5">نلتزم بأعلى معايير الحماية لبياناتك</p>
            </div>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {securityRules.map((rule, idx) => {
              const RuleIcon = securityIcons[idx % securityIcons.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.07 }}
                  className="group/rule flex items-start gap-3 bg-gradient-to-br from-primary/[0.03] to-accent/[0.02] dark:from-primary/[0.06] dark:to-accent/[0.03] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-primary/[0.05] hover:border-primary/[0.12] hover:shadow-md hover:from-primary/[0.05] hover:to-accent/[0.03] transition-all duration-400"
                >
                  <div className="mt-0.5 bg-gradient-to-br from-accent/15 to-accent/5 rounded-lg p-1.5 group-hover/rule:from-accent/25 group-hover/rule:to-accent/10 transition-all duration-300 flex-shrink-0">
                    <RuleIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{rule}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <footer className="w-full text-center mt-10 sm:mt-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 mb-7 sm:mb-9 px-1"
          >
            <div className="h-px flex-1 bg-gradient-to-l from-border/50 to-transparent" />
            <span className="text-xs text-muted-foreground/40 font-medium">السياسات والأمان</span>
            <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 mb-8 sm:mb-10">
            {[
              { id: "privacy" as const, icon: FileText, label: "سياسة الخصوصية" },
              { id: "cookie" as const, icon: Cookie, label: "سياسة ملفات تعريف الارتباط" },
              { id: "security" as const, icon: Lock, label: "قواعد الأمان" },
            ].map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.08 }}
                data-testid={`button-${item.id}-policy`}
                onClick={() => setActiveModal(item.id)}
                className="footer-btn w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 shadow-md border border-border/40 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-border/40 to-transparent" />
            <div className="flex items-center gap-2 text-muted-foreground/20">
              <Lock className="w-3 h-3" />
              <div className="w-1 h-1 rounded-full bg-muted-foreground/15" />
              <ShieldCheck className="w-4 h-4" />
              <div className="w-1 h-1 rounded-full bg-muted-foreground/15" />
              <Shield className="w-3 h-3" />
            </div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-border/40 to-transparent" />
          </div>

          <p className="text-[11px] text-muted-foreground/30 font-medium tracking-wide">
            جميع الحقوق محفوظة &copy; {new Date().getFullYear()} {profile.name}
          </p>
        </footer>
      </main>

      <PolicyModal
        isOpen={activeModal === "privacy"}
        onClose={() => setActiveModal(null)}
        title="سياسة الخصوصية"
        content={profile.privacyPolicy}
      />

      <PolicyModal
        isOpen={activeModal === "cookie"}
        onClose={() => setActiveModal(null)}
        title="سياسة ملفات تعريف الارتباط"
        content={profile.cookiePolicy}
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
