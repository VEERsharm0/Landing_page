import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface HeroProps {
  onRegisterClick: () => void;
}

export const Hero = ({ onRegisterClick }: HeroProps) => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 bg-gradient-to-br from-destructive to-destructive/80 text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-8">
          <GraduationCap className="w-10 h-10" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Student Participation Campaign
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
          Register now and get your participation certificate instantly!
        </p>
        
        <Button
          onClick={onRegisterClick}
          size="lg"
          className="text-lg px-8 py-6 h-auto bg-background text-foreground hover:bg-background/90"
        >
          Register Now
        </Button>
      </div>
    </section>
  );
};
