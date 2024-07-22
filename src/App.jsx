import Header from './components/Header';
import InitSurvey from './components/InitSurvey'
import SurveyPage from './components/SurveyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='mt-36'></div>
        <Routes>
          <Route path='' element={<InitSurvey />} />
          <Route path='/surveys/:idCode' element={<SurveyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
