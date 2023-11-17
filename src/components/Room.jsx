import { useState, useEffect } from "react";
import { useMatch, Link } from "react-router-dom";

import roomService from "../services/rooms";

const Device = ({ device }) => (
    <tr key={device.id}>
        <td>
            <Link to={`/devices/${device.id}`}>{device.name}</Link>
        </td>
    </tr>
);

const Room = () => {
    const [room, setRoom] = useState(null);
    const [devices, setDevices] = useState([]);

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(room ? room.name : "");

    const match = useMatch("/rooms/:id");
    const roomId = match.params.id;

    useEffect(() => {
        const getRoom = async () => {
            const room = await roomService.getById(roomId);
            const devices = await roomService.getDevices(roomId);
            setRoom(room);
            setDevices(devices);
        };

        getRoom();
    }, []);

    if (!room) return;

    const handleUpdate = async () => {
        if (editName.length > 0) {
            const room = await roomService.patchName(roomId, editName);
            setRoom(room);
            setIsEditing(false);
        }
    };

    return (
        <div className="container">
            {isEditing ? (
                <input
                    type="text"
                    value={editName}
                    placeholder={room.name}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleUpdate();
                        }
                    }}
                />
            ) : (
                <h1 onClick={() => setIsEditing(true)}>{room.name}</h1>
            )}

            <table>
                <tbody>
                    {devices.map((device) => (
                        <Device key={device.id} device={device} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Room;
