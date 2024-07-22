import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Auth from './components/Form/Auth';
import Playground from './components/PlayGround/Playground';
function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<Auth />} />     
         <Route path='/playground' element={<Playground />} />  
      </Routes>
    </BrowserRouter>
  )
}

export default App
