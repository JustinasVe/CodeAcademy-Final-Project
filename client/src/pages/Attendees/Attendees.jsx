import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContextWrapper";
import { Trash } from "phosphor-react"
import LOCAL_STORAGE_JWT_TOKEN_KEY from "../../constants";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { AttendeesListWrapper, AttendeesListTittle } from "./AttendeesStyled";
import { AttendeesList, HoverOverlay, AttendeesListItem } from "./AttendeesStyled";
import { AttendeeInfo, StyledFormAdd } from "./AttendeesStyled";

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

    const handleDeleteAttendee = (id) => {
        if (window.confirm('Do you really want to delete this attendee?')) {
            fetch(`${process.env.REACT_APP_API_URL}/attendees/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY)
                }
            })
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
            });
        }
    }

    return (
        <AttendeesListWrapper>
            <AttendeesListTittle>Attendees list of upcoming event:</AttendeesListTittle>
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
                        <AttendeesListItem key={attendee.id} onClick={() => handleDeleteAttendee(attendee.id)}>
                            <HoverOverlay><Trash/></HoverOverlay>
                            <AttendeeInfo>{attendee.name}</AttendeeInfo>&ensp;
                            <AttendeeInfo>{attendee.surname}</AttendeeInfo>&ensp;
                            <AttendeeInfo>{attendee.email}</AttendeeInfo>&ensp;
                            <AttendeeInfo>{attendee.phoneNumber}</AttendeeInfo>
                        </AttendeesListItem>
                    )}
                </AttendeesList>
        </AttendeesListWrapper>
    );
};