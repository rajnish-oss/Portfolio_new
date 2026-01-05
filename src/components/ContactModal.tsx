import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: result.data,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      // Reset after showing success
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-secondary border border-border rounded-2xl overflow-hidden"
            style={{
              clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
            }}
          >
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-6 h-6 bg-primary" 
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }} 
            />

            {/* Pixel decorations */}
            <div className="absolute top-3 left-3 w-1 h-1 bg-primary/50" />
            <div className="absolute top-3 left-5 w-1 h-1 bg-primary/30" />
            <div className="absolute top-5 left-3 w-1 h-1 bg-primary/30" />
            <div className="absolute bottom-3 right-8 w-1 h-1 bg-primary/50" />
            <div className="absolute bottom-5 right-8 w-1 h-1 bg-primary/30" />
            <div className="absolute bottom-3 right-10 w-1 h-1 bg-primary/30" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-display font-bold text-xl text-foreground">Get In Touch</h2>
                <p className="text-muted-foreground text-sm mt-1">Let's build something amazing together</p>
              </div>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="w-10 h-10 rounded-xl bg-border hover:bg-border/80 flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success State */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-12 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                  >
                    <CheckCircle className="w-16 h-16 text-primary mb-4" />
                  </motion.div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="p-6 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground text-sm font-medium">
                        Name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`bg-background border-border focus:border-primary focus:ring-primary ${errors.name ? 'border-destructive' : ''}`}
                      />
                      {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground text-sm font-medium">
                        Email <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className={`bg-background border-border focus:border-primary focus:ring-primary ${errors.email ? 'border-destructive' : ''}`}
                      />
                      {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground text-sm font-medium">
                      Subject <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project inquiry, collaboration, etc."
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`bg-background border-border focus:border-primary focus:ring-primary ${errors.subject ? 'border-destructive' : ''}`}
                    />
                    {errors.subject && <p className="text-destructive text-xs">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground text-sm font-medium">
                      Message <span className="text-primary">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, idea, or just say hi..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`bg-background border-border focus:border-primary focus:ring-primary resize-none ${errors.message ? 'border-destructive' : ''}`}
                    />
                    {errors.message && <p className="text-destructive text-xs">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
