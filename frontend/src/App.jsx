import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape.jsx"
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import DashBoardPage from "./pages/DashBoardPage.jsx";
import { useEffect } from "react";


const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();
	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}
	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}
	return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};
function App() {
 
  const { isCheckingAuth, checkAuth ,isAuthenticated,user} = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);
  console.log("isauthenticated",isAuthenticated);
  console.log("ischecking auth",isCheckingAuth);

  return (
    <div
			className='min-h-screen bg-gradient-to-br
    from-gray-900 via-blue-900 to-gray-500 flex items-center justify-center relative overflow-hidden'>
      			<FloatingShape color='bg-blue-400' size='w-64 h-64' top='-5%' left='10%' delay={0} />

            <Routes>
              <Route path="/" element={<ProtectedRoute><DashBoardPage/></ProtectedRoute>}/>
              <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage/></RedirectAuthenticatedUser>}/>
              <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage/></RedirectAuthenticatedUser>}/>
              <Route path="/verify-email" element={<EmailVerificationPage/>}/>
            </Routes>
            <Toaster/>
    </div>
  )
}

export default App;
