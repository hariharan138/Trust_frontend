
// import React, { Children, useEffect, useState } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({requiredRole }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     // const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
//     // const savedUserRole = localStorage.getItem('role');
//     // if (savedIsLoggedIn === 'true' && savedUserRole) {
//       //   setIsLoggedIn(true);
//       //   setUserRole(savedUserRole);
//       // }
      
//       // Get the token from cookies
//     const admintoken = document.cookie
//       .split(';')
//       .find(cookie => cookie.trim().startsWith('admintoken='));

//     if (admintoken) {
//       const token = admintoken.split('=')[1];
//       try {
//         const decoded = jwtDecode(token); // Decode the token
//         console.log("Decoded token:", decoded);

//         const isExpired = decoded.exp * 1000 <= Date.now();
//         console.log("Is token expired?", isExpired);

//         if (!isExpired) {
//           // Check if the token is not expired
//           setIsLoggedIn(true);
//           setUserRole(decoded.role); // Set the role from the token payload
//           // localStorage.setItem('isLoggedIn', 'true');
//           // localStorage.setItem('role', decoded.role);
//         } else {
//           setIsLoggedIn(false); // Token expired
//           // localStorage.removeItem('isLoggedIn');
//           // localStorage.removeItem('role');
//         }
//       } catch (err) {
//         console.error('Error decoding token:', err);
//         setIsLoggedIn(false); // Invalid token
//         // localStorage.removeItem('isLoggedIn');
//         // localStorage.removeItem('role');
//       }
//     } else {
//       setIsLoggedIn(false); // No token found
//       // localStorage.removeItem('isLoggedIn');
//       // localStorage.removeItem('role');
//     }
//   }, []);

//   if (!isLoggedIn || (requiredRole && userRole !== requiredRole)) {
//     // Redirect to the corresponding login page based on the role
//     if (requiredRole === 'admin') {
//       return <Navigate to="/admin" />;
//     } else if (requiredRole === 'user') {
//       return <Navigate to="/user" />;
//     } else {
//       return <Navigate to="/trust" />;
//     }
//   }

//   // If logged in and role matches, render the children (protected route)
//   return <Outlet />;
// };

// export default ProtectedRoute;

import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import  {jwtDecode} from 'jwt-decode';

// ProtectedRoute component will handle checking the token
function ProtectedRoute({ children , requiredRole }) {
  const navigate = useNavigate()

  const roleToLoginPath = {
    admin: "/admin",   // path name for login page for admin
    user: "/userlogin",     // path name for login page for user
    trust: "/trustlogin",   // path name for login page for trust
  };

    const checkAuth = () => {

      const roleToCookieName = {
        admin: "admintoken",
        trust: "authToken",
        user: "userlogintoken",
      };
  
      // Get the cookie name for the required role
      const cookieName = roleToCookieName[requiredRole];

      const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith(`${cookieName}=`));

      if (token) {
        const decodedToken = jwtDecode(token.split('=')[1]);
        if (decodedToken.role === requiredRole) {
          return true; // Authorized
        } else {
          navigate(roleToLoginPath[decodedToken.role]);
          return false;
        }
      } else {
        navigate(roleToLoginPath[requiredRole]); // Redirect to login if no token
        return false;
      }
    }  

    useEffect(() => {
      checkAuth(); // Only called once when component mounts
    }, [requiredRole, navigate]); 

  return children;  // If authenticated, render the protected route's children
}

export default ProtectedRoute;
