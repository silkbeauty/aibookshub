import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import db from "./assets/db/category.json";
import "./css/App.css";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar/index.jsx";
import MainLayout from "./components/MainLayout/index.jsx";
import { populateTabData } from "./store/actions";

function App() {
    const dispatch = useDispatch();
    const isHamburgerIconVisible = useSelector(
        (state) => state.isHamburgerIconVisible
    );

    useEffect(() => {
        dispatch(populateTabData(db.newsoutlets));
    }, [dispatch]);

    return (
            <div className="App">
                <div className="header"><Header /></div>
                <div className="content-layout">
                    <div className={`sidebar ${isHamburgerIconVisible ? "hidden" : ""}`}><Sidebar /></div>
                    <div className={`mainlayout ${isHamburgerIconVisible ? "expanded" : ""}`}><MainLayout /></div>
                </div>
            </div>
    );
}

export default App;

