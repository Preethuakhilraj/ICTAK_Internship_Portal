import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard, Logout } from '@mui/icons-material';
import { Alert, Button, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from './axiosinterceptor'; // Assuming this is your Axios instance with interceptors


const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Specify Poppins as the default font
  },
});  

// backend

const ProjectCard = ({ project, handleView }) => (
  <Card className="project-card">
    <CardMedia
      component="img"
      image="https://www.shutterstock.com/image-vector/internship-blue-green-typography-banner-260nw-1366933799.jpg"
      alt={project.name}
    />
    <CardContent className="project-card-details">
      <Typography className="project-card-title">{project.name}</Typography>
      <Button size="small" color="primary" style={{ backgroundColor: '#024acf', color: 'white' }} onClick={() => handleView(project._id)}>
        View
      </Button>
    </CardContent>
  </Card>
);

// backend

export default function ClippedDrawer() {

// backend

const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('./')
        console.log('API Response:', response.data);
        setData(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Fetch user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser?.email); // Set the user email
    }
  }, []);

  const handleView = (projectId) => {
    navigate(`/submissions/${projectId}`);
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="5vh"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

//backend


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            backgroundColor: '#fff'
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Link to={'/'}>
            <List>
              {['Dashboard'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton 
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)', // Default text color
                  }}
                  >
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List></Link>
            <Divider />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 0, m: 0, width: `calc(100% - ${drawerWidth}px)`, boxSizing: 'border-box', overflowX: 'hidden'}}>
          <Toolbar />
          <div className="container">
            <img
              src="https://jobick.dexignlab.com/react/demo/static/media/profile1.45c723dab8349c3d75ef.jpg"
              alt="Background"
              className="bg-image"
            />
            <div className="content">
              <div className="profile-pic">
                <img
                  src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                  alt="Employee Profile"
                  className="profile-image"
                />
              </div>
              <div className="profile-details">
                <h4 className="employee-name">Mentor Name</h4>
              </div>
              <button className="update-profile-button">Update Profile</button>
            </div>
          </div>
          <Typography className="project-head">
            <h2>Projects</h2>
          </Typography>
          <div className="card-container">
              
              {/* backend */}

              {data.length === 0 ? (
              <p>No projects found.</p>
            ) : (
              data.map((project) => (
                <ProjectCard key={project._id} project={project} handleView={handleView} />
              ))
            )}

              {/* backend */}


          {/* <Card className="project-card">
  <CardMedia
    component="img"
    image="https://www.shutterstock.com/image-vector/internship-blue-green-typography-banner-260nw-1366933799.jpg"
    alt="Project Image"
  />
  <CardContent className="project-card-details">
    <Typography className="project-card-title">
      Mern Full Stack Development
    </Typography>
    <Link to={'/submissions'}>
    <Button size="small" color="primary" style={{ backgroundColor: '#024acf', color: 'white' }}>
      View
    </Button></Link>
  </CardContent>
</Card>

<Card className="project-card">
  <CardMedia
    component="img"
    image="https://www.shutterstock.com/image-vector/internship-blue-green-typography-banner-260nw-1366933799.jpg"
    alt="Project Image"
  />
  <CardContent className="project-card-details">
    <Typography className="project-card-title">
      Mean Full Stack Development
    </Typography>
    <Link to={'/submissions'}>
    <Button size="small" color="primary" style={{ backgroundColor: '#024acf', color: 'white' }}>
      View
    </Button>
    </Link>
  </CardContent>
</Card> */}
            {/* Add more cards here */}
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
