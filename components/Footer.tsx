import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-12 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 text-center text-gray-600">
        <p className="font-bold text-lg text-black mb-2">Аукцион</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} Аукцион. Все права защищены. Демонстрационный проект.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-black transition-colors">Facebook</a>
          <a href="#" className="hover:text-black transition-colors">Twitter</a>
          <a href="#" className="hover:text-black transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;