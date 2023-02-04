import { useEffect, useState } from "react";
import { LOGGED_IN_USER } from "../../constants/constants";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/attendees?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setAttendees(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    };

    const handleAttendeeAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/attendees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                surname,
                email,
                phoneNumber,
                userId: 2
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setAttendees(data);
            setName('');
            setSurname('');
            setEmail('');
            setPhoneNumber('');
        });
    }

    return (
        <div>
            <form onSubmit={handleAttendeeAdd}>
                <input 
                    placeholder="Name" 
                    required 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input 
                    placeholder="Surname" 
                    required
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                />
                <input 
                    placeholder="Email" 
                    required 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    placeholder="Phone number" 
                    required 
                    type="tel" 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
                <button>Add</button>
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