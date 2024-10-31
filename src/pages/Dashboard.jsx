import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar.jsx'
const Dashboard=()=>{
    const userRole = useSelector((state) => state.user.role); 

    return(
        <div className='flex'>
            <Sidebar userRole={userRole}/>
            <div>
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}
export default Dashboard;