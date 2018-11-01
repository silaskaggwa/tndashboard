export interface Car {
    id: number,
    license_no: string,
    health_color: string,
    model: string,
    type: any
}
export interface LatestData {
    battery_level: number,
    latitude: number,
    longitude: number,
    mileage: number,
    speed: number,
    head_direction: number,
    motion_state: string,
    tracker_time: string
}
export interface CarData {
    car: Car,
    imei: string,
    license_no: string,
    latest_data: LatestData
}

export interface User {
    status: string,
    username: string,
    token: string,
    userId: string,
    firstname: string,
    lastname: string,
    email: string 
}

export interface AuthError {
    details: string,
}