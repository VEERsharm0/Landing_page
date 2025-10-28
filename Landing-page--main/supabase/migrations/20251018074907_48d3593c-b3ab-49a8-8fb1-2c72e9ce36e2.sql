-- Create table for student registrations
CREATE TABLE public.student_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  college_name TEXT NOT NULL,
  city_name TEXT NOT NULL,
  subjective_answers JSONB NOT NULL,
  objective_answers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public registration)
CREATE POLICY "Anyone can register" 
ON public.student_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow admins to view all registrations (you can modify this later)
CREATE POLICY "Public read access" 
ON public.student_registrations 
FOR SELECT 
USING (true);

-- Create index for better query performance
CREATE INDEX idx_student_registrations_created_at ON public.student_registrations(created_at DESC);