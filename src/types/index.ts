export interface Feature {
  title: string;
  description: string;
  icon: React.FC;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}