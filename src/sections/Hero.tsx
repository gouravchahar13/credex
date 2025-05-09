import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { DollarSign, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10" />
      
      {/* Abstract shape */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -right-64 -top-64 w-[800px] h-[800px] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute right-1/3 top-1/4 w-[600px] h-[600px] rounded-full bg-teal-100/30 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Transform Unused Software into 
              <span className="text-blue-700"> Instant Value</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 md:pr-12">
              SoftSell helps businesses recover costs from unused software licenses. Get fair market value, instant quotes, and fast payouts.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" href="#contact">
                Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" href="#how-it-works">
                How It Works
              </Button>
            </div>
            <div className="mt-8 flex items-center text-gray-500">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span>Over $10M recovered for our clients in 2024</span>
            </div>
          </div>
          
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="relative mx-auto max-w-md lg:max-w-full">
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden p-1">
                <img 
                  src="https://images.pexels.com/photos/7681069/pexels-photo-7681069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Software license valuation" 
                  className="rounded-xl w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-xl" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs">
                    <div className="flex items-center mb-2">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-green-700">Instant Valuation</span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      Get a fair market price for your unused software licenses in minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;