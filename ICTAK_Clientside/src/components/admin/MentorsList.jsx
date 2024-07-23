//import React from 'react'
import Drawer from '@mui/material/Drawer';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';

// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const MentorsList = () => {


  return (
    <Box
      sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          backgroundColor: '#fff',
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Link to={'/admin'}>
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
            </List>
          </Link>

          <Link to={'/admin/mentorslist/'}>
            <List>
              {['Mentors'].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    sx={{
                      color: 'rgba(0, 0, 0, 0.87)', // Default text color
                    }}
                  >
                    <ListItemIcon>{<PersonIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Link>

          <Divider />
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '65px' }}>
        {/* add codes */}

      </Box>
    </Box>
  );
};

export default MentorsList;
