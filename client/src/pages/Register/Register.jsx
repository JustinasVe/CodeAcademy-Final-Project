import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import styled from "styled-components";

const MainContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`

const RegisterContainer = styled.div`
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

const RegisterText = styled.h1`
    margin: 3rem 0 2rem 0;
`;

const StyledForm = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 20%;
    width: 100%;
    /* justify-content: space-around; */
`;

const ErrorStyled = styled.div`
    color: red;
    font-weight: bold;
    letter-spacing: 5px;
    text-align: center;
`;

export const Register = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            })
        })
        .then((res) => {
            if (res.status === 400) {
                throw new Error('User already exists');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            navigate('/login');
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    };

    return (
        <MainContainer>
            <RegisterContainer>
                <RegisterText>Register</RegisterText>
                    <StyledForm onSubmit={handleRegister} disabled={isLoading} >
                        <Input 
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            value={name}
                        />
                        <Input 
                            placeholder="Surname"
                            onChange={(e) => setSurname(e.target.value)}
                            required
                            value={surname}
                        />
                        <Input 
                            placeholder="Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            value={email}
                        />
                        <Input 
                            placeholder="Password"
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            value={password}
                        />
                        {error && <ErrorStyled>{error}</ErrorStyled>}
                        <Button>Register</Button>
                        <Link to="/login">Login</Link>
                    </StyledForm>
            </RegisterContainer>
        </MainContainer>
    )
}