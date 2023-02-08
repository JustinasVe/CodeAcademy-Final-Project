import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";
import styled from "styled-components";

const AttendeesList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #ffffff;
`;

const AttendeesListItem = styled.li`
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
    /* cursor: pointer; */
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    padding: 10px 30px;
    position: relative;
`;

const AttendeeInfo = styled.span`
    color: #0000cd;
    font-size: 20px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const StyledFormAdd = styled.form`
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 20%;
    width: 100%;
    justify-content: space-around;
    justify-content: center;
`;

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${user.id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setAttendees(data);
                }
                setIsLoading(false);
            });
    }, [user.id]);

    if (isLoading) {
        return <div>Loading...</div>;
    };

    const handleAttendeeAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                phoneNumber,
                userId: user.id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if (!data.error){
                setAttendees(data);
                setName('');
                setSurname('');
                setEmail('');
                setPhoneNumber('');
            }
        });
    }

    return (
        <AttendeesList>
            <StyledFormAdd onSubmit={handleAttendeeAdd}>
                <Input 
                    placeholder="Name" 
                    required 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input 
                    placeholder="Surname" 
                    required
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />
                <Input 
                    placeholder="Email" 
                    required 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input 
                    placeholder="Mob: 86XXXXXXX" 
                    required 
                    type="number"
                    min="0"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
                <Button margin={"min"}>Add</Button>
            </StyledFormAdd>
            {attendees.map((attendee) => 
                <AttendeesListItem key={attendee.id}>
                    <AttendeeInfo>{attendee.name}</AttendeeInfo>&ensp;
                    <AttendeeInfo>{attendee.surname}</AttendeeInfo>&ensp;
                    <AttendeeInfo>{attendee.email}</AttendeeInfo>&ensp;
                    <AttendeeInfo>{attendee.phoneNumber}</AttendeeInfo>
                </AttendeesListItem>
            )}
        </AttendeesList>
    );
};