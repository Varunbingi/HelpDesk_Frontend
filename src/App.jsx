import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tickets from './pages/Tickets.jsx';
import Home from './pages/Home.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import TicketDetail from './components/TicketDetail.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRole="Admin" />} />
      <Route path="/tickets" element={<ProtectedRoute element={<Tickets />} />} />
      <Route path="/tickets/:ticketId" element={<TicketDetail />} />
    </Routes>
  );
};

export default App;
