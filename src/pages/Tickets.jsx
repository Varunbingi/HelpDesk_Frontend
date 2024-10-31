import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import AddTicket from '../components/AddTicket';
import TicketList from '../components/TicketList';

const Tickets = () => {
  const userRole = useSelector((state) => state.user.userInfo.role);
  console.log(userRole);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar userRole={userRole} />
      <main className="flex-1 p-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Tickets</h1>

        {userRole === 'Customer' && (
          <>
            <h2 className="text-2xl mb-4">Create Ticket</h2>
            <AddTicket />
          </>
        )}

        
        <div className="flex-1 mt-6 overflow-y-auto">
          <TicketList />
        </div>
      </main>
    </div>
  );
};

export default Tickets;
