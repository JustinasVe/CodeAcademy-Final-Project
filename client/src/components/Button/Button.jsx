import styled from 'styled-components';

const ButtonStyled = styled.button`
    background-color: #90ee90;
    border: 1px solid lightgray;
    border-radius: 2rem;
    font-size: 16px;
    padding: 10px 20px;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    border: none;
    margin-top: ${(props) => 
    props.margin === "min" 
    ? "0.28rem"
    : "2rem"};
    cursor: pointer;
    
    &:disabled {
        opacity: 0.5;
    }
`;

export const Button = (props) => {
    return <ButtonStyled {...props}/>
}