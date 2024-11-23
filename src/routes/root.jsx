// root.jsx
import { useState } from 'react';
import { Outlet, useNavigation, NavLink } from 'react-router-dom';

import ProfileContent from '../components/profile';
import menuData from '../db/ddc.json'

export default function Root() {

    const navigation = useNavigation();

    const [openMenu, setOpenMenu] = useState(null);
    const [topSectionData, setTopSectionData] = useState({ menu: '', submenu: '', filteredBooks: [] });
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [selectedSub2Id, setSelectedSub2Id] = useState("");

    const handleDropdownChange = (e) => {
        const value = e.target.value;
        setSelectedSub2Id(value); // Update the selected `sub2_id`
    };

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu); // Toggle the open menu
    };

    const handleSubmenuClick = (submenu) => {
        setDropdownOptions(submenu?.sub2 || []); // Populate dropdown with `sub2` data if available
        setTopSectionData((prev) => ({
            ...prev,
            submenu: submenu.sub1_label,
            filteredBooks: submenu.dataBook || [],
        }));
    };

    return (
        <>
            <aside className="sidebar">
                <div className="profile"><ProfileContent /></div>

                <ul className="top-menu">
                    {menuData.map((menu) => (
                        <li key={menu.id}>
                            <div className="iocn-link" onClick={() => toggleMenu(menu.id)}>
                                <a href="#">
                                    <i className={menu.root_icon}></i>
                                    <span className="top-menu-style">{menu.root_label}</span>
                                </a>
                                <i
                                    className={`bx bxs-chevron-down arrow ${openMenu === menu.id ? 'rotate' : ''
                                        }`}
                                ></i>
                            </div>
                            {openMenu === menu.id && (
                                <ul className="sub-menu">
                                    {menu.sub1.map((subItem) => (
                                        <li key={subItem.id}>
                                            <NavLink
                                                to={`/${menu.root_label}/${subItem.sub1_label}/${subItem.sub1_id}`}
                                                className={({ isActive }) =>`sidebar-link ${isActive ? "active-link" : ""}`}
                                                onClick={() => handleSubmenuClick(subItem)} // Handle submenu click
                                            >
                                                {subItem.sub1_label}
                                            </NavLink>

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>

            <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
                <div className="top-section">
                    <h2>{topSectionData.menu} : {topSectionData.submenu}</h2>
                    <p> finding {topSectionData.filteredBooks.length} books</p>

                    <div className="dropdown-container">
                        <select onChange={handleDropdownChange} value={selectedSub2Id}>
                            <option value="">Select an option</option>
                            {dropdownOptions.map((option) => (
                                <option key={option.sub2_id} value={option.sub2_id}>
                                    {option.sub2_id}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bottom-section">
                    <Outlet context={{setTopSection: setTopSectionData, selectedSub2Id}}/>
                </div>
            </div>
        </>
    );
}