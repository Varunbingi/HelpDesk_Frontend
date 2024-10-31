import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTickets } from '../services/api'; 
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const userId = useSelector((state) => state.user.userInfo.id);
  const userRole = useSelector((state) => state.user.userInfo.role); 
  const navigate = useNavigate();

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  

  useEffect(() => {
    fetchTickets();
  }, [userId, userRole]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ul className="space-y-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li
              key={ticket._id}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/tickets/${ticket._id}`)}
            >
              <h4 className="text-lg font-semibold">{ticket.title}</h4>
              <p className="text-gray-600">
                Status: <span className="capitalize font-medium">{ticket.status}</span>
              </p>
              <p className="text-gray-500 text-sm">
                Last Updated On: {new Date(ticket.lastUpdatedOn).toLocaleString()}
              </p>

            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No tickets found.</p>
        )}
      </ul>
    </div>
  );
};

export default TicketList;
