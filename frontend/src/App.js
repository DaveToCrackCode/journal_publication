import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JournalSubmitForm from "./pages/JournalSubmitForm";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin, Reviewer } from "./middleware/auth.js";
import Home from "./pages/Home";

import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import AllReviewer from "./pages/AllReviewer.jsx";
import AllJournalAdmin from "./pages/AllJournalAdmin.jsx";
import AddReviewer from "./component/AddReviewer.jsx";
import Layout from './component/Layout.jsx';
import AllSubmittedJournalAuthor from './pages/AllSubmittedJournalAuthor.jsx';
import CompleteJournalDetailsAuthor from './pages/CompleteJournalDetailsAuthor.jsx'

function App() {
  return (
    <>
      <Router>
        <Toaster />
        
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route
            path="/signup"
            element={
              <Public>
               <Layout> <Signup /></Layout>
              </Public>
            }
          />
          <Route
            path="/login"
            element={
              <Public>
               <Layout> <Login /></Layout>
              </Public>
            }
          />
          <Route 
            path="/about" 
            element={
              <Layout><About /></Layout>
            } 
          />
          
          <Route
            path="/submit_paper"
            element={
              <Protected>
               <Layout> <JournalSubmitForm /></Layout>
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
              <Layout>  <Profile /></Layout>
              </Protected>
            }
          />
          <Route
            path="/all-submit-paper"
            element={
              <Protected>
               <Layout> <AllSubmittedJournalAuthor /></Layout>
              </Protected>
            }
          />
          <Route
            path="/all-submit-paper"
            element={
              <Protected>
               <Layout> <JournalSubmitForm /></Layout>
              </Protected>
            }
          />
           <Route
            path="/all-journal"
            element={
              <Admin>
              <Layout>  <AllJournalAdmin /></Layout>
              </Admin>
            }
          />
          <Route
            path="/list-of-reviewer"
            element={
              <Admin>
                <Layout><AllReviewer /></Layout>
              </Admin>
            }
          />
           <Route
            path="/journal/author/:id"
            element={
              <Protected>
               <Layout> <CompleteJournalDetailsAuthor /></Layout>
              </Protected>
            }
          />
          <Route
            path="/journal/:id"
            element={
              <Admin>
                <Layout><AddReviewer /></Layout>
              </Admin>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
