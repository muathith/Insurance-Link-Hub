import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ShieldCheck, Lock, FileText } from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | null | undefined;
}

export function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  const isPrivacy = title.includes("خصوصية");
  const isSecurity = title.includes("أمان");
  const Icon = isSecurity ? Lock : isPrivacy ? ShieldCheck : FileText;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-0" dir="rtl">
        <div className="premium-gradient p-5 sm:p-7 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl text-white font-display drop-shadow-md">{title}</DialogTitle>
          </div>
        </div>
        <DialogHeader className="p-5 sm:p-7 pt-0 sm:pt-0">
          <DialogDescription className="text-muted-foreground whitespace-pre-wrap leading-loose text-sm sm:text-base">
            {content || "لا يوجد محتوى متاح حالياً."}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
