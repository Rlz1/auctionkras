import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onAuthClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-black hover:text-gray-700 transition-colors">
          <img src="https://api.iconify.design/mdi/gavel.svg" alt="Логотип Аукциона" className="h-8 w-8" />
          <span>Аукцион</span>
        </Link>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="text-gray-700 hidden sm:inline">
                Добро пожаловать, <strong className="font-medium text-black">{currentUser.id}</strong>
              </span>
              <Link
                to="/create-lot"
                className="bg-black text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
              >
                Создать лот
              </Link>
              <button
                onClick={onLogout}
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onAuthClick}
                className="bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-md text-sm hover:bg-gray-200 transition-colors"
              >
                Войти
              </button>
              <button
                onClick={onAuthClick}
                className="bg-black text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-gray-800 transition-colors"
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;