import { Routes, Route } from 'react-router-dom'
import { ReduxProvider } from './redux/provider'
import { AuthProvider } from './context/Auth_Context'

// Import pages
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Register/Signup'
import About from './pages/About/About'
import Account from './pages/Account/Account'
import Events from './pages/Events/Events'
import Search from './pages/Search'
import Support from './pages/Support/Support'
import My_Societies from './pages/My_Societies/My_Societies'
import Societies from './pages/Societies/Societies'
import Society_Detail from './pages/Society_Profile/Society_Detail'
import Society_Events from './pages/Society_Events/Society_Events'
import Society_Members from './pages/Society_Members/Society_Members'
import Society_Join_Requests from './pages/Society_Join_Requests/Society_Join_Requests'
import Society_Settings from './pages/Society_Settings/Society_Settings'
import New_Society from './pages/New_Society/New_Society'
import New_Event from './pages/New_Event/New_Event'
import Header from '@/Shared_Components/layout/Header';
import Search_Header from '@/Shared_Components/layout/Search_Header';

function App() {
  return (
    <div className="font-sans antialiased">
      <ReduxProvider>
        <AuthProvider>
          <Header />
          <Search_Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />
            <Route path="/events" element={<Events />} />
            <Route path="/search" element={<Search />} />
            <Route path="/support" element={<Support />} />
            <Route path="/my-societies" element={<My_Societies />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/societies/new" element={<New_Society />} />
            <Route path="/societies/:id" element={<Society_Detail />} />
            <Route path="/societies/:id/events" element={<Society_Events />} />
            <Route path="/societies/:id/events/new" element={<New_Event />} />
            <Route path="/societies/:id/members" element={<Society_Members />} />
            <Route path="/societies/:id/join-requests" element={<Society_Join_Requests />} />
            <Route path="/societies/:id/settings" element={<Society_Settings />} />
          </Routes>
        </AuthProvider>
      </ReduxProvider>
    </div>
  )
}

export default App 