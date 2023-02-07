import { useContext, useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";

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
        <div>
            <form onSubmit={handleAttendeeAdd}>
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
                <Button>Add</Button>
            </form>
            {attendees.map((attendee) => 
                <div key={attendee.id}>
                    <span>{attendee.name}</span>&ensp;
                    <span>{attendee.surname}</span>&ensp;
                    <span>{attendee.email}</span>&ensp;
                    <span>{attendee.phoneNumber}</span>
                </div>
            )}
        </div>
    );
};