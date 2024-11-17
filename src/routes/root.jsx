import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import ProfileContent from '../components/profile';
import menuData from '../db/ddc.json'

export default function Root() {
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu); // Toggle the open menu
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
                                            <Link to={`/${menu.root_label}/${subItem.sub_label}/${subItem.sub1_id}`} className="sidebar-link">
                                                {subItem.sub_label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>

            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}