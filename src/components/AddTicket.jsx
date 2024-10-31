import { useState } from 'react';
import { createTicket, getTickets } from '../services/api';
import { useSelector } from 'react-redux';

const AddTicket = () => {
  const userId = useSelector((state) => state.user.userInfo.id);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createTicket({ title, userId });
      setTitle('');
      
    } catch (err) {
      setError('Error creating ticket. Please try again.');
      console.error('Ticket creation error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 space-y-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Ticket Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
      >
        Add Ticket
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default AddTicket;
