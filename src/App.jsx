import React from 'react';
import {Route, createBrowserRouter,createRoutesFromElements, RouterProvider} from 'react-router-dom'
import MainLayout from './Layouts/MainLayout';
import MainPage from './Pages/MainPage';
import AddPokemonPage from './Pages/AddPokemonPage';
import SimulateFightPage from './Pages/SmulateFightPage';
import TrainerPage from './Pages/TrainerPage'
import TrainerBattlePage from './Pages/TrainerBattlePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ='/' element ={<MainLayout/>}>
      <Route index element={<MainPage/>}/>
      <Route path='add-pokemon' element={<AddPokemonPage />} />
      <Route path='simulate-fight' element={<SimulateFightPage />} />
      <Route path='trainers' element={<TrainerPage />} />
      <Route path='trainer-battles' element={<TrainerBattlePage />} />
    </Route>
  )
)


const App = () => {
  return (
      <RouterProvider router = {router}/>
  );
};

export default App;
