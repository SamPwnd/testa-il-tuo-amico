import InitSurvey from './components/InitSurvey'
import SurveyPage from './components/SurveyPage';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>Quanto mi conosci?</h1>
        <Routes>
          <Route path='' element={<InitSurvey />} />
          <Route path='/surveys/:idCode' element={<SurveyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
