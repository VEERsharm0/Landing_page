import { useState } from "react";
import { Hero } from "@/components/Hero";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Questionnaire, QuestionnaireAnswers } from "@/components/Questionnaire";
import { SuccessMessage } from "@/components/SuccessMessage";
import { Footer } from "@/components/Footer";
import { toast } from "sonner";

type Step = "hero" | "registration" | "questionnaire" | "success";

interface RegistrationData {
  full_name: string;
  mobile_number: string;
  city_name: string;
  college_name: string;
  id: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>("hero");
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

  const handleRegisterClick = () => {
    setCurrentStep("registration");
  };

  const handleRegistrationNext = (data: RegistrationData) => {
    setRegistrationData(data);
    setCurrentStep("questionnaire");
  };

  const handleQuestionnaireSubmit = async (answers: QuestionnaireAnswers) => {
    if (!registrationData) return;

    try {
      const response = await fetch(`http://localhost:5000/api/submit-questionnaire/${registrationData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subjective_answers: answers.subjective,
          objective_answers: answers.objective,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Questionnaire submitted successfully:', data);
        toast.success("Registration successful!");
        setCurrentStep("success");
      } else {
        const error = await response.json();
        console.error('Questionnaire submission failed:', error);
        toast.error("Questionnaire submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      toast.error("Error submitting questionnaire. Please try again.");
    }
  };

  const handleReset = () => {
    setRegistrationData(null);
    setCurrentStep("hero");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-destructive py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground text-center tracking-tight">
            Update
          </h1>
        </div>
      </header>

      {/* Main Content */}
      {currentStep === "hero" && <Hero onRegisterClick={handleRegisterClick} />}
      {currentStep === "registration" && (
        <RegistrationForm
          onNext={handleRegistrationNext}
          onBack={() => setCurrentStep("hero")}
        />
      )}
      {currentStep === "questionnaire" && (
        <Questionnaire
          onSubmit={handleQuestionnaireSubmit}
          onBack={() => setCurrentStep("registration")}
        />
      )}
      {currentStep === "success" && registrationData && (
        <SuccessMessage name={registrationData.full_name} id={registrationData.id} onReset={handleReset} />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
