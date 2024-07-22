import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Dashboard, EditRounded, DeleteRounded, CheckCircleRounded, LibraryBooks } from '@mui/icons-material';
import { Autocomplete, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosinterceptor';


const drawerWidth = 240;

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontSize: '16px',
          fontWeight: 600,
        },
      },
    },
  },
});

const Submissions = () => {
  const { projectTopic } = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [batchFilter, setBatchFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axiosInstance.get(`/mentor/${projectTopic}`, {
          params: {
            batch: batchFilter,
            topic: topicFilter
          },
        });
        setSubmissions(Array.isArray(response.data) ? response.data : []);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setSubmissions([]);
      }
    };

    fetchSubmissions();
  }, [batchFilter, topicFilter, projectTopic]);
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleEvaluate = (id, evaluated) => {
    if (evaluated) {
      alert('This submission has already been evaluated.');
    } else {
      navigate(`/evaluate/${id}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/submission/${id}`);
      setSubmissions((prevSubmissions) => prevSubmissions.filter((submission) => submission._id !== id));
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

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
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/mentordashboard"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)', // Default text color
                  }}
                >
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  to="/reference-materials"
                  sx={{
                    color: 'rgba(0, 0, 0, 0.87)', // Default text color
                  }}
                >
                  <ListItemIcon>
                    <LibraryBooks />
                  </ListItemIcon>
                  <ListItemText primary="Reference Materials" />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
          </Box>
        </Drawer>
        <Box component="main" sx={{ 
         flexGrow: 1,
         px: 3,
         py: 2,
         width: `calc(100% - ${drawerWidth}px)`,
         boxSizing: 'border-box',
         overflowX: 'hidden',
         }}>
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, marginBottom: 5 }}>
            <Autocomplete
              disablePortal
              id="batch-combo-box"
              options={batch}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Batch" />}
              onChange={(event, newValue) => setBatchFilter(newValue?.label || '')}
            />
            <Autocomplete
              disablePortal
              id="topic-combo-box"
              options={topic}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Topic" />}
              onChange={(event, newValue) => setTopicFilter(newValue?.label || '')}
            />
          </Box>
          
          <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Table sx={{ minWidth: 1200 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Student Name</TableCell>
                  <TableCell align="center">Batch</TableCell>
                  <TableCell align="center">Topic</TableCell>
                  <TableCell align="center">Evaluation status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission._id}>
                    <TableCell align="center">{submission.name}</TableCell>
                    <TableCell align="center">{submission.batch}</TableCell>
                    <TableCell align="center">{submission.topic}</TableCell>
                    <TableCell align="center">{submission.evaluationStatus ? 'Evaluated' : 'Pending'}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="check" onClick={() => handleEvaluate(submission._id, submission.evaluationStatus)}>
                        <CheckCircleRounded />
                      </IconButton>
                      <IconButton aria-label="edit" onClick={() => handleEdit(submission._id)}>
                        <EditRounded />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(submission._id)}>
                        <DeleteRounded />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </Paper>
            </Grid>
          
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const batch = [
  { label: 'March-2024' },
  { label: 'January-2024' },
  { label: 'November-2023' },
];

const topic = [
  { label: 'Library website' },
  { label: 'Hospital Management' },
  { label: 'Internship Portal' },
];

export default Submissions;
