// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useGlobalState } from '../constants/GlobalStateProvider';

// function UserLogin() {
//   const [user_id, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { getGlobal, setGlobal } = useGlobalState();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         user_id,
//         password
//       });

//       if (response.data.success) {
//         // setGlobalUserId({user_id});
//         setGlobal(user_id);
//         navigate('/UserDash'); // Pass route parameters
//       } else {
//         setError('Invalid username or password');
//       }
      
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError('An error occurred while logging in');
//     }
//   };
// // const [user_id, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const [loggedIn, setLoggedIn] = useState(false);

// //   const handleLogin = async (event) => {
// //     event.preventDefault(); // Prevent form submission

// //     try {
// //       const response = await axios.post('http://localhost:5000/login', {
// //         user_id,
// //         password
// //       });

// //       if (response.data.success) {
// //         setLoggedIn(true); // Set loggedIn to true upon successful login
// //       } else {
// //         setError('Invalid username or password');
// //       }
      
// //     } catch (error) {
// //       console.error('Error logging in:', error);
// //       setError('An error occurred while logging in');
// //     }
// //   };

// //   // Conditional rendering to redirect to new-component upon successful login
// //   if (loggedIn) {
// //     return <Redirect to={{ pathname: '/new-component', state: { user_id, password } }} />;
// //   }


//   return (
//     <main>
//       <div className="container">
//         <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
//           <div className="container">
//             <div className="row justify-content-center">
//               <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
//                 <div className="d-flex justify-content-center py-4">
//                   <a
//                     href="index.html"
//                     className="logo d-flex align-items-center w-auto"
//                   >
//                     <img src="assets/img/logo.png" alt="" />
//                     <span className="d-none d-lg-block">Sigmatronics Innovation</span>
//                   </a>
//                 </div>

//                 <div className="card mb-3">
//                   <div className="card-body">
//                     <div className="pt-4 pb-2">
//                       <h5 className="card-title text-center pb-0 fs-4">
//                         User Login
//                       </h5>
                      
//                     </div>
//                     <div className="col-12">
//                         {error && <div className="alert alert-danger" role="alert">{error}</div>}
//                       </div>
//                     <form onSubmit={handleLogin} className="row g-3 needs-validation" noValidate="">
//                       <div className="col-12">
//                         <label htmlFor="yourUsername" className="form-label">
//                           Username
//                         </label>
//                         <div className="input-group has-validation">
//                           <input
//                             type="text"
//                             name="username"
//                             className="form-control"
//                             id="yourUsername"
//                             value={user_id}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required=""
//                           />
//                           <div className="invalid-feedback">
//                             Please enter your username.
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <label htmlFor="yourPassword" className="form-label">
//                           Password
//                         </label>
//                         <input
//                           type="password"
//                           name="password"
//                           className="form-control"
//                           id="yourPassword"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required=""
//                         />
//                         <div className="invalid-feedback">
//                           Please enter your password!
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <div className="form-check">
//                           <input
//                             className="form-check-input"
//                             type="checkbox"
//                             name="remember"
//                             defaultValue="true"
//                             id="rememberMe"
//                           />
//                           <label
//                             className="form-check-label"
//                             htmlFor="rememberMe"
//                           >
//                             Remember me
//                           </label>
//                         </div>
//                       </div>
//                       <div className="col-12">
//                         <button className="btn btn-primary w-100" type="submit">
//                           Login
//                         </button>
//                       </div>
//                       <div className="col-12">
//                         <p className="small mb-0">
//                           Don't have an account? Create an account
//                         </p>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default UserLogin;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalState } from '../constants/GlobalStateProvider';
import { API_URL } from '../constants/Url';
// const UserLogin = () => {
  
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const { email, password } = formData;

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/login', formData);
//             console.log(res.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
//             <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
//             <button type="submit">Login</button>
//         </form>
//     );
// };

// export default UserLogin;



const UserLogin = () => {
    const navigate = useNavigate();
  const { getGlobal, setGlobal } = useGlobalState();
    const [formData, setFormData] = useState({
        user_id: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const { user_id, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, formData);
            console.log(res.data);
            setGlobal(user_id);
                    navigate('/UserDash'); 
        } catch (error) {
            console.error(error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
            {errorMessage && <div style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', backgroundColor: '#f8d7da', color: '#721c24' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="email" name="user_id" value={user_id} onChange={handleChange} placeholder="Email" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
            </form>
        </div>
    );
};

export default UserLogin;
