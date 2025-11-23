import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuctionData } from '../hooks/useAuctionData';
import type { User, Lot } from '../types';
import MessageNotification from '../components/MessageNotification';

interface CreateLotProps {
  currentUser: User | null;
}

const CreateLot: React.FC<CreateLotProps> = ({ currentUser }) => {
    const navigate = useNavigate();
    const { addLot } = useAuctionData();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [endTime, setEndTime] = useState('');
    const [message, setMessage] = useState<{text: string; type: 'success'|'error'} | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const price = parseFloat(startPrice);

        if (isNaN(price) || price <= 0) {
            setMessage({text: 'Начальная цена должна быть положительным числом.', type: 'error'});
            setIsSubmitting(false);
            return;
        }
        if (new Date(endTime) <= new Date()) {
            setMessage({text: 'Дата окончания должна быть в будущем.', type: 'error'});
            setIsSubmitting(false);
            return;
        }
        if (!currentUser) {
            setMessage({text: 'Ошибка: вы не авторизованы.', type: 'error'});
            setIsSubmitting(false);
            return;
        }

        const newLotData: Omit<Lot, 'id'|'currentPrice'|'bids'> = {
            title, description, imageUrl, startPrice: price, endTime, creatorId: currentUser.id
        };
        addLot(newLotData);
        setMessage({text: 'Лот успешно создан! Вы будете перенаправлены на главную...', type: 'success'});
        
        setTimeout(() => {
            navigate('/');
        }, 2000);
    }

    if (!currentUser) {
      return null; // Or a loading spinner while redirecting
    }

    return (
        <div className="container mx-auto max-w-3xl">
          <Link to="/" className="text-gray-600 hover:text-black mb-6 inline-block">&larr; Назад ко всем аукционам</Link>
          <div className="p-6 sm:p-8 bg-white rounded-lg shadow-xl border border-gray-200">
            <h1 className="text-3xl font-bold text-black mb-6">Создание нового лота</h1>
            {message && <MessageNotification message={message.text} type={message.type} />}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Название</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"/>
                </div>
                 <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Описание</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black h-24 resize-y"></textarea>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">URL изображения</label>
                    <input type="url" id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black" placeholder="https://example.com/image.png"/>
                </div>
                <div>
                    <label htmlFor="startPrice" className="block text-gray-700 text-sm font-bold mb-2">Начальная цена (₽)</label>
                    <input type="number" id="startPrice" value={startPrice} onChange={e => setStartPrice(e.target.value)} required min="0.01" step="0.01" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"/>
                </div>
                 <div>
                    <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">Дата окончания</label>
                    <input type="datetime-local" id="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} required className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"/>
                </div>
                <div className="md:col-span-2 mt-4">
                    <button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Создание...' : 'Создать лот'}
                    </button>
                </div>
            </form>
          </div>
        </div>
    );
};

export default CreateLot;