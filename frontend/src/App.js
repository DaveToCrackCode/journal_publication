import "./App.css";
// import './style/app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JournalSubmitForm from "./pages/JournalSubmitForm";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin, Reviewer } from "./middleware/auth.js";
import Home from "./pages/Home";
// import Circle from './component/Circle.jsx';

import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import AllReviewer from "./pages/adminPages/AllReviewer.jsx";
import AllJournal from "./pages/AllJournal.jsx";
import AddReviewer from "./component/AddReviewer.jsx";
import Layout from "./component/Layout.jsx";
import AllSubmittedJournalAuthor from "./pages/AllSubmittedJournalAuthor.jsx";
import CompleteJournalDetailsAuthor from "./pages/CompleteJournalDetailsAuthor.jsx";
import AllJournalForReviewing from "./pages/reviewerPages/AllJournalForReviewing.jsx";
import FeedBackOnJournal from "./pages/reviewerPages/FeedBackOnJournal.jsx";
import FeedBackPage from "./pages/reviewerPages/FeedBackPage.jsx";
import Instructions from "./pages/Instructions.jsx";
import AllAuthors from "./pages/adminPages/AllAuthors.jsx";
import PaperInReview from "./pages/adminPages/PaperInReview.jsx";
import ReviewerRequest from "./pages/adminPages/ReviewerRequest.jsx";
import TrackProgress from "./pages/adminPages/TrackProgress.jsx";
import TrackDetails from "./pages/adminPages/TrackDetails.jsx";
function App() {
  return (
    <>
      <Router>
        <Toaster />

        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Public>
                <Layout>
                  {" "}
                  <Signup />
                </Layout>
              </Public>
            }
          />
          <Route
            path="/login"
            element={
              <Public>
                <Layout>
                  {" "}
                  <Login />
                </Layout>
              </Public>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/instructions"
            element={
              <Layout>
                <Instructions />
              </Layout>
            }
          />


          <Route
            path="/submit_paper"
            element={
              <Protected>
                <Layout>
                  {" "}
                  <JournalSubmitForm />
                </Layout>
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Layout>
                  {" "}
                  <Profile />
                </Layout>
              </Protected>
            }
          />
          <Route
            path="/all-submit-paper"
            element={
              <Protected>
                <Layout>
                  {" "}
                  <AllSubmittedJournalAuthor />
                </Layout>
              </Protected>
            }
          />
          <Route
            path="/journal/author/:id"
            element={
              <Protected>
                <Layout>
                  {" "}
                  <CompleteJournalDetailsAuthor />
                </Layout>
              </Protected>
            }
          />
          <Route
            path="/admin/track_details/:id"
            element={
              <Admin>
                <Layout>
                  {" "}
                  <TrackDetails />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/all-journal"
            element={
              <Admin>
                <Layout>
                  {" "}
                  <AllJournal />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/list-of-reviewer"
            element={
              <Admin>
                <Layout>
                  <AllReviewer />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/all-authors"
            element={
              <Admin>
                <Layout>
                  <AllAuthors />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/reviewer-request"
            element={
              <Admin>
                <Layout>
                  <ReviewerRequest />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/paper-in-review"
            element={
              <Admin>
                <Layout>
                  <PaperInReview />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/track-progress"
            element={
              <Admin>
                <Layout>
                  <TrackProgress />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/journal/:id"
            element={
              <Admin>
                <Layout>
                  <AddReviewer />
                </Layout>
              </Admin>
            }
          />
          <Route
            path="/all-journal-for-reviewing"
            element={
              <Reviewer>
                <Layout>
                  <AllJournalForReviewing />
                </Layout>
              </Reviewer>
            }
          />
          <Route
            path="/journal/reviewer/:id"
            element={
              <Reviewer>
                <Layout>
                  {" "}
                  <FeedBackOnJournal />
                </Layout>
              </Reviewer>
            }
          />
           <Route
            path="/journals/reviewer/feedback/:id"
            element={
              <Reviewer>
                <Layout>
                  {" "}
                  <FeedBackPage />
                </Layout>
              </Reviewer>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;