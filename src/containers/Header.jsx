import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";

import { NavLink, Routes, Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Breadcrumb } from "../features/common/components/Breadcrumb";

function Header() {
  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle, pageTitle2 } = useSelector(
    (state) => state.header
  );

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );

  const tokenJWT = localStorage.getItem("token");
  const fullName = jwtDecode(tokenJWT).FullName;

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  function logoutUser() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <>
      <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="">
          {/* <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1> */}
          {/* <Breadcrumb pg1={pageTitle} pg2="Nhà 123 lê hoàng thái" /> */}

          <Breadcrumb pg1={pageTitle} pg2={pageTitle2} />
        </div>

        <div className="order-last">
          <label className="swap ">
            <h1 className="text-2x font-semibold ml-2">{fullName}</h1>
          </label>
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

          {/* Light and dark theme selection toogle **/}
          {/* <label className="swap ">
                        <input type="checkbox" />
                        <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "dark" ? "swap-on" : "swap-off")} />
                        <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 " + (currentTheme === "light" ? "swap-on" : "swap-off")} />
                    </label> */}

          {/* Notification icon */}
          <button
            className="btn btn-ghost ml-4  btn-circle"
            onClick={() => openNotification()}
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {noOfNotifications}
                </span>
              ) : null}
            </div>
          </button>


          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/app/settings-profile"}>Chỉnh sửa hồ sơ</Link>
              </li>
              <li className="">
                <Link to={"/app/settings-billing"}>
                  Bill History <span className="badge">New</span>
                </Link>
              </li>
              <div className="divider mt-0 mb-0"></div>
              <li>
                <p onClick={logoutUser}>Đăng xuất</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
