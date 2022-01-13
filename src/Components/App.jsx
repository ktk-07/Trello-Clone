import react from "react";
import { ReactDOM } from "react";

import FirstPage from "../webpages/FirstPage";
import { SignupPage } from "../webpages/SignupPage";
import { LoginPage } from "../webpages/LoginPage";
import { ProjectPage } from "../webpages/ProjectPage";
import { HomePage } from "../webpages/HomePage";
import { Route,Routes } from "react-router-dom";

function App(){
    return (<div id="Pages">
    {/* More ways to refine app is to add a loading  page and a error 404 page or somesort */}

    <Routes>
        <Route path="/signup" element = {<SignupPage />}></Route>
        <Route path="/login" element ={<LoginPage />}></Route>

        <Route path="/home" element={<HomePage />} > </Route>
        <Route path="/projectpage/:wsTitle" element={<ProjectPage />} > </Route>

        <Route path="/" element={<FirstPage />}> </Route>
        
    </Routes>
    </div>);
}

export default App;