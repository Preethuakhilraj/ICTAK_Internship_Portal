import Drawer from '@mui/material/Drawer';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Dashboard } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosinterceptor';

const drawerWidth = 240;

const MentorsList = () => {
  const [topics, setTopics] = useState([]); // State to hold topics
  const [data, setData] = useState([]);
  const [newMentor, setNewMentor] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    projectTopics: [],
  });
  const [openAdd, setOpenAdd] = useState(false);
  const [updateMentor, setMentorUpdate] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  

  useEffect(() => {
    // Fetch the list of mentors
    axiosInstance
      .get('/admin/mentorslist')
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching mentors:', error);
      });

    // Fetch the list of projects and extract topics
    axiosInstance
      .get('/admin/projectslist')
      .then((res) => {
        const projects = res.data;
        // Extract unique topics from projects
        const uniqueTopics = [
          ...new Set(projects.map((project) => project.topic)),
        ];
        // Create objects with topic title and ID (using index as _id for simplicity)
        const topicsData = uniqueTopics.map((topic, index) => ({
          _id: index.toString(), // Generate a unique ID for each topic
          topic,
        }));
        setTopics(topicsData);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  const handleOpenAddDialog = () => setOpenAdd(true);
  const handleCloseAddDialog = () => {
    setNewMentor({
      name: '',
      email: '',
      phone: '',
      password: '',
      projectTopics: [],
    });
    setOpenAdd(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewMentor({ ...newMentor, [name]: value });
  };

  const handleAutocompleteChange = (event, newValue) => {
    setNewMentor({
      ...newMentor,
      projectTopics: newValue.map((topic) => topic.topic), // Store topics directly as strings
    });
  };

  // const handleAdd = async () => {
  //   if (
  //     !newMentor.name ||
  //     !newMentor.email ||
  //     !newMentor.phone ||
  //     !newMentor.password ||
  //     !newMentor.projectTopics.length
  //   ) {
  //     alert('Please fill in all fields.');
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.post('/admin/addmentor', newMentor);
  //     setData([...data, response.data]);
  //     handleCloseAddDialog();
  //   } catch (error) {
  //     console.error('Error adding Mentor:', error);
  //   }
  // };

  const handleOpenUpdateDialog = (mentor) => {
    setMentorUpdate(mentor);
    setOpenUpdate(true);
  };

  const handleCloseUpdateDialog = () => {
    setMentorUpdate(null);
    setOpenUpdate(false);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setMentorUpdate({ ...updateMentor, [name]: value });
  };

  const handleUpdateAutocompleteChange = (event, newValue) => {
    setMentorUpdate({
      ...updateMentor,
      projectTopics: newValue.map((topic) => topic.topic), // Store topics directly as strings
    });
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.patch(
        `/admin/updatementor/${updateMentor._id}`,
        updateMentor
      );
      const res = await axiosInstance.get('/admin/mentorslist');
      setData(res.data);
      handleCloseUpdateDialog();
    } catch (error) {
      console.error('Error updating Mentor:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Mentor?'
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/admin/deletementor/${id}`);
        setData(data.filter((mentor) => mentor._id !== id));
      } catch (error) {
        console.error('Error deleting mentor:', error);
      }
    }
  };


  //error
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    projectTopics: false,
  });
  
  const handleAdd = async () => {
    const newErrors = {
      name: !newMentor.name,
      email: !newMentor.email,
      phone: !newMentor.phone,
      password: !newMentor.password,
      projectTopics: !newMentor.projectTopics.length,
    };
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).includes(true)) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('/admin/addmentor', newMentor);
      setData([...data, response.data]);
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding Mentor:', error);
    }
  };
  


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
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddDialog}
          >
            + Add Mentor
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Mentors</TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Email
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Phone
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Project Topics
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.phone}</TableCell>

                  <TableCell align="left">
                    {row.projectTopics.join(', ')}{' '}
                    {/* Directly display topics */}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton onClick={() => handleOpenUpdateDialog(row)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row._id)}>
                      <DeleteIcon style={{ color: 'red' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add Mentor Dialog */}
          <Dialog open={openAdd} onClose={handleCloseAddDialog}>
            <DialogTitle>Add Mentor</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                fullWidth
                variant="standard"
                value={newMentor.name}
                onChange={handleAddInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={newMentor.email}
                onChange={handleAddInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="tel"
                fullWidth
                variant="standard"
                value={newMentor.phone}
                onChange={handleAddInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={newMentor.password}
                onChange={handleAddInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <Autocomplete
                multiple
                options={topics}
                getOptionLabel={(option) => option.topic}
                onChange={handleAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Project Topics"
                    variant="standard"
                    sx={{
                      '& .MuiInputBase-root': {
                        borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                      },
                    }}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddDialog}>Cancel</Button>
              <Button onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>

          {/* Update Mentor Dialog */}
          <Dialog open={openUpdate} onClose={handleCloseUpdateDialog}>
            <DialogTitle>Update Mentor</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                fullWidth
                variant="standard"
                value={updateMentor?.name || ''}
                onChange={handleUpdateInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="standard"
                value={updateMentor?.email || ''}
                onChange={handleUpdateInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="tel"
                fullWidth
                variant="standard"
                value={updateMentor?.phone || ''}
                onChange={handleUpdateInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                value={updateMentor?.password || ''}
                onChange={handleUpdateInputChange}
                sx={{
                  '& .MuiInputBase-root': {
                    borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                  },
                }}
              />
              <Autocomplete
                multiple
                options={topics}
                getOptionLabel={(option) => option.topic}
                value={topics.filter((topic) =>
                  updateMentor?.projectTopics.includes(topic.topic)
                )}
                onChange={handleUpdateAutocompleteChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Project Topics"
                    variant="standard"
                    sx={{
                      '& .MuiInputBase-root': {
                        borderBottom: errors.name ? '1px solid red' : '1px solid #ccc',
                      },
                    }}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MentorsList;
