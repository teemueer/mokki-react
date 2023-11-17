import { useState, useEffect } from "react";
import { useMatch, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

import deviceService from "../services/device";

const temperatureOptions = {
    scales: {
        y: {
            min: -10,
            max: 40,
            ticks: {
                callback: function(value, index, values) {
                    return `${value}°C`;
                }
            }
        }
    },
};

const humidityLightLevelOptions = {
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            ticks: {
                callback: function(value, index, values) {
                    return `${value}%`;
                }
            }
        }
    },
};

const Device = () => {
    const [loading, setLoading] = useState(true);
    const [device, setDevice] = useState(null);
    const [humidityData, setHumidityData] = useState({});
    const [temperatureData, setTemperatureData] = useState({});
    const [lightLevelData, setLightLevelData] = useState({});

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(device ? device.name : "");

    const match = useMatch("/devices/:id");
    const deviceId = match.params.id;

    useEffect(() => {
        const getDevice = async () => {
            const device = await deviceService.getById(deviceId);
            setDevice(device);
        };

        const getData = async () => {
            setLoading(true);

            const data = await deviceService.getData(deviceId);

            const humidityPoints = data.filter(
                (item) => item.field === "humidity"
            );
            const humidityLabels = humidityPoints.map((item) =>
                new Date(item.timestamp).toLocaleTimeString([], {timeStyle: 'short'})
            );

            const temperaturePoints = data.filter(
                (item) => item.field === "temperature"
            );
            const temperatureLabels = temperaturePoints.map((item) =>
                new Date(item.timestamp).toLocaleTimeString([], {timeStyle: 'short'})
            );

            const lightLevelPoints = data.filter(
                (item) => item.field === "light_level"
            );
            const lightLevelLabels = lightLevelPoints.map((item) =>
                new Date(item.timestamp).toLocaleTimeString([], {timeStyle: 'short'})
            );

            setTemperatureData({
                labels: temperatureLabels,
                datasets: [
                    {
                        label: "Temperature",
                        data: temperaturePoints.map((item) => item.value),
                        borderColor: "red",
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                        borderWidth: 1,
                        pointBorderWidth: 0,
                        pointStyle: "line",
                    },
                ],
                axisY: {
                    suffix: " °C"
                },
            });

            setHumidityData({
                labels: humidityLabels,
                datasets: [
                    {
                        label: "Humidity",
                        data: humidityPoints.map((item) => item.value),
                        borderColor: "blue",
                        backgroundColor: "rgba(0, 0, 255, 0.1)",
                        borderWidth: 1,
                        pointBorderWidth: 0,
                        pointStyle: "line",
                    },
                ],
            });

            setLightLevelData({
                labels: lightLevelLabels,
                datasets: [
                    {
                        label: "Light level",
                        data: lightLevelPoints.map((item) => item.value),
                        borderColor: "green",
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                        borderWidth: 1,
                        pointBorderWidth: 0,
                        pointStyle: "line",
                    },
                ],
            });

            setLoading(false);
        };

        getDevice();
        getData();

        const intervalId = setInterval(getData, 10000);
        return () => clearInterval(intervalId);
    }, [deviceId]);

    if (!device) return;

    const handleUpdate = async () => {
        if (editName.length > 0) {
            const device = await deviceService.patchName(deviceId, editName);
            setDevice(device);
            setIsEditing(false);
        }
    };

    return (
        <div className="container">
            {isEditing ? (
                <input
                    type="text"
                    value={editName}
                    placeholder={device.name}
                    onChange={(e) => setEditName(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleUpdate();
                        }
                    }}
                />
            ) : (
                <h1 onClick={() => setIsEditing(true)}>{device.name}</h1>
            )}

            <div className="charts">
                <div className="chart">
                    {temperatureData.datasets?.length > 0 && (
                        <Line data={temperatureData} options={temperatureOptions} />
                    )}
                </div>
                <div className="chart">
                    {humidityData.datasets?.length > 0 && (
                        <Line data={humidityData} options={humidityLightLevelOptions} />
                    )}
                </div>
                <div className="chart">
                    {lightLevelData.datasets?.length > 0 && (
                        <Line data={lightLevelData} options={humidityLightLevelOptions} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Device;
