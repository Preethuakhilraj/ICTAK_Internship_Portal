import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard, Logout } from '@mui/icons-material';
import { Button, Card, CardContent, CardMedia } from '@mui/material';
import { Link, Navigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif', // Specify Poppins as the default font
  },
});  

function ClippedDrawer() {
    const location = useLocation();
  
    const getPageName = () => {
      switch (location.pathname) {
        case '/':
          return 'Mentor Dashboard';
        case '/submissions':
          return 'Submissions';
        case '/evaluation':
          return 'Evaluation';
        case '/reference-materials':
          return 'Reference Materials';
        case '/reference-materials-form':
          return 'Add Reference Materials';
        case '/admin':
          return 'Admin Dashboard';
        default:
          return 'Dashboard';
      }
    };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff' }}>
          <Toolbar>
          <Link to={'/'}>
          <img 
            src="https://ictkerala.org/assets/images/LOGO_ICTAK-Name.svg" 
            alt="ICTAK Logo" 
            style={{ height: '40px' }} // Adjust the height as needed
          />
        </Link>
        <Typography variant="h5" color="black" component="div" to=""
        sx={{
          color: 'rgba(0, 0, 0, 0.87)', // Default text color
          paddingLeft: '60px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
        }}>
      {getPageName()}
    </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}></Box>
        <Link to={'/'}>
        <ListItemButton 
            sx={{
              color: 'rgba(0, 0, 0, 0.54)', // Default text color
              '&:hover': {
                color: 'rgba(0, 0, 0, 0.87)', // Text color on hover
                backgroundColor: '#ffffff',
              },
              display: 'flex', 
              alignItems: 'center',
              paddingRight: '35px'
            }}
            onClick={()=>{
              localStorage.removeItem('token');
              Navigate('/');
                            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', marginRight: '4px', color: 'inherit' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton> 
          </Link>
          </Toolbar>
        </AppBar>
              </Box>
    </ThemeProvider>
  );
}

export default ClippedDrawer;