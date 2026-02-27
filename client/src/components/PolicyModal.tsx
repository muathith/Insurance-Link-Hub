import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | null | undefined;
}

export function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl" dir="rtl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <DialogTitle className="text-2xl text-foreground font-display">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground whitespace-pre-wrap leading-loose text-base pt-4 border-t border-border/50">
            {content || "لا يوجد محتوى متاح حالياً."}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
