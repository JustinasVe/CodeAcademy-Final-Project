import { useEffect, useState } from "react";
import { LOGGED_IN_USER } from "../../constants/constants";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <div>
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