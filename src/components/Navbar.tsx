import React, { useState, useEffect } from 'react';
import { Menu, X, MonitorSmartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MonitorSmartphone className="h-8 w-8 text-blue-700 dark:text-blue-400 mr-2" />
            <span className="text-xl font-bold text-blue-900 dark:text-white">SoftSell</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <motion.a 
              href="#how-it-works" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              How It Works
            </motion.a>
            <motion.a 
              href="#why-choose-us" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Why Choose Us
            </motion.a>
            <motion.a 
              href="#testimonials" 
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Testimonials
            </motion.a>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <Button href="#contact" size="sm">
              Get Started
            </Button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800 py-4 px-4 flex flex-col space-y-4"
          >
            <a 
              href="#how-it-works" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors py-2"
            >
              How It Works
            </a>
            <a 
              href="#why-choose-us" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors py-2"
            >
              Why Choose Us
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition-colors py-2"
            >
              Testimonials
            </a>
            <Button 
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              fullWidth
            >
              Get Started
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;