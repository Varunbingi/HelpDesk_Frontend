import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteForm from './NoteForm';
import { getNotes, updateTicketStatus, getTicketStatus } from '../services/api'; 
import Sidebar from './Sidebar';

const TicketDetail = () => {
  const { ticketId } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(''); // State for ticket status
  const [isNoteFormDisabled, setIsNoteFormDisabled] = useState(false); // State for disabling NoteForm

  const fetchNotes = async () => {
    try {
      const response = await getNotes(ticketId);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchTicketStatus = async () => {
    try {
      const response = await getTicketStatus(ticketId); // Fetch the ticket status
      setTicketStatus(response.data.status); // Assume response has a 'status' field

      // Disable NoteForm if the status is 'Closed'
      setIsNoteFormDisabled(response.data.status === 'Closed');
    } catch (error) {
      console.error('Error fetching ticket status:', error);
    }
  };

  const closeTicket = async () => {
    setIsLoading(true);
    try {
      await updateTicketStatus(ticketId, 'Closed');
      fetchNotes(); // Refresh notes or update your state accordingly
      setTicketStatus('Closed'); // Update the status in the state
      setIsNoteFormDisabled(true); // Disable NoteForm after closing the ticket
    } catch (error) {
      console.error('Error closing ticket:', error);
      setError('Failed to close the ticket.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchTicketStatus(); // Fetch the ticket status on mount
  }, [ticketId]);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="w-4/5 flex flex-col p-4 relative bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">Ticket Details</h2>

        
        <div className="absolute top-4 right-4 bg-gray-200 text-gray-800 py-1 px-2 rounded-md shadow-md">
          {ticketStatus}
        </div>

        <button
          onClick={closeTicket}
          className="mb-4 px-4 py-2 w-1/4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Closing...' : 'Close Ticket'}
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex-1 mb-4 overflow-auto max-h-[70vh] space-y-4 p-4 border rounded-lg bg-white shadow-md">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note._id} className="border-b border-gray-300 pb-4">
                <p className="text-gray-700">{note.content}</p>
                <small className="block text-gray-500">
                  Author: {note.author.username}
                </small>
                <small className="block text-gray-500">
                  Timestamp: {new Date(note.timestamp).toLocaleString()}
                </small>
                <small className="block text-gray-500">
                  Attachment: {note.attachments}
                </small>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No notes available for this ticket.</p>
          )}
        </div>

        <div className="bg-white p-4 shadow-md rounded-lg">
          <NoteForm ticketId={ticketId} disabled={isNoteFormDisabled} /> {/* Pass the disabled state */}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
