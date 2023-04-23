import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UserPage from '../UserPage/UserPage';
import IntroPage from '../IntroPage/IntroPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import WeekPage from '../WeekPage/WeekPage';
import QuestionsPage from '../QuestionsPage/QuestionsPage';
import PrioritiesPage from '../PrioritiesPage/PrioritiesPage';
import AdminPage from '../AdminPage/AdminPage';
import EditQuestionsPage from '../EditQuestionsPage/EditQuestionsPage';
import './App.css';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute exact path="/user">
            {/* logged in shows UserPage (OR IntroPage), else shows LoginPage */}
            {!user.introComplete ?
              <Redirect to="/intro" />  // If introComplete is falsy, redirect to IntroPage
              :
              <UserPage />  // else, go to userPage
            }
          </ProtectedRoute>

          <ProtectedRoute exact path="/intro">
            {/* logged in shows IntroPage (OR UserPage), else shows LoginPage */}
            {user.introComplete ?
              <Redirect to="/user" />  // If introComplete is truthy, redirect to UserPage
              :
              <IntroPage />  // else, go to IntroPage
            }
          </ProtectedRoute>

          <ProtectedRoute exact path="/week">
            {/* logged in shows CreateWeekPage else shows LoginPage */}
            <WeekPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/questions">
            {/* logged in shows QuestionsPage else shows LoginPage */}
            <QuestionsPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/priorities">
            {/* logged in shows PrioritiesPage (OR IntroPage) else shows LoginPage */}
            <PrioritiesPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin">
            {!user.admin ?
              <Redirect to="/user" />  // If the user is not admin, redirect to /user
              :
              <AdminPage />  // Otherwise, show the admin page
            }
          </ProtectedRoute>

          <ProtectedRoute exact path="/editquestions">
            {!user.admin ?
              <Redirect to="/user" />  // If the user is not admin, redirect to /user
              :
              <EditQuestionsPage />  // Otherwise, show the edit questions page
            }
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ?
              <Redirect to="/user" />  // If the user is already logged in, redirect to /user
              :
              <LoginPage />  // Otherwise, show the login page
            }
          </Route>

          <Route exact path="/registration">
            {user.id ?
              <Redirect to="/user" />  // If the user is already logged in, redirect to /user
              :
              <RegisterPage />  // Otherwise, show the registration page
            }
          </Route>

          <Route exact path="/home">
            {user.id ?
              <Redirect to="/user" />  // If the user is already logged in, redirect to /user
              :
              <LandingPage />  // Otherwise, show the Landing page
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>

        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
