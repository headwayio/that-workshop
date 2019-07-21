import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from "reactstrap";

const Header = () => {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">THAT Conference</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
