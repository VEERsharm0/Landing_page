import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  mobile_number: z.string().regex(/^\d{10}$/, "Enter valid 10-digit mobile number"),
  city_name: z.string().min(2, "City name is required"),
  college_name: z.string().min(2, "College name is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  onNext: (data: FormValues) => void;
  onBack: () => void;
}

export const RegistrationForm = ({ onNext, onBack }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      mobile_number: "",
      city_name: "",
      college_name: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://4d79d86c1186.ngrok-free.app';
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.full_name,
          phone: values.mobile_number,
          company: values.college_name,
          city: values.city_name,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        onNext({ ...values, id: data.data._id });
      } else {
        const error = await response.json();
        console.error('Registration failed:', error);
        alert('Registration failed: ' + error.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <Card className="max-w-2xl mx-auto shadow-lg border border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl mb-2">Student Registration</CardTitle>
          <CardDescription className="text-base">Fill in your details to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 10-digit mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="college_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your college name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Next'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
