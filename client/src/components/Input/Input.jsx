import styled from 'styled-components';

const InputStyled = styled.input`
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgb(31, 38, 135, 0.37);
    border-radius: 2rem;
    width: 80%;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: #3c354e;
    font-size: 1rem;
    font-weight: bold;
    margin: 0.28rem;

    &:focus {
        display: inline-block;
        box-shadow: 0 0 0 0.2rem #778899;
        backdrop-filter: blur(12rem);
        border-radius: 2rem;
    }

    &:disabled {
        opacity: 0.5;
    }
`;

export const Input = (props) => {
    return <InputStyled {...props} />
}