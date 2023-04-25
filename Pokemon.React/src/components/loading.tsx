import { Container, Row, Col } from "react-bootstrap"

const Loading = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col lg="5"></Col>
                    <Col>
                        <div>Loading Data....</div>
                    </Col>
                    <Col lg="5"></Col>
                </Row>
            </Container>
        </>
    )
}

export default Loading;