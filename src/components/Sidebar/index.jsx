import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    handleNewsSource,
    searchTabData,
    resetTabData,
    populateTabData,
} from "../../store/actions";
import "./Sidebar.scss";
import contentData from "../../assets/db/mainlayout.json";

function Sidebar() {
    const dispatch = useDispatch();
    const { newsSource, tabData } = useSelector((state) => state);
    const [searchText, setSearchText] = useState("");

    // Handle item click and update the active news source in Redux
    const handleItemClick = (item) => {
        dispatch(handleNewsSource(item.name)); // Ensure item.name corresponds to the keys in content.json
        // No need to populate tab data here; it's handled in MainLayout
    };

    const handleSearch = async (event) => {
        setSearchText(event.target.value.toLowerCase());
        dispatch(searchTabData(searchText));
    };

    const handleClearSearchBar = () => {
        setSearchText("");
        dispatch(resetTabData());
    };

    return (
        <div className="sidebar-container">
            <div className="search-container">
                <div className="search-container2">
                    <input
                        type="text"
                        value={searchText}
                        placeholder="Search"
                        onChange={handleSearch}
                        className="searchField"
                    />
                    {searchText.length === 0 ? (
                        <i className="fas fa-search searchIcon"></i>
                    ) : (
                        <i
                            className="fas fa-times-circle searchIcon"
                            onClick={handleClearSearchBar}
                        ></i>
                    )}
                </div>
            </div>
            <div className="tabsParent-container">
                <div className="tabs-container">
                    {tabData.map((dt) => {
                        return (
                            <div
                                key={dt.name}
                                className={`nSource ${newsSource === dt.name ? "activeNewsSource" : ""}`}
                                onClick={() => handleItemClick(dt)} // Call handleItemClick with the current item
                            >
                                <img
                                    src={dt.image}
                                    alt={dt.title}
                                    className="logo-img"
                                />

                                <span className="d-title">{dt.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
