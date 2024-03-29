import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/home";
import Menu from "./components/menu";
import Admin from "./components/admin/adminHome";
import Cocktails from "./components/categories/cocktails";
import Mocktails from "./components/categories/mocktails";
import Spirits from "./components/categories/spirits";
import Shots from "./components/categories/shots";
import AdminMenu from './components/admin/adminMenu';
import DrinkManagement from './components/admin/drinkManagement';
import AddDrink from './components/admin/addDrink';
import AddAdmin from './components/admin/adminNew';
import AddDrinkSuccess from './components/admin/addDrinkSuccess';
import Categories from './components/categories';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/menu' element={<Menu />}></Route>
          <Route path='/categories' element={< Categories/>}></Route>
          <Route path='/cocktails' element={<Cocktails />}></Route>
          <Route path='/mocktails' element={<Mocktails />}></Route>
          <Route path='/spirits' element={<Spirits />}></Route>
          <Route path='/shots' element={<Shots />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/admin' element={<Admin />}></Route>
          <Route path='/adminmenu' element={<AdminMenu />}></Route>
          <Route path='/addadmin' element={<AddAdmin />}></Route>
          <Route path='/adddrink' element={<AddDrink />}></Route>
          <Route path='/drinkmanagement' element={<DrinkManagement />}></Route>
          <Route path='/addsuccess' element={< AddDrinkSuccess/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
