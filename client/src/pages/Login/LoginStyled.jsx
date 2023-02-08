import styled from "styled-components";

export const MainContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

export const LoginContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 30vw;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135,0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
`;

export const EventsOrganizerText = styled.h1`
    margin: 3rem 0 2rem 0;
`;

export const StyledForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 20%;
    width: 100%;
`;

export const ErrorStyled = styled.div`
    color: red;
    font-weight: bold;
    letter-spacing: 5px;
    text-align: center;
`;