import './App.css';
import BookSearchPage from './pages/BookSearchPage/BookSearchPage';
import PersonalBookshelfPage from './pages/PersonalBookshelfPage/PersonalBookshelfPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SearchProvider } from './hooks/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<BookSearchPage />} />
          <Route path="/bookshelf" element={<PersonalBookshelfPage />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
