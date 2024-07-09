import Header from './components/Header';
import InitSurvey from './components/InitSurvey'
import SurveyPage from './components/SurveyPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <h1 className='f1'>Quanto mi conosci?</h1>
        <h1 className='f2'>Quanto mi conosci?</h1>
        <h1 className='font-sans'>Quanto mi conosci?</h1>
        <Routes>
          <Route path='' element={<InitSurvey />} />
          <Route path='/surveys/:idCode' element={<SurveyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
