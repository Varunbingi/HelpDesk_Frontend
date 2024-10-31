import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const Home = () => {
  const userRole = useSelector((state) => state.user.role); 

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole={userRole}/>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Help Desk</h1>
        <p className="mt-4">Welcome to the home page!</p>
        <p className="mt-4">If you have issues raise the Ticket</p>
        
      </main>
    </div>
  );
};

export default Home;
