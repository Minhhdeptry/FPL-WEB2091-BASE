import axios from "axios"
export type Bookings = {
    id: string,
    customer: string,
    service: string,
    status: string
}
const API = "http://localhost:3000/bookings";

export const getAll = async (): Promise<Bookings[] | undefined> => {
    const {data} = await axios.get<Bookings[]>(API)
    return data;
}

export const remove = async (id: string): Promise<void> => {
    await axios.delete(`${API}/${id}`)
}

export const add = async (booking: Omit<Bookings, "id">): Promise<void> => {
    await axios.post(API, booking)
}

export const getById = async (id: string): Promise<Bookings | undefined> => {
    const {data} = await axios.get(`${API}/${id}`);
    return data;
}

export const edit = async (id: string, booking: Omit<Bookings, "id">) => {
    await axios.put(`${API}/${id}`, booking)
}