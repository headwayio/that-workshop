import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

const Header = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">THAT Conference</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/schedule">Schedule</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/speakers">Speakers</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
