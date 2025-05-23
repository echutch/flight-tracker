import axios from "axios";

export interface Flight {
  FlightID: number;
  DepName: string;
  DestName: string;
  FlightPrice: number;
  TimeOfYear: number;
  CompanyID: number;
}

export interface Airport {
  AirportID: number;
  AirportName: string;
}

export interface User {
  UserId: number;
  FirstName: string;
  LastName: string;
  AirportID: number;
}

export interface SavedFlight {
  FlightID: number;
  UserID: number;
  DepName: string;
  DestName: string;
  FlightPrice: number;
  TimeOfYear: number;
  Quantity: number;
  CompanyID: number;
  SavedFlightID: number;
}

export interface PopFlight {
  OriginAirportID: number;
  OriginAirportName: string;
  VisitorCount: number;
}

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3007";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchAirportByCode = (code: string): Promise<Airport> => {
  return httpClient
    .get(`/airports?search=${code}`)
    .then((response) => response.data);
};

export const searchFlightsByAirports = (
  fromAirportID: number,
  toAirportID: number
): Promise<Flight[]> => {
  return httpClient
    .get(`/flights?departure=${fromAirportID}&destination=${toAirportID}`)
    .then((response) => response.data);
};

export const getUserById = (userId: string): Promise<User> => {
  return httpClient
    .get(`/users/${userId}`)
    .then((response) => response.data);
};

export const getSavedFlights = (userId: string): Promise<SavedFlight[]> => {
  return httpClient
    .get(`/saved/${userId}`)
    .then((response) => response.data);
};

export const saveFlight = async (UserID: number, FlightID: number, Quantity: number): Promise<{ success: boolean; message: string }> => {
  const response = await httpClient.post(`/saved/post/`, { UserID, FlightID, Quantity });
  if (!response.data.success) {
    console.log(response.data.message);
  }

  return response.data;
 
 
  // return httpClient
  //   .post(`/saved/post/`, { UserID, FlightID, Quantity })
  //   .then((response) => response.data);
};


export const deleteFlight = (UserID: number, FlightID: number): Promise<void> => {
  return httpClient
    .delete(`/saved/delete/`, { data: { UserID, FlightID } })
    .then((response) => response.data);
};

export const updateFlight = (SavedFlightID: number, Quantity: number): Promise<void> => {
  return httpClient
    .put(`/saved/update/`, { SavedFlightID, Quantity })
    .then((response) => response.data);
};

export const popularity = (FlightID: number): Promise<PopFlight[]> => {
  return httpClient
    .get(`/flights/popularity/${FlightID}`)
    .then((response) => response.data);
};
