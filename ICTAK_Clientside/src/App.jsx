import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import MentorDashboard from './components/mentor/MentorDashboard';
import Submissions from './components/mentor/Submissions';
import Evaluation from './components/mentor/Evaluation';
import ReferenceMaterial from './components/mentor/ReferenceMaterial';
import ReferenceMaterialForm from './components/mentor/ReferenceMaterialForm';
import Main from './components/Main';


function App() {

  return (
    
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/mentordashboard' element={<Main child={<MentorDashboard />} />} />
        <Route path="/submissions/:projectTopic" element={<Main child={<Submissions />} />} />
        <Route path="/evaluate/:id" element={<Main child={<Evaluation />} />} />
        <Route path="/edit/:id" element={<Main child={<Evaluation />} />} />
        <Route path="/reference-materials" element={<Main child={<ReferenceMaterial />} />} />
        <Route path="/reference-materials-form" element={<Main child={<ReferenceMaterialForm />} />} />
      </Routes>
  )
}

export default App
