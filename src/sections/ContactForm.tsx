import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/Button';
import { Check, AlertCircle } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  company: string;
  licenseType: string;
  message: string;
};

type FormErrors = {
  [key in keyof FormState]?: string;
};

const ContactForm: React.FC = () => {
  const initialState: FormState = {
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  };
  
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
  
  const licenseOptions = [
    { value: '', label: 'Select License Type' },
    { value: 'microsoft', label: 'Microsoft' },
    { value: 'adobe', label: 'Adobe' },
    { value: 'oracle', label: 'Oracle' },
    { value: 'sap', label: 'SAP' },
    { value: 'autodesk', label: 'Autodesk' },
    { value: 'other', label: 'Other' }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.licenseType) {
      newErrors.licenseType = 'Please select a license type';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData(initialState);
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <section id="contact" className="py-16 md:py-24" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 ${isInView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Turn Your Unused Licenses into Cash?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Fill out the form, and our team will get back to you with a free valuation within 24 hours.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">What types of licenses do you buy?</h4>
                    <p className="text-gray-600 text-sm">We purchase a wide range of business software licenses, including Microsoft, Adobe, Oracle, SAP, and more.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">How is the price determined?</h4>
                    <p className="text-gray-600 text-sm">We analyze current market rates, remaining subscription time, and transferability to offer competitive prices.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">How long does the process take?</h4>
                    <p className="text-gray-600 text-sm">From submission to payment, the process typically takes 1-3 business days depending on license complexity.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <img 
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Customer service team" 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">Need assistance?</div>
                  <div className="text-blue-700">support@softsell.com</div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 ${isInView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <div className="bg-white rounded-xl shadow-lg p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your message has been submitted successfully. Our team will get back to you within 24 hours with a free valuation.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-semibold mb-6">Get a Free Valuation</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="john@company.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            errors.company ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Acme Inc."
                        />
                        {errors.company && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.company}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 mb-1">
                          License Type
                        </label>
                        <select
                          id="licenseType"
                          name="licenseType"
                          value={formData.licenseType}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-md border ${
                            errors.licenseType ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                        >
                          {licenseOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.licenseType && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.licenseType}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className={`w-full px-4 py-2 rounded-md border ${
                            errors.message ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder="Describe the software licenses you wish to sell..."
                        ></textarea>
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Get Free Valuation'}
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-4 text-center">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;