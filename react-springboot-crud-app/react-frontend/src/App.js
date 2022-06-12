import './App.css';
import React from 'react';
/*Switch permite que solo se renderice un elemento al mismo tiempo */
// import {BrowserRouter as Router, Routes, Switch} from 'react-router-dom'; antigua librería
import {BrowserRouter,Routes,Route} from "react-router-dom";

import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

// import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';

function App() {
  return (
    /*Importar el header y la lista */
    <div >
      <BrowserRouter>
        <div className="container">
          <HeaderComponent/>
            <Routes>
                  <Route path = "/" exact element= {<ListEmployeeComponent />}></Route>                  
                  <Route path="/employees" element= {<ListEmployeeComponent />}></Route>
                  {/* <Route exact path="/add-employee" element= {<CreateEmployeeComponent />}></Route> */}
                  <Route path="/add-employee/:id" element= {<CreateEmployeeComponent />}></Route>
                  <Route path="/view-employee/:id" element= {<ViewEmployeeComponent />}></Route>
                  {/* <Route exact path = "/update-employee/:id" element= {<UpdateEmployeeComponent />}></Route> */}
            </Routes>
          <FooterComponent/>
        </div>

      </BrowserRouter>

    </div>    

  );
}

export default App;
