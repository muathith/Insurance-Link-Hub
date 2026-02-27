import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | null | undefined;
}

export function PolicyModal({ isOpen, onClose, title, content }: PolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-display mb-4">{title}</DialogTitle>
          <DialogDescription className="text-foreground whitespace-pre-wrap leading-relaxed text-lg">
            {content || "لا يوجد محتوى متاح حالياً."}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
