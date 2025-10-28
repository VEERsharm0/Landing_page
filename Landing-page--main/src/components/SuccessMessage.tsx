import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Download, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { generateCertificate, downloadCertificate } from "@/utils/certificateGenerator";

interface SuccessMessageProps {
  name: string;
  id: string;
  onReset: () => void;
}

export const SuccessMessage = ({ name, id, onReset }: SuccessMessageProps) => {
  const [certificateUrl, setCertificateUrl] = useState<string>("");

  useEffect(() => {
    // Generate certificate and set URL for display, then download
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const certificateDataUrl = generateCertificate(name, date, id);
    setCertificateUrl(certificateDataUrl);
    downloadCertificate(certificateDataUrl, name, id);
  }, [name, id]);

  const handleDownloadAgain = () => {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const certificateDataUrl = generateCertificate(name, date, id);
    downloadCertificate(certificateDataUrl, name, id);
  };

  const handleShareLinkedIn = () => {
    const currentUrl = window.location.href.replace(/^http:/, 'https:');
    const text = `I attended this event, thank you for your participation, and here's my lifelong experience.`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    const currentUrl = window.location.href.replace(/^http:/, 'https:');
    const text = `I attended this event, thank you for your participation, and here's my lifelong experience. ${currentUrl}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareWhatsApp = () => {
    const currentUrl = window.location.href.replace(/^http:/, 'https:');
    const text = `I attended this event, thank you for your participation, and here's my lifelong experience. ${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };
  return (
    <section className="py-20 px-4 bg-background">
      <Card className="max-w-2xl mx-auto text-center shadow-lg border border-border">
        <CardHeader>
          <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl md:text-4xl">
            Registration Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg md:text-xl text-muted-foreground">
            Thank you, <span className="font-semibold text-foreground">{name}</span>!
          </p>
          <p className="text-base md:text-lg text-muted-foreground">
            Your registration has been recorded successfully. Your participation certificate has been downloaded automatically!
          </p>
          {certificateUrl && (
            <div className="mt-6">
              <img
                src={certificateUrl}
                alt="Participation Certificate"
                className="max-w-full h-auto mx-auto border border-border rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Button
              onClick={handleDownloadAgain}
              variant="default"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Certificate Again
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
            >
              Register Another Student
            </Button>
          </div>
          <div className="mt-6">
            <p className="text-sm text-muted-foreground mb-4">Share your achievement:</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleShareLinkedIn}
                variant="outline"
                size="sm"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                onClick={handleShareTwitter}
                variant="outline"
                size="sm"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button
                onClick={handleShareWhatsApp}
                variant="outline"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
