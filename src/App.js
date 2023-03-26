import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Context from './Context';
import RequireAuth from './hoc/RequireAuth';
import AuthProvider from './hoc/AuthProvider';
import AllCases from './pages/AllCases';
import Main from './pages/Main';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Report from './pages/Report';
import DetalisCase from './pages/DetalisCase';
import AllOfficers from './pages/AllOfficers';
import DetalisOfficer from './pages/DetalisOfficer';

function App() {

  const token = localStorage.getItem('token') || null;
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  return (
    <Context.Provider value={{ user, setUser, loading, token, setLoading }}>
      <AuthProvider token={token} setUser={setUser} setLoading={setLoading} >
        <Routes>
          <Route exact path='/velo' element={<Main />} />
          <Route path='/reportAll' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/report' element={<Report />} />
          <Route exact path='/allCases' element={
            <RequireAuth>
              <AllCases />
            </RequireAuth>
          } />
          <Route exact path='/allOfficers' element={
            <RequireAuth>
              <AllOfficers />
            </RequireAuth>
          } />
          <Route exact path='/cases/:id' element={
            <RequireAuth>
              <DetalisCase />
            </RequireAuth>
          } />
          <Route exact path='/officers/:id' element={
            <RequireAuth>
              <DetalisOfficer />
            </RequireAuth>
          } />
        </Routes>
      </AuthProvider>
    </Context.Provider>
  );
}

export default App;
