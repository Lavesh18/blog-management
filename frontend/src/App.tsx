import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ViewPost from './pages/ViewPost';
import CreateEditPost from './pages/EditPost'; // ✅ Make sure filename matches

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<ViewPost />} />
        <Route path="/edit/:id" element={<CreateEditPost />} />
        <Route path="/create" element={<CreateEditPost />} />
      </Routes>
    </Router>
  );
}

export default App;