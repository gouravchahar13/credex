import React, { useRef, useEffect, useState } from 'react';
import { Upload, DollarSign, CreditCard, CheckCircle } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isInView: boolean;
}

const Step: React.FC<StepProps> = ({ icon, title, description, step, isInView }) => {
  return (
    <div className={`transition-all duration-700 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} 
         style={{ transitionDelay: `${(step - 1) * 150}ms` }}>
      <div className="bg-white rounded-xl shadow-md p-6 h-full hover:shadow-lg transition-shadow">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">
            {step}
          </div>
          {step < 3 && (
            <div className="h-0.5 bg-blue-200 flex-grow ml-2 hidden md:block"></div>
          )}
        </div>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);
  
  const steps = [
    {
      icon: <Upload className="h-7 w-7 text-blue-700" />,
      title: "Upload License Details",
      description: "Share your unused software license information through our secure platform. We support all major vendors.",
      step: 1
    },
    {
      icon: <DollarSign className="h-7 w-7 text-blue-700" />,
      title: "Get Valuation",
      description: "Receive a competitive market valuation within minutes. Our AI pricing engine ensures you get the best possible offer.",
      step: 2
    },
    {
      icon: <CreditCard className="h-7 w-7 text-blue-700" />,
      title: "Get Paid",
      description: "Accept the offer and receive payment via your preferred method within 24-48 hours. Fast, secure, and hassle-free.",
      step: 3
    }
  ];
  
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            How It Works
          </h2>
          <p className={`text-xl text-gray-600 max-w-xl mx-auto transition-all duration-700 delay-100 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Our streamlined process makes it easy to convert your unused software licenses into cash.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <Step key={step.step} {...step} isInView={isInView} />
          ))}
        </div>
        
        <div className={`mt-16 bg-blue-700 rounded-xl p-8 text-white text-center max-w-3xl mx-auto transition-all duration-700 delay-500 ${isInView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h3 className="text-2xl font-semibold mb-2">Ready to get started?</h3>
          <p className="mb-6">Convert your unused software licenses into cash today.</p>
          <a 
            href="#contact" 
            className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
          >
            Get a Free Valuation
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;