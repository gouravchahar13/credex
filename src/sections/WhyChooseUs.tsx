import React, { useRef, useState, useEffect } from 'react';
import { Shield, Clock, DollarSign, Award } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isInView: boolean;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, index, isInView }) => {
  return (
    <div 
      className={`transition-all duration-700 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="h-full bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
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
  
  const features = [
    {
      icon: <DollarSign className="h-6 w-6 text-blue-700" />,
      title: "Best Market Value",
      description: "Our proprietary valuation engine ensures you get the highest possible return for your software licenses. We analyze current market trends to offer competitive prices.",
      index: 0
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-700" />,
      title: "Secure Transactions",
      description: "Your data and transactions are protected with enterprise-grade security. We use bank-level encryption and secure transfer protocols to keep your information safe.",
      index: 1
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-700" />,
      title: "Fast Processing",
      description: "Get quotes in minutes and payment within 24-48 hours. Our streamlined process eliminates unnecessary delays so you can access your funds quickly.",
      index: 2
    },
    {
      icon: <Award className="h-6 w-6 text-blue-700" />,
      title: "Compliance Guaranteed",
      description: "All transactions are fully compliant with software licensing regulations and legal requirements. Our legal team ensures all transfers are properly documented.",
      index: 3
    }
  ];
  
  return (
    <section id="why-choose-us" className="py-16 md:py-24" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Why Choose SoftSell
          </h2>
          <p className={`text-xl text-gray-600 max-w-xl mx-auto transition-all duration-700 delay-100 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            We've helped thousands of businesses recover value from their unused software assets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Feature key={feature.index} {...feature} isInView={isInView} />
          ))}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-700 delay-600 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center px-6">
              <div className="text-4xl font-bold text-blue-700 mb-2">$10M+</div>
              <p className="text-gray-600">Recovered for clients</p>
            </div>
            <div className="bg-gray-300 w-px h-16 hidden md:block"></div>
            <div className="text-center px-6">
              <div className="text-4xl font-bold text-blue-700 mb-2">5,000+</div>
              <p className="text-gray-600">Transactions completed</p>
            </div>
            <div className="bg-gray-300 w-px h-16 hidden md:block"></div>
            <div className="text-center px-6">
              <div className="text-4xl font-bold text-blue-700 mb-2">24hrs</div>
              <p className="text-gray-600">Average payment time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;