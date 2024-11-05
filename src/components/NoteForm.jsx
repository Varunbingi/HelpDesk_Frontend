import { useState } from 'react';
import { addNoteToTicket } from '../services/api';

const NoteForm = ({ ticketId, onNoteAdded, disabled }) => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (file) formData.append('file', file);

    await addNoteToTicket(ticketId, formData);
    setContent('');
    setFile(null);
    onNoteAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white rounded-md shadow-lg max-w-lg mx-auto">
      <textarea
        placeholder="Add note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        disabled={disabled}
        className={`w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
      />
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
        disabled={disabled}
        className="file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 file:rounded-md"
      />
      <button
        type="submit"
        disabled={disabled}
        className={`self-start bg-blue-500 text-white py-1 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
