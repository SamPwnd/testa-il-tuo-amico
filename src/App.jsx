import Header from './components/Header';
import Footer from './components/Footer';
import InitSurvey from './components/InitSurvey'
import SurveyPage from './components/SurveyPage';
import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <div className='mt-36'></div>
        <Routes>
          <Route path='' element={<InitSurvey />} />
          <Route path='/surveys/:idCode' element={<SurveyPage />} />
        </Routes>
        <Footer />
      </HashRouter>
    </>
  )
}

export default App
