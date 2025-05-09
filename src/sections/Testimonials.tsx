import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "SoftSell helped us recover over $50,000 from unused enterprise software licenses. The process was quick and their valuation was higher than we expected. Highly recommended for any IT department looking to optimize their software spend.",
    name: "Sarah Chen",
    role: "CTO",
    company: "Nexus Innovations",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "As a growing startup, cash flow is critical. SoftSell allowed us to recover capital from over-purchased software licenses with minimal effort. Their team was professional, and the payment was processed within 24 hours of acceptance.",
    name: "Marcus Johnson",
    role: "CFO",
    company: "TechFront Solutions",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const TestimonialCard: React.FC<TestimonialProps & { isActive: boolean }> = ({ 
  quote, name, role, company, image, isActive 
}) => {
  return (
    <div className={`transition-all duration-500 transform ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute'}`}>
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
        <div className="flex mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-gray-700 text-lg md:text-xl italic mb-8">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <img 
            src={image} 
            alt={name} 
            className="w-14 h-14 rounded-full object-cover mr-4"
          />
          <div>
            <div className="font-semibold text-gray-800">{name}</div>
            <div className="text-gray-600">{role}, {company}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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
  
  const goToPrev = () => {
    setActiveIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };
  
  const goToNext = () => {
    setActiveIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };
  
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            What Our Clients Say
          </h2>
          <p className={`text-xl text-gray-600 max-w-xl mx-auto transition-all duration-700 delay-100 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Trusted by businesses of all sizes to maximize the value of their software assets.
          </p>
        </div>
        
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                {...testimonial} 
                isActive={index === activeIndex} 
              />
            ))}
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-blue-700 scale-110' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-6">
              <button
                onClick={goToPrev}
                className="bg-white rounded-full p-2 shadow-md hover:bg-blue-50 transition-colors text-gray-700"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-6">
              <button
                onClick={goToNext}
                className="bg-white rounded-full p-2 shadow-md hover:bg-blue-50 transition-colors text-gray-700"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;