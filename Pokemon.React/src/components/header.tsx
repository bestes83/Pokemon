import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
//import {}
const Header = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
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