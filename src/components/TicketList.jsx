import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TicketList = ({ tickets }) => {
  const userId = useSelector((state) => state.user.userInfo.id);
  const userRole = useSelector((state) => state.user.userInfo.role); 
  const navigate = useNavigate();

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
