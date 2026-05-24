import { useEffect, useState } from "react";
import axios from "axios";
import { HOST, UPLOADS_HOST } from "@/resources/server-API";
import {
    MoreHorizontal,
    Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function ToursPage() {
    const [tours, setTours] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: null
    });
    const [loading, setLoading] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const getTourImageUrl = (image) => {
        if (!image) return "https://placehold.co/600x400";
        if (/^https?:\/\//.test(image)) return image;
        if (image.startsWith("/uploads/")) return `${UPLOADS_HOST}${image.replace("/uploads", "")}`;
        if (image.startsWith("uploads/")) return `${UPLOADS_HOST}/${image.replace("uploads/", "")}`;
        return `${UPLOADS_HOST}/${image.replace(/^\/+/, "")}`;
    };

    const fetchTours = async () => {
        try {
            const token = localStorage.getItem("token");
            // Note: getAllTours in backend requires authMiddleware but returns public data usually. 
            // We send token just in case.
            const res = await axios.get(`${HOST}/tours`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status) {
                setTours(res.data.tours);
            }
        } catch (error) {
            console.error("Failed to fetch tours");
        }
    };

    useEffect(() => {
        fetchTours();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this tour?")) return;
        try {
            const token = localStorage.getItem("token");
            const res = await axios.delete(`${HOST}/tours/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.status) {
                fetchTours();
            } else {
                alert("Failed to delete");
            }
        } catch (error) {
            alert("Error deleting tour");
        }
    };

    const handleEdit = (tour) => {
        setFormData({
            title: tour.title,
            description: tour.description,
            price: tour.price,
            image: null // Keep null, if they want to update they upload new one
        });
        setEditingId(tour._id);
        setIsAddOpen(true);
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("price", formData.price);
            if (formData.image) {
                data.append("image", formData.image);
            }

            let res;
            if (editingId) {
                // Update
                res = await axios.patch(`${HOST}/tours/update/${editingId}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
            } else {
                // Create
                res = await axios.post(`${HOST}/tours/create`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                });
            }

            if (res.data.status) {
                setIsAddOpen(false);
                setFormData({ title: "", description: "", price: "", image: null });
                setEditingId(null);
                fetchTours();
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Results: Failed to save tour");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold md:text-2xl">Tours & Packages</h1>
                </div>

                <Dialog open={isAddOpen} onOpenChange={(open) => {
                    setIsAddOpen(open);
                    if (!open) {
                        setFormData({ title: "", description: "", price: "", image: null });
                        setEditingId(null);
                    }
                }}>
                    <DialogTrigger asChild>
                        <Button className="ml-auto" size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Tour
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Tour" : "Add New Tour"}</DialogTitle>
                            <DialogDescription>
                                {editingId ? "Update tour details." : "Create a new tour package."} Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="col-span-3"
                                        placeholder="e.g. PKR 20,000"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Desc
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image" className="text-right">
                                        Image
                                    </Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="col-span-3"
                                        accept="image/*"
                                        required={!editingId}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Saving..." : "Save changes"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Tours</CardTitle>
                    <CardDescription>
                        Manage your travel packages and modify their details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    Image
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden md:table-cell">Price</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tours.map((tour) => (
                                <TableRow key={tour._id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <img
                                            alt={tour.title}
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={getTourImageUrl(tour.image)}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {tour.title}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {tour.price}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEdit(tour)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(tour._id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        Showing <strong>{tours.length}</strong> tours
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
