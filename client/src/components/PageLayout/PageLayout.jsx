import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import styled from "styled-components";
import { Globe, List } from "phosphor-react"
import LOCAL_STORAGE_JWT_TOKEN_KEY from "../../constants";

const Header = styled.div`
    background-color: #8fbc8f;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between ;
    padding: 10px 40px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
`;

const ButtonLogout = styled.button`
    background-color: #0000cd;
    border: none;
    border-radius: 2rem;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 20px;
`

export const PageLayout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" />
    }

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
        setUser(null);
        navigate('/login');
    }

    return (
        <div>
            <Header>
                <List size={32}/>
                <Globe size={32}/>
                <ButtonLogout onClick={handleLogout}>Log out</ButtonLogout>
            </Header>
            <Outlet />
        </div>
    )
};