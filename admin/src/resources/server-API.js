export const HOST = import.meta.env.VITE_API_URL || "https://explore-server-production.up.railway.app/api/v1";
export const UPLOADS_HOST = import.meta.env.VITE_UPLOADS_URL || "https://explore-server-production.up.railway.app/uploads";

// Webpage APIs
export const LIST_WEBPAGES = `${HOST}/webpages`;
export const CREATE_WEBPAGE = `${HOST}/webpages/create`;
export const UPDATE_WEBPAGE = `${HOST}/webpages/update`;
export const DELETE_WEBPAGE = `${HOST}/webpages/delete`;
export const DETAIL_WEBPAGE = `${HOST}/webpages`;

// Contact APIs
export const GET_CONTACT = `${HOST}/contact`;
export const CREATE_CONTACT = `${HOST}/contact/create`;
export const UPDATE_CONTACT = `${HOST}/contact/update`;

// About APIs
export const GET_ABOUT = `${HOST}/about-details`;
export const CREATE_ABOUT = `${HOST}/about/create`;
export const UPDATE_ABOUT = `${HOST}/about/update`;

// Settings APIs
export const GET_SETTINGS = `${HOST}/settings`;
export const CREATE_SETTINGS = `${HOST}/settings/create`;
export const UPDATE_SETTINGS = `${HOST}/settings/update`;

// Booking APIs
export const ALL_BOOKINGS = `${HOST}/bookings`;
export const UPDATE_BOOKING = `${HOST}/booking/update`;
export const DELETE_BOOKING = `${HOST}/booking/delete`;

