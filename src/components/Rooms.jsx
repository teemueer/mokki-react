import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import roomService from "../services/rooms";

const Room = ({ room }) => (
    <tr key={room.id}>
        <td>
            <Link to={`/rooms/${room.id}`}>{room.name}</Link>
        </td>
    </tr>
);

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const getRooms = async () => {
            const rooms = await roomService.get();
            setRooms(rooms);
        };

        getRooms();
    }, []);

    if (!rooms) return;

    return (
        <div className="container">
            <h1>Rooms</h1>
            <table className="rooms">
                <tbody>
                    {rooms.map((room) => (
                        <Room key={room.id} room={room} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Rooms;
