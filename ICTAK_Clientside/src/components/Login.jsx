import { Box, Button,  TextField, Typography } from '@mui/material';
import axiosInstance from './axiosinterceptor';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Image = 'https://images.pexels.com/photos/5950164/pexels-photo-5950164.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', { email, password });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.email === 'ictak@example.com') {
          navigate('/admin');
        } else {
          navigate('/mentordashboard');
        }
      } 
    } catch (error) {
      // console.error('Login error:', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized - invalid credentials
        const errorMessage = error.response.data.message;
        if (errorMessage === 'Invalid username') {
          setError('Invalid username');
        } else if (errorMessage === 'Invalid password') {
          setError('Invalid password');
        } else {
          setError('Invalid username or password');
        }
      } else {
        console.error('Login error:', error);
        setError('An error occurred. Please try again.');
      }
    }
  };
  const backgroundImage = 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexDirection: 'column',
        gap: 2,
        margin: 0,
        padding: 0
      }}
    >
      <Box
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
          borderRadius: 2,
          backgroundColor: 'rgba(240, 242, 245, 0.85)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '70%',
            height: '70%',
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 2,
            }}
          >
            <Box
              component="img"
              sx={{
                height: 'auto',
                width: '90%',
                maxHeight: '95%',
                objectFit: 'cover',
              }}
              alt="Employee form image"
              src={Image}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            <Box sx={{ width: '80%' }}>
              <Typography variant="h4" gutterBottom>
                Welcome Back to Login!<hr />
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  fullWidth
                  margin="normal"
                />
                {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
                                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
                >
                  Login
                </Button>
                <Typography
                  sx={{ mt: 2 }}
                  component={Link}
                  to="/signup"
                  variant="body2"
                  color="primary"
                >
                  Don’t have an account yet? Sign Up Now
                </Typography>
              </form>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}