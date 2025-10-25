import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface QuestionnaireProps {
  onSubmit: (answers: QuestionnaireAnswers) => void;
  onBack: () => void;
}

export interface QuestionnaireAnswers {
  subjective: string[];
  objective: string[];
}

const subjectiveQuestions = [
  "What motivated you to join this campaign?",
  "What are your goals after graduation?",
  "How do you think AI will impact your career?",
  "Which skill do you wish to improve most?",
  "How did you hear about this campaign?",
];

const objectiveQuestions = [
  {
    question: "How often do you participate in such events?",
    options: ["Rarely", "Sometimes", "Often", "Always"],
  },
  {
    question: "What is your current year of study?",
    options: ["First Year", "Second Year", "Third Year", "Fourth Year"],
  },
  {
    question: "What is your preferred learning method?",
    options: ["Online", "Offline", "Hybrid", "Self-paced"],
  },
  {
    question: "Which device do you use most?",
    options: ["Laptop", "Mobile", "Tablet", "Desktop"],
  },
  {
    question: "Would you recommend this campaign to others?",
    options: ["Definitely", "Maybe", "Not sure", "No"],
  },
];

export const Questionnaire = ({ onSubmit, onBack }: QuestionnaireProps) => {
  const { toast } = useToast();
  const [subjectiveAnswers, setSubjectiveAnswers] = useState<string[]>(Array(5).fill(""));
  const [objectiveAnswers, setObjectiveAnswers] = useState<string[]>(Array(5).fill(""));

  const handleSubjectiveChange = (index: number, value: string) => {
    const newAnswers = [...subjectiveAnswers];
    newAnswers[index] = value;
    setSubjectiveAnswers(newAnswers);
  };

  const handleObjectiveChange = (index: number, value: string) => {
    const newAnswers = [...objectiveAnswers];
    newAnswers[index] = value;
    setObjectiveAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all questions are answered
    const allSubjectiveAnswered = subjectiveAnswers.every(answer => answer.trim() !== "");
    const allObjectiveAnswered = objectiveAnswers.every(answer => answer !== "");
    
    if (!allSubjectiveAnswered || !allObjectiveAnswered) {
      toast({
        title: "Incomplete Questionnaire",
        description: "Please answer all questions before submitting",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      subjective: subjectiveAnswers,
      objective: objectiveAnswers,
    });
  };

  return (
    <section className="py-20 px-4 bg-background">
      <Card className="max-w-4xl mx-auto shadow-lg border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl mb-2">Questionnaire</CardTitle>
          <CardDescription className="text-base">
            Please answer all questions to complete your registration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Subjective Questions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Subjective Questions</h3>
              {subjectiveQuestions.map((question, index) => (
                <div key={`subjective-${index}`} className="space-y-3">
                  <Label htmlFor={`subjective-${index}`} className="text-base font-medium">
                    {index + 1}. {question}
                  </Label>
                  <Textarea
                    id={`subjective-${index}`}
                    placeholder="Type your answer here..."
                    value={subjectiveAnswers[index]}
                    onChange={(e) => handleSubjectiveChange(index, e.target.value)}
                    className="min-h-[100px] text-base resize-none"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Objective Questions */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Objective Questions</h3>
              {objectiveQuestions.map((item, index) => (
                <div key={`objective-${index}`} className="space-y-3">
                  <Label className="text-base font-medium">
                    {index + 6}. {item.question}
                  </Label>
                  <RadioGroup
                    value={objectiveAnswers[index]}
                    onValueChange={(value) => handleObjectiveChange(index, value)}
                    required
                  >
                    {item.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${index}-opt${optIndex}`} />
                        <Label 
                          htmlFor={`q${index}-opt${optIndex}`}
                          className="text-base font-normal cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 h-12 text-base"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 text-base"
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
