import { CarData } from "./models";

const cars_data: CarData[] = [
    {
        imei: "864893030710639",
        license_no: "UAW 805B",
        latest_data: {
            battery_level: 12.93, 
            mileage: 4565,
            motion_state: "stopped",
            head_direction: 0,
            latitude: 0.293366166667, 
            longitude: 32.5894771667,
            tracker_time: "20181026180214", 
            speed: 0.06,
        },
        car: {
            model: "", 
            health_color: "green",
            type: {id: 7, name: "motocycle"}, 
            id: 81,
            license_no: "UAW 805B",
        },
    },
    {
        imei: "864893030710639",
        license_no: "UAZ 805B",
        latest_data: {
            battery_level: 12.93, 
            mileage: 4565,
            motion_state: "stopped",
            head_direction: 0,
            latitude: 0.319895,
            longitude: 32.560327,
            tracker_time: "20181026180214", 
            speed: 0.06,
        },
        car: {
            model: "", 
            health_color: "green",
            type: {id: 7, name: "motocycle"}, 
            id: 81,
            license_no: "UAW 805B",
        },
    },
    {
        imei: "864893030710639",
        license_no: "UAY 805B",
        latest_data: {
            battery_level: 12.93, 
            mileage: 4565,
            motion_state: "stopped",
            head_direction: 0,
            latitude: 0.319042, 
            longitude: 32.536981,
            tracker_time: "20181026180214", 
            speed: 0.06,
        },
        car: {
            model: "", 
            health_color: "green",
            type: {id: 7, name: "motocycle"}, 
            id: 81,
            license_no: "UAW 805B",
        },
    },
];

export { cars_data };