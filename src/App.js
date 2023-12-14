
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { Header } from './Components/Header';
import { ViewInventory } from './Pages/ViewInventory';
import { UpdateStock } from './Pages/UpdateStock';
import { AddToInventory } from './Pages/AddToInventory';
import { ModifyProduct } from './Pages/ModifyProduct';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route index element={<Home/>} path='/home'/>
      <Route index element={<Home/>} path='/'/>
      <Route index element={<ViewInventory/>} path='/view-inventory'/>
      <Route index element={<UpdateStock/>} path='/update-stock'/>
      <Route index element={<AddToInventory/>} path='/add-to-inventory'/>
      <Route index element={<ModifyProduct/>} path='/modifyProduct/:productId'/>
    </Routes>
    </>
    
  );
}

export default App;
