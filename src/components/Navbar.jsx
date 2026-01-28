import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import Logo from "@/assets/Logo/Logo.svg";
import BellIcon from "@/assets/icons/bell.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import AngleRightIcon from "@/assets/icons/angle-small-right.svg?react";
import { useState } from "react";

const menuList = [
  {
    label: "Team",
    value: "team",
  },
  {
    label: "Myself",
    value: "myself",
  },
  {
    label: "Policies",
    value: "policies",
  },
];

const Navbar = (props) => {
  const [selectedMenu, setSelectedMenu] = useState(menuList[0]);
  return (
    <div className="h-16 w-full shrink-0 bg-brand-primary flex items-center text-white fixed top-0 left-0 z-30">
      {/* LEFT: LOGO */}
      <div className="w-[4.5rem] shrink-0 flex items-center justify-center">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
      </div>

      {/* CENTER: SEARCH */}
      <div className="px-6 flex-1 flex justify-start">
        <div className="flex-1 flex items-center ">
          <Menu value={selectedMenu}>
            <MenuHandler>
              <button className="flex items-center gap-2">
                {selectedMenu?.label ?? "Select Menu"}{" "}
                <AngleRightIcon className="w-6 h-6 rotate-90 fill-white" />
              </button>
            </MenuHandler>
            <MenuList className="min-w-20">
              {menuList.map((menu) => (
                <MenuItem
                  key={menu.value}
                  value={menu.value}
                  onClick={() => setSelectedMenu(menu)}
                >
                  {menu.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>

        <div className="flex items-center gap-2">
          <IconButton variant="text" className="relative">
            <SearchIcon className="h-5 w-5 fill-white" />
          </IconButton>
          <IconButton variant="text" className="relative">
            <BellIcon className="h-5 w-5 fill-white" />
            {false && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </IconButton>

          {/* RIGHT: ICONS + PROFILE */}
          <div className="flex items-center gap-2 text-white">
            <Avatar src="https://i.pravatar.cc/150?img=32" size="sm" />
            {/* <span className="text-sm hidden md:block">Aisha Sharma</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
