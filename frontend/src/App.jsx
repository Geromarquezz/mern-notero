import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import CreatePage from './pages/CreatePage.jsx'

export const App = () => {
  return (
    <div>
      <div data-theme="dark" className='relative h-full w-full'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;