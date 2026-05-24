export const HOST = import.meta.env.VITE_API_URL || "https://explore-server-production.up.railway.app/api/v1";
export const UPLOADS_HOST = import.meta.env.VITE_UPLOADS_URL || "https://explore-server-production.up.railway.app/uploads";

// Webpage
export const DETAIL_WEBPAGE = `${HOST}/website/webpage`;
export const GET_WEBPAGES = `${HOST}/website/webpages`;

// Auth
export const LOGIN_USER = `${HOST}/user/login`;
export const REGISTER_USER = `${HOST}/user/register`;

// Tours
export const GET_TOURS = `${HOST}/website/tours`;

// Bookings
export const CREATE_BOOKING = `${HOST}/booking`;
export const GET_USER_BOOKINGS = (userId) => `${HOST}/booking/user/${userId}`;

// Contact
export const GET_CONTACT = `${HOST}/website/contact`;
export const SUBMIT_CONTACT = `${HOST}/website/contact/submit`;
