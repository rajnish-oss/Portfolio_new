import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface ResumeModalProps {
  trigger: React.ReactNode;
}

const ResumeModal = ({ trigger }: ResumeModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    // Create a link to download the resume
    // You can replace this URL with an actual resume PDF link
    const resumeUrl = "/resume.pdf";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Rajnish_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-xl">
            <FileText className="w-5 h-5 text-primary" />
            My Resume
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Resume Preview Area */}
          <div className="bg-secondary/50 border border-border rounded-lg p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
            <FileText className="w-16 h-16 text-primary/50 mb-4" />
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              Rajnish Chowdhury
            </h3>
            <p className="text-muted-foreground text-sm mb-1">
              Full-Stack Developer & AI Integrator 
            </p>
            <p className="text-muted-foreground text-sm mb-6">
              2+ Years of Experience
            </p>
            
            <div className="space-y-2 text-sm text-muted-foreground mb-6">
              <p>• React, Node.js, TypeScript</p>
              <p>• Modern Web Technologies</p>
              <p>• UI/UX Design</p>
            </div>

            <p className="text-xs text-muted-foreground/70">
              Click the button below to download the full resume
            </p>
          </div>

          {/* Download Button */}
          <div className="mt-6 flex justify-center">
            <Button
              variant="hero"
              size="lg"
              className="gap-2"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
