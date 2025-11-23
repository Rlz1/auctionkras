import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AuctionList from './pages/AuctionList';
import LotDetail from './pages/LotDetail';
import { useAuctionData } from './hooks/useAuctionData';
import type { User } from './types';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import CreateLot from './pages/CreateLot';

const App: React.FC = () => {
  const { getUser, saveUser } = useAuctionData();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(getUser());
  }, [getUser]);

  const handleLogin = useCallback((userId: string) => {
    const newUser = { id: userId };
    saveUser(newUser);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false); // Close modal on login
  }, [saveUser]);

  const handleLogout = useCallback(() => {
    saveUser(null);
    setCurrentUser(null);
  }, [saveUser]);

  return (
    <HashRouter>
      <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
        <Header
          currentUser={currentUser}
          onLogout={handleLogout}
          onAuthClick={() => setIsAuthModalOpen(true)}
        />
        <main className="p-4 sm:p-6 md:p-8 flex-grow">
          <Routes>
            <Route path="/lot/:id" element={<LotDetail currentUser={currentUser} />} />
            <Route path="/create-lot" element={<CreateLot currentUser={currentUser} />} />
            <Route path="/" element={<AuctionList currentUser={currentUser} />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {isAuthModalOpen && (
         <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsAuthModalOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          <div 
            className="w-full max-w-md m-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
              <div className="relative">
                <button 
                    onClick={() => setIsAuthModalOpen(false)} 
                    className="absolute -top-8 right-0 text-gray-400 hover:text-black transition-colors z-10"
                    aria-label="Закрыть"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <AuthForm onLogin={handleLogin} />
              </div>
          </div>
        </div>
      )}
    </HashRouter>
  );
};

export default App;