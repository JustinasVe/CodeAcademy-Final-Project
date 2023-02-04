import { useEffect, useState } from "react";
import { API_URL, LOGGED_IN_USER } from "../../constants/constants";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/attendees?userId=${LOGGED_IN_USER.id}`)
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
                    {attendee.name} {attendee.surname}
                </div>
            )}
        </div>
    );
};