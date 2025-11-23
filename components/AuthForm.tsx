import React, { useState } from 'react';

interface AuthFormProps {
  onLogin: (userId: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId.trim()) {
      onLogin(userId.trim());
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-2xl border border-gray-200">
      <h2 className="text-2xl font-bold text-black mb-6 text-center">Присоединяйтесь к аукциону</h2>
      <p className="text-gray-600 mb-6 text-center">Введите ID пользователя, чтобы делать ставки и создавать лоты. Это симуляция, пароль не требуется.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-800 text-sm font-bold mb-2">
            ID Пользователя
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
            placeholder="например, user123"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
        >
          Войти на аукцион
        </button>
      </form>
    </div>
  );
};

export default AuthForm;