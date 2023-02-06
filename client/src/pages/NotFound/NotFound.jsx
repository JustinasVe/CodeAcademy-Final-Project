import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundStyled = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    font-size: 25px;
    height: 100vh;
    justify-content: center;
`;

const ImgStyled = styled.img`
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
`

export const NotFound = () => {
    return (
        <NotFoundStyled>
            <h1>404. Page not found</h1>
            <Link to="/">Go to Home page</Link>
            <ImgStyled src="https://static.vecteezy.com/system/resources/previews/004/349/996/non_2x/television-screen-error-tv-test-pattern-and-tv-no-signal-concept-smpte-color-bars-illustration-free-vector.jpg" alt="PageNotFound" />
        </NotFoundStyled>

    )
}
