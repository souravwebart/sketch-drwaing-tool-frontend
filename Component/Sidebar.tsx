import React from "react";
import SidebarMenu from "react-bootstrap-sidebar-menu";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { BsFillHouseFill, BsFillVinylFill } from "react-icons/bs";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useRouter } from "next/router";

interface Props {
  setShow: any;
  show: any;
}

function Sidebar(Props: Props) {
  const router = useRouter();

  const { setShow, show } = Props;
  const handleShow = () => {
    setShow(!show);
  };

  const homeClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/");
  };

  const demoClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/Demo");
  };

  return (
    <SideNav style={{ position: "relative" }}>
      <SideNav.Toggle onClick={handleShow} />
      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home" onClick={homeClick}>
          <NavIcon>
            <BsFillHouseFill size={20} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem eventKey="Demo" onClick={demoClick}>
          <NavIcon>
            <BsFillVinylFill size={20} />
          </NavIcon>
          <NavText>Demo</NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default Sidebar;
