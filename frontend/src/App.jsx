import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape.jsx"
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";

function App() {
  return (
    <div
			className='min-h-screen bg-gradient-to-br
    from-gray-900 via-blue-900 to-gray-500 flex items-center justify-center relative overflow-hidden'>
      			<FloatingShape color='bg-blue-400' size='w-64 h-64' top='-5%' left='10%' delay={0} />

            <Routes>
              <Route path="/" element={"home"}/>
              <Route path="/signup" element={<SignUpPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/verify-email" element={<EmailVerificationPage/>}/>
            </Routes>
    </div>
  )
}

export default App;
