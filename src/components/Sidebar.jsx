import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from "../store/Slice/userSlice";

const Sidebar = () => {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen h-full shadow-lg">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Help Desk App</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/tickets"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded transition"
              >
                Tickets
              </Link>
            </li>
            {user?.role === "Admin" && (
              <li>
                <Link
                  to="/dashboard"
                  className="block text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded transition"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {user ? (
              <li>
                <Link
                  to={"/"}
                  onClick={handleLogout}
                  className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded transition"
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded transition"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded transition"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
