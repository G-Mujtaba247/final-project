import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarDays, Mail, MapPin, Phone, Trash2, User, Users } from 'lucide-react';
import axios from 'axios';
import { ALL_BOOKINGS, DELETE_BOOKING, UPDATE_BOOKING } from '@/resources/server-API';
import moment from 'moment';
import { toast } from 'sonner';

export default function Booking() {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedBookings, setSelectedBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(ALL_BOOKINGS, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status === true || response.data.success === true) {
                setBookings(response.data.bookings || response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error('Failed to fetch bookings');
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Handle select all checkboxes
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedBookings(bookings.map(booking => booking._id));
        } else {
            setSelectedBookings([]);
        }
    };

    // Handle individual checkbox
    const handleSelectBooking = (bookingId, checked) => {
        if (checked) {
            setSelectedBookings(prev => [...prev, bookingId]);
        } else {
            setSelectedBookings(prev => prev.filter(id => id !== bookingId));
        }
    };

    const handleBookingStatusChange = async (bookingId, status) => {
        // Optimistically update the UI so it reflects the change in real-time
        setBookings(prevBookings => 
            prevBookings.map(booking => 
                booking._id === bookingId ? { ...booking, status: status } : booking
            )
        );

        try {
            const token = localStorage.getItem("token");
            const response = await axios.patch(UPDATE_BOOKING, { bookingId, status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status == true) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
                // Revert on backend error
                await fetchBookings();
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Something went wrong");
            // Revert on network error
            await fetchBookings();
        }
    }

    const handleDeleteBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`${DELETE_BOOKING}/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.status == true) {
                toast.success(response.data.message);
                await fetchBookings();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Something went wrong");
        }
    }

    const handleBulkDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${selectedBookings.length} booking(s)?`)) return;

        try {
            const token = localStorage.getItem("token");
            const deletePromises = selectedBookings.map(bookingId =>
                axios.delete(`${DELETE_BOOKING}/${bookingId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            );

            await Promise.all(deletePromises);

            toast.success(`Successfully deleted ${selectedBookings.length} booking(s)`);
            setSelectedBookings([]);
            await fetchBookings();
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Failed to delete some bookings");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Tour Bookings</h2>
                <p className="text-muted-foreground">Manage customer tour bookings and reservations.</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Booking List</CardTitle>
                                <CardDescription>View and manage all tour bookings.</CardDescription>
                            </div>
                            {selectedBookings.length > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handleBulkDelete}
                                    className="gap-2 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 hover:border-red-400"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete ({selectedBookings.length})
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40px]">
                                        <Checkbox
                                            checked={bookings.length > 0 && selectedBookings.length === bookings.length}
                                            onCheckedChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead className="w-[30px]">ID</TableHead>
                                    <TableHead className="w-[30px]">&nbsp;</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Customer Details</TableHead>
                                    <TableHead>Tour Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    bookings.length > 0 ?
                                        bookings.map((booking, index) => (
                                            <TableRow key={booking._id}>
                                                <TableCell className="font-medium">
                                                    <Checkbox
                                                        checked={selectedBookings.includes(booking._id)}
                                                        onCheckedChange={(checked) => handleSelectBooking(booking._id, checked)}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell className="font-medium">
                                                    <Trash2 onClick={() => handleDeleteBooking(booking._id)} className="cursor-pointer w-5 h-5 hover:text-red-500" />
                                                </TableCell>
                                                <TableCell className='w-[150px]'>
                                                    <Select onValueChange={(e) => handleBookingStatusChange(booking._id, e)} value={booking.status}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectItem value="pending">Pending</SelectItem>
                                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                                <SelectItem value="processing">Processing</SelectItem>
                                                                <SelectItem value="completed">Completed</SelectItem>
                                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="w-[350px]">
                                                    <div className='bg-gray-100 p-2 rounded'>
                                                        <p className='font-bold text-lg'> <User className='inline -mt-1' /> {booking.firstName + " " + booking.lastName}</p>
                                                        <div className='mt-3'>
                                                            <p className='text-gray-600'> <Mail size={16} className='inline -mt-1 ml-1 mr-3' />{booking.email}</p>
                                                            {booking.phone && (
                                                                <p className='text-gray-600'> <Phone size={16} className='inline -mt-1 ml-1 mr-3' />{booking.phone}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className='bg-gray-100 p-2 rounded'>
                                                        <div className='flex items-center justify-between gap-2'>
                                                            <p className='font-bold text-lg capitalize'> <MapPin className='inline -mt-1' /> {booking.tourName}</p>
                                                            <p className='bg-white p-1 text-xs font-bold rounded text-purple-600'>
                                                                <CalendarDays className='h-4 w-4 inline -mt-1 ml-1 mr-1' /> {booking.createdAt && moment(booking.createdAt).format('ll')}
                                                            </p>
                                                        </div>
                                                        <div className='mt-3'>
                                                            {booking.numberOfPeople && (
                                                                <p className='text-gray-600'> <Users size={16} className='inline -mt-1 ml-1 mr-3' />People: {booking.numberOfPeople}</p>
                                                            )}
                                                            {booking.bookingDate && (
                                                                <p className='text-gray-600'> <CalendarDays size={16} className='inline -mt-1 ml-1 mr-3' />Tour Date: {moment(booking.bookingDate).format('ll')}</p>
                                                            )}
                                                            {booking.price && (
                                                                <p className='text-gray-600 font-semibold'>Price: PKR {booking.price.toLocaleString()}</p>
                                                            )}
                                                            {booking.message && (
                                                                <p className='text-gray-600 flex items-start gap-2 mt-2'>
                                                                    <span className='block text-sm'>
                                                                        "{booking.message}"
                                                                    </span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No bookings found.
                                            </TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
