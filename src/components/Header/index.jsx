import { useSelector, useDispatch } from "react-redux";
import db from "../../assets/db/category.json";
import {
    toggleHamburgerIconVisibility,
    populateTabData,
} from "../../store/actions";
import "./Header.css";

function Header() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { isHamburgerIconVisible } = state;

    function handleHamburgerIconClick() {
        dispatch(toggleHamburgerIconVisibility(!isHamburgerIconVisible));
    }

    const handleSelectChange = (selectedSource) => {
        const staticData = db[selectedSource];
        dispatch(populateTabData(staticData));  // Sends the static data to Redux store
    };

    return (
        <div className="header">
            <span className="hamburger-icon">
                <i onClick={handleHamburgerIconClick} className="fas fa-bars"></i>
            </span>
            <span className="app-title">AI Books Hub</span>
            <div className="row-centered">
                <div className="choose-source-container">
                    <div className="menu-item" onClick={() => handleSelectChange("IT")}>IT</div>
                    <div className="menu-item" onClick={() => handleSelectChange("Literature")}>Literature</div>
                    <div className="menu-item" onClick={() => handleSelectChange("Textbooks")}>Textbooks</div>
                    <div className="menu-item" onClick={() => handleSelectChange("MBA")}>MBA</div>
                    <div className="menu-item" onClick={() => handleSelectChange("School")}>School</div>
                    <div className="menu-item" onClick={() => handleSelectChange("Economy")}>Economy</div>
                    <div className="menu-item" onClick={() => handleSelectChange("History")}>History</div>
                    <div className="menu-item" onClick={() => handleSelectChange("Arts")}>Arts</div>
                    <div className="menu-item" onClick={() => handleSelectChange("Science")}>Science</div>
                    <div className="menu-item" onClick={() => handleSelectChange("Professional")}>Professional</div>
                    <div className="menu-item" onClick={() => handleSelectChange("Society")}>Society</div>

                </div>
            </div>
        </div>
    );
}

export default Header;
