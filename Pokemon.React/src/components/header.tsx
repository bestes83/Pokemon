import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark" className="mb-3">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        PokeDex.React
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;