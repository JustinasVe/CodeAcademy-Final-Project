import { useEffect, useState } from "react";

export const Attendees = () => {
    const [attendees, setAttendees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/attendees?userId=2')
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