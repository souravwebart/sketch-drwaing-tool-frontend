import { useRouter } from "next/router";
import { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/Auth";

function Header() {
  const { user: currentUser } = useSelector((state: any) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch<any>();

  const logOut = useCallback(() => {
    dispatch(logout());
    router.push("/");
  }, [dispatch]);

  const loginHandle = (e: any) => {
    e.preventDefault();
    router.push("/Login");
  };

  const registerHandle = (e: any) => {
    e.preventDefault();
    router.push("/Register");
  };

  const homeHandle = (e: any) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand
            className="brand"
            onClick={homeHandle}
            style={{ cursor: "pointer" }}
          >
            SketchTool
          </Navbar.Brand>
          {currentUser && currentUser.email ? (
            <Nav className="loginbuton">
              <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <div className="login-Register" style={{ display: "flex" }}>
              <div>
                <button
                  onClick={loginHandle}
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{ marginRight: "10px" }}
                >
                  Login
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-success btn-sm"
                  onClick={registerHandle}
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
