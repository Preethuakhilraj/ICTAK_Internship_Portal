// import { useState, useEffect } from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// // 
// import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';

// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// // 




// //
// import {
//   Dashboard,
//   EditRounded,
//   DeleteRounded,
//   CheckCircleRounded,
//   LibraryBooks,
// } from "@mui/icons-material";
// import {
//   Autocomplete,
//   Grid,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../axiosinterceptor";

// const drawerWidth = 278;

// const theme = createTheme({
//   typography: {
//     fontFamily: "Poppins, Arial, sans-serif",
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontSize: "16px",
//           fontWeight: 600,
//         },
//       },
//     },
//   },
// });

// const Submissions = () => {

//   const { projectTopic } = useParams();
//   const navigate = useNavigate();
//   const [submissions, setSubmissions] = useState([]);
//   const [batchFilter, setBatchFilter] = useState("");
//   const [topicFilter, setTopicFilter] = useState("");


//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axiosInstance.get(`/mentor/${projectTopic}`, {
//           params: {
//             batch: batchFilter,
//             topic: topicFilter,
//           },
//         });
//         setSubmissions(Array.isArray(response.data) ? response.data : []);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching submissions:", error);
//         setSubmissions([]);
//       }
//     };

//     fetchSubmissions();
//   }, [batchFilter, topicFilter, projectTopic]);
//   const handleEdit = (id) => {
//     navigate(`/edit/${id}`);
//   };

//   const handleEvaluate = (id, evaluated) => {
//     if (evaluated) {
//       alert("This submission has already been evaluated.");
//     } else {
//       navigate(`/evaluate/${id}`);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete(`/submission/${id}`);
//       setSubmissions((prevSubmissions) =>
//         prevSubmissions.filter((submission) => submission._id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting submission:", error);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", width: "100%" }}>
//         <CssBaseline />
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             [`& .MuiDrawer-paper`]: {
//               width: drawerWidth,
//               boxSizing: "border-box",
//             },
//             backgroundColor: "#fff",
//           }}
//         >
//           <Toolbar />
//           <Box sx={{ overflow: "auto" }}>
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/mentordashboard"
//                   sx={{
//                     color: "rgba(0, 0, 0, 0.87)", 
//                   }}
//                 >
//                   <ListItemIcon>
//                     <Dashboard />
//                   </ListItemIcon>
//                   <ListItemText primary="Dashboard" />
//                 </ListItemButton>
//               </ListItem>
//               {/* <ListItem disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/reference-materials"
//                   sx={{
//                     color: "rgba(0, 0, 0, 0.87)", 
//                   }}
//                 >
//                   <ListItemIcon>
//                     <LibraryBooks />
//                   </ListItemIcon>
//                   <ListItemText primary="Reference Materials" />
//                 </ListItemButton>
//               </ListItem> */}
//             </List>
//             <Divider/>
//             <Accordion>
//         <AccordionSummary
//           expandIcon={<AddIcon/>}
//           aria-controls="panel1-content"
//           id="panel1-header"
//         >
//           ADD REFERENCE MATERIALS
//         </AccordionSummary>
//         <AccordionDetails>
//         <form  >
//               <TextField
//                 required
//                 id="topic"
//                 name="topic"
//                 label="Topic"
            
//                 variant="filled"
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 required
//                 id="referenceMaterial"
//                 name="referenceMaterial"
//                 label="Reference Material"
//                 // value={newMaterial.referenceMaterial}
//                 // onChange={handleChange}
//                 variant="filled"
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 required
//                 id="postedDate"
//                 name="postedDate"
//                 label="Posted Date"
//                 type="date"
//                 // value={newMaterial.postedDate}
//                 // onChange={handleChange}
//                 variant="filled"
//                 fullWidth
//                 margin="normal"
                
//               />
//               <TextField
//                 required
//                 id="url"
//                 name="url"
//                 label="URL"
//                 // value={newMaterial.url}
//                 // onChange={handleChange}
//                 variant="filled"
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 required
//                 id="status"
//                 name="status"
//                 label="Status"
//                 // value={newMaterial.status}
//                 // onChange={handleChange}
//                 variant="filled"
//                 fullWidth
//                 margin="normal"
//               />
//               <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mr: 2 }}>
//                 Submit
//               </Button>
//               <Button type="button" variant="contained" color="secondary" sx={{ mt: 3 }} >
//                 Cancel
//               </Button>
//             </form>
//         </AccordionDetails>
//              </Accordion>
//       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//       {[1,].map((value) => (
//         <ListItem
//           key={value}
//           disableGutters
//           secondaryAction={
//             <IconButton aria-label="delete">
//               <DeleteIcon />
//             </IconButton>
//           }
//         >
//           <ListItemText primary={`Line item ${value}`} />
//         </ListItem>
//       ))}
//     </List>
      
//            </Box>
     
//         </Drawer>
//         {/* ////////////////////////////// */}
//         <Box
//           component="main"
//           marginTop = '2%'
//           sx={{
           
//             flexGrow: 1,
//             px: 3,
//             py: 2,
//             width: `calc(100% - ${drawerWidth}px)`,
//             boxSizing: "border-box",
//             overflowX: "hidden",
//           }}
//         >
//           <Toolbar />
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-start",
//               gap: 2,
//               marginBottom: 5,
//             }}
//           >
//             <Autocomplete
//               disablePortal
//               id="batch-combo-box"
//               options={batch}
//               sx={{ width: 200 }}
//               renderInput={(params) => <TextField {...params} label="Batch" />}
//               onChange={(event, newValue) =>
//                 setBatchFilter(newValue?.label || "")
//               }
//             />
//             <Autocomplete
//               disablePortal
//               id="topic-combo-box"
//               options={topic}
//               sx={{ width: 200 }}
//               renderInput={(params) => <TextField {...params} label="Topic" />}
//               onChange={(event, newValue) =>
//                 setTopicFilter(newValue?.label || "")
//               }
//             />
//           </Box>
      
//           <Grid item xs={12}  >
//             <Paper elevation={3} sx={{ padding:0 }}>
//               <Table sx={{ minWidth: 1200 }} aria-label="simple table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center">Student Name</TableCell>
//                     <TableCell align="center">Batch</TableCell>
//                     <TableCell align="center">Topic</TableCell>
//                     <TableCell align="center">Evaluation status</TableCell>
//                     <TableCell align="center">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {submissions.map((submission) => (
//                     <TableRow key={submission._id}>
//                       <TableCell align="center">{submission.name}</TableCell>
//                       <TableCell align="center">{submission.batch}</TableCell>
//                       <TableCell align="center">{submission.topic}</TableCell>
//                       <TableCell align="center">
//                         {submission.evaluationStatus ? "Evaluated" : "Pending"}
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           aria-label="check"
//                           onClick={() =>
//                             handleEvaluate(
//                               submission._id,
//                               submission.evaluationStatus
//                             )
//                           }
//                         >
//                           <CheckCircleRounded />
//                         </IconButton>
//                         <IconButton
//                           aria-label="edit"
//                           onClick={() => handleEdit(submission._id)}
//                         >
//                           <EditRounded />
//                         </IconButton>
//                         <IconButton
//                           aria-label="delete"
//                           onClick={() => handleDelete(submission._id)}
//                         >
//                           <DeleteRounded />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Paper>
//           </Grid>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// const batch = [
//   { label: "March-2024" },
//   { label: "January-2024" },
//   { label: "November-2023" },
// ];

// const topic = [
//   { label: "Library website" },
//   { label: "Hospital Management" },
//   { label: "Internship Portal" },
// ];

// export default Submissions;

import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { EditRounded, DeleteRounded, CheckCircleRounded, Dashboard } from '@mui/icons-material';
import {
  Autocomplete,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid,
  Drawer,
  ListItemButton,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 278;

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
  const [open, setOpen] = useState(false);
  const [openMaterialDelete, setOpenMaterialDelete] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    stack: '',
    referenceMaterial: '',
    postedDate: '',
    url: '',
  });
  const [materials, setMaterials] = useState([]);
  const [topics] = useState([
    'Library website',
    'Hospital Management',
    'Internship Portal'
  ]);
  const [stack] = useState([
    'Python Full Stack Development', 
    'ReactJS Development', 
    'Node.js API Development'
  ]);
  const [batches] = useState([
    'March-2024',
    'January-2024',
    'November-2023'
  ]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        console.log('Fetching submissions with:', {
          projectTopic,
          batchFilter,
          topicFilter
        });

        const response = await axiosInstance.get(`/mentor/${projectTopic}`, {
          params: {
            batch: batchFilter,
            topic: topicFilter,
          },
        });

        console.log('API Response:', response);
        const submissionsData = Array.isArray(response.data) ? response.data : [];
        console.log('Processed Submissions Data:', submissionsData);

        setSubmissions(submissionsData);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setSubmissions([]);
      }
    };

    fetchSubmissions();
  }, [batchFilter, topicFilter, projectTopic]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axiosInstance.get('/reference/');
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Added Data:', newMaterial);
    try {
      const response = await axiosInstance.post('/reference/add', newMaterial);
      console.log(response.data);
      alert('New Material added Successfully');
      setMaterials((prevMaterials) => [...prevMaterials, response.data]);
      setNewMaterial({ stack: '', referenceMaterial: '', postedDate: '', url: '' });
    } catch (error) {
      console.error('Error adding material:', error);
    }
  };

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

  const handleDelete = (id) => {
    setCurrentSubmission(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/submission/${currentSubmission}`);
      setSubmissions((prevSubmissions) =>
        prevSubmissions.filter((submission) => submission._id !== currentSubmission)
      );
      setOpen(false);
      setCurrentSubmission(null);
    } catch (error) {
      console.error('Error deleting submission:', error);
      setOpen(false);
      setCurrentSubmission(null);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentSubmission(null);
  };

  const handleDeleteMaterial = (id) => {
    setCurrentMaterial(id);
    setOpenMaterialDelete(true);
  };

  const confirmDeleteMaterial = async () => {
    try {
      await axiosInstance.delete(`/reference/${currentMaterial}`);
      setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== currentMaterial));
      setOpenMaterialDelete(false);
      setCurrentMaterial(null);
    } catch (error) {
      console.error('Error deleting material:', error);
      setOpenMaterialDelete(false);
      setCurrentMaterial(null);
    }
  };

  const handleCloseMaterial = () => {
    setOpenMaterialDelete(false);
    setCurrentMaterial(null);
  };

  console.log('Submissions:', submissions);
  console.log('Materials:', materials);

  const filteredMaterials = materials.filter((material) => {
    const matches = submissions.some((submission) => {
      const submissionTopic = submission.projectTopic.trim().toLowerCase();
      const materialTopic = material.topic.trim().toLowerCase();
      console.log(`Comparing: ${submissionTopic} with ${materialTopic}`);
      return submissionTopic === materialTopic;
    });
    return matches;
  });

  console.log('Filtered Materials:', filteredMaterials);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
            backgroundColor: '#fff',
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <Link to={'/'}>
              <List>
                {['Dashboard'].map((text) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                      <ListItemIcon>
                        <Dashboard />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Link>
            <Divider />
            <Accordion>
              <AccordionSummary expandIcon={<AddIcon />} aria-controls="panel1-content" id="panel1-header">
                ADD REFERENCE MATERIALS
              </AccordionSummary>
              <AccordionDetails>
                <form onSubmit={handleSubmit}>
                  <FormControl fullWidth margin="normal" variant="filled">
                    <InputLabel id="stack-label">Stack</InputLabel>
                    <Select
                      required
                      labelId="stack-label"
                      id="stack"
                      name="stack"
                      value={newMaterial.stack}
                      onChange={handleChange}
                    >
                      {stack.map((stackItem) => (
                        <MenuItem key={stackItem} value={stackItem}>
                          {stackItem}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    id="referenceMaterial"
                    name="referenceMaterial"
                    label="Reference Material"
                    value={newMaterial.referenceMaterial}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    id="postedDate"
                    name="postedDate"
                    label="Posted Date"
                    type="date"
                    value={newMaterial.postedDate}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                   <TextField
                    required
                    id="url"
                    name="url"
                    label="URL"
                    value={newMaterial.url}
                    onChange={handleChange}
                    variant="filled"
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, mr: 2 }}>
                    Submit
                  </Button>
                  <Button type="button" variant="contained" color="secondary" sx={{ mt: 3 }}>
                    Cancel
                  </Button>
                </form>
              </AccordionDetails>
            </Accordion>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {filteredMaterials.map((material) => (
                <ListItem key={material._id} disableGutters secondaryAction={
                  <IconButton aria-label="delete" onClick={() => handleDeleteMaterial(material._id)}>
                    <DeleteRounded />
                  </IconButton>
                }>
                  <ListItemText primary={material.referenceMaterial} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#F7F7F7', p: 3, boxSizing: 'border-box', overflowX: 'hidden' }}>
          <Toolbar />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 10, marginBottom: 5 }}>
            <Autocomplete
              disablePortal
              id="batch-combo-box"
              options={batches.map(batch => ({ label: batch }))}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Batch" />}
              onChange={(event, newValue) => setBatchFilter(newValue?.label || '')}
            />
            <Autocomplete
              disablePortal
              id="topic-combo-box"
              options={topics.map(topic => ({ label: topic }))}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Topic" />}
              onChange={(event, newValue) => setTopicFilter(newValue?.label || '')}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Student Name</TableCell>
                      <TableCell align="center">Batch</TableCell>
                      <TableCell align="center">Topic</TableCell>
                      <TableCell align="center">Evaluation Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission._id}>
                        <TableCell align="center">{submission.name}</TableCell>
                        <TableCell align="center">{submission.batch}</TableCell>
                        <TableCell align="center">{submission.topic}</TableCell>
                        <TableCell align="center">
                          {submission.evaluationStatus ? 'Evaluated' : 'Pending'}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="check"
                            onClick={() => handleEvaluate(submission._id, submission.evaluationStatus)}
                            sx={{
                              color: submission.evaluationStatus ? 'green' : 'red',
                            }}
                          >
                            <CheckCircleRounded />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEdit(submission._id)}
                            sx={{ color: 'blue' }}
                          >
                            <EditRounded />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(submission._id)}
                            sx={{ color: 'purple' }}
                          >
                            <DeleteRounded />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this submission?</DialogContentText>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDelete} color="secondary">
                Confirm
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
        <Dialog open={openMaterialDelete} onClose={handleCloseMaterial}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this reference material?</DialogContentText>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleCloseMaterial} color="primary">
                Cancel
              </Button>
              <Button onClick={confirmDeleteMaterial} color="secondary">
                Confirm
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};
export default Submissions;