// import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
// import { fetchUser } from '../config/auth';
// import { getUser, setUser as saveUser, removeUser } from '../utils/AuthProf';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loader, setLoader] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const hasLoaded = useRef(false);

//   const loadUser = async () => {
//     // Prevent multiple loads
//     if (hasLoaded.current) return;
//     hasLoaded.current = true;
    
//     setLoader(true);
//     try {
//       // First check localStorage
//       const storedUser = getUser();
//       if (storedUser && storedUser.token) {
//         setUser(storedUser);
//         setIsAuthenticated(true);
//         setLoader(false);
//         return;
//       }
      
//       // If no stored user, try backend
//       try {
//         const userFromBackend = await fetchUser();
//         if (userFromBackend) {
//           setUser(userFromBackend);
//           setIsAuthenticated(true);
//           saveUser(userFromBackend);
//         }
//       } catch (backendError) {
//         console.error('Backend verification failed:', backendError);
//       }
//     } catch (error) {
//       console.error('Error loading user:', error);
//     } finally {
//       setLoader(false);
//     }
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     saveUser(userData);
//     if (userData.token) {
//       localStorage.setItem('token', userData.token);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     removeUser();
//     localStorage.removeItem('token');
//   };

//   const value = {
//     user,
//     loader,
//     isAuthenticated,
//     login,
//     logout,
//     loadUser
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };









// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { fetchUser } from '../config/auth';
import { getUser, setUser as saveUser, removeUser } from '../utils/AuthProf';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasLoaded = useRef(false);

  const loadUser = async () => {
    // Prevent multiple loads
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    
    setLoader(true);
    try {
      // First check localStorage
      const storedUser = getUser();
      const token = localStorage.getItem('token');
      
      // Only try to validate with backend if we have a token
      if (storedUser && storedUser.token && token) {
        setUser(storedUser);
        setIsAuthenticated(true);
        setLoader(false);
        
        // Optional: Verify token with backend in background
        try {
          const userFromBackend = await fetchUser();
          if (userFromBackend) {
            // Update user data if needed
            const updatedUser = { ...userFromBackend, token: storedUser.token };
            setUser(updatedUser);
            saveUser(updatedUser);
          }
        } catch (backendError) {
          // If token is invalid, clear it
          if (backendError.response?.status === 401) {
            console.log('Token invalid, clearing session');
            removeUser();
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      } else {
        // No stored user, just set loader to false
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    saveUser(userData);
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    removeUser();
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loader,
    isAuthenticated,
    login,
    logout,
    loadUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};