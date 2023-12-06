import { Timestamp } from 'firebase/firestore';

export interface OrderData {
    id: string;
    id_user: string;
    id_match: string;
    provider: number;
    amount: number;
    status: string;
    created_at: Timestamp; // Adjust the type accordingly
}

export interface Order {
    id: string;
    provider: string;
    user: { userId: string; name: string };
    match: { matchId: string; name: string };
    amount: number;
    status: string;
    time: any; // Adjust the type accordingly
}

export interface MatchData {
    id: string;
    address: string;
    id_host: string;
    players: string[];
    price: number;
    type: number;
    city: string;
    status: string;
    id_country: string;
    duration: number;
    images: string[];
    title: string;
    updated_at: Timestamp;
    created_at:Timestamp;
    inserted_at: Timestamp; // Adjust the type accordingly
}

export interface Match {
    id: string;
    address: string;
    host: { id: string; name: string ,profile: string};
    players: { id: string; name: string, profile: string}[];
    type: number;
    city: string;
    id_country: string;
    duration: number;
    images: string[];
    title: string;
    updated_at: Timestamp;
    status: string;
    places: number;
    price: number;
    created_at:Timestamp;
    totalpaye: number;
    time: any; // Adjust the type accordingly
}

export interface PlayerData {
    id: string;
    // Define the rest of your player data fields here
    name: string;
    profile: string;
    email: string;
    created_at: Timestamp;
    role: string;
}
export interface Player {
    id: string;
    // Define the rest of your player fields here
    profile: string
    name: string;
    email: string;
    time: any;
    role: string;
    soldeRestant: number;
    revenueTotal: number;
}
export interface Paginations{
    page:number;
    pageSize:number;
}


export interface MatchStateType {
    matches:Match[];
    // Define the rest of your player fields here
    pagination:Paginations;
    filters:any;
    totalItems:number;
    loading:boolean;
    error:string | null;
    search:string | null;
    hosts:PlayerData[];
}
export interface OrderStateType {
    orders:Order[];
    // Define the rest of your player fields here
    pagination:Paginations;
    filters:any;
    totalItems:number;
    loading:boolean;
    error:string | null;
    // search:string | null;
}
export interface PlayerStateType {
    players:Player[];
    // Define the rest of your player fields here
    pagination:Paginations;
    filters:any;
    totalItems:number;
    loading:boolean;
    error:string | null;
    // search:string | null;
}
export interface UserStateType {
    users:any[];
    // Define the rest of your player fields here
    pagination:Paginations;
    filters:any;
    totalItems:number;
    loading:boolean;
    error:string | null;
    // search:string | null;
}