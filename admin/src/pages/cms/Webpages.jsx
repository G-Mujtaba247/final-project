import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, Phone, ArrowRight, Plus, Pencil, Trash2, FileText, Globe, Map } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox';
import { LIST_WEBPAGES, CREATE_WEBPAGE, DELETE_WEBPAGE, UPDATE_WEBPAGE } from '@/resources/server-API';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function Webpages() {

    const [dynamicPages, setDynamicPages] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [status, setStatus] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const { register, handleSubmit, reset, resetField } = useForm();

    const pages = [
        {
            name: 'Home Page',
            description: 'Manage hero sliders, featured destinations, and welcome content.',
            path: '/dashboard/cms/home',
            icon: Home,
            color: 'text-blue-500'
        },
        {
            name: 'About Us',
            description: 'Update company history, mission, and team members.',
            path: '/dashboard/cms/about',
            icon: Info,
            color: 'text-green-500'
        },
        {
            name: 'Contact Us',
            description: 'Manage contact information, map location, and inquiry forms.',
            path: '/dashboard/cms/contact',
            icon: Phone,
            color: 'text-purple-500'
        },
        {
            name: 'Tours Page',
            description: 'Manage travel guidelines and general tour information.',
            path: '/dashboard/cms/tours',
            icon: Map,
            color: 'text-orange-500'
        }
    ];

    const getWebpages = useCallback(async () => {
        try {
            const response = await axios.get(LIST_WEBPAGES);
            if (response.data.status == true) {
                setDynamicPages(response.data.webpages)
            } else {
                console.log("Axios error")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }, [])
    useEffect(() => {
        getWebpages();
    }, [getWebpages]);

    const handleSaveWebpage = async (data) => {
        const myPage = {
            title: data.title,
            slug: data.slug,
            status: status, //use state
            content: editorContent,
        };

        try {
            if (data?._id) {
                const response = await axios.patch(`${UPDATE_WEBPAGE}/${data._id}`, myPage);
                response.data.status == true ? getWebpages() : console.log("Axios error")
            } else {
                const response = await axios.post(CREATE_WEBPAGE, myPage);
                response.data.status == true ? getWebpages() : console.log("Axios error")
            }

        } catch (error) {
            console.log("Error: ", error)
        }
        closeModal();
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this page?')) {
            try {
                const response = await axios.delete(`${DELETE_WEBPAGE}/${id}`);
                response.data.status == true ? getWebpages() : console.log("Axios error")
            } catch (error) {
                console.log("Error: ", error)
            }
        }
    };

    const handleStatusChange = (value) => {
        setStatus(value);
    };

    const openEdit = (page) => {
        reset(page);
        setIsDialogOpen(true);
        setEditorContent(page.content);
        setStatus(page.status);
    };

    const openAdd = () => {
        resetField();
        reset();
        setEditorContent("");
        setStatus(false);
        setIsDialogOpen(true);
    };

    const closeModal = () => {
        resetField();
        setEditorContent("");
        setStatus(false);
        setIsDialogOpen(false);
    }

    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Webpages Content</h2>
                    <p className="text-muted-foreground">Manage the content and design of your website pages.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {pages.map((page) => (
                        <Card key={page.path} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg bg-muted ${page.color}`}>
                                        <page.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{page.name}</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <CardDescription className="text-sm min-h-[40px]">
                                    {page.description}
                                </CardDescription>
                                <Button asChild className="w-full group" variant="outline">
                                    <Link to={page.path}>
                                        Edit Page
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Dynamic Webpages</h2>
                        <p className="text-muted-foreground">Create and manage custom pages (e.g., Privacy Policy).</p>
                    </div>
                    <Button onClick={openAdd}>
                        <Plus className="w-4 h-4 mr-2" /> Create New Page
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Page Title</TableHead>
                                    <TableHead>URL Slug</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dynamicPages.map((page) => (
                                    <TableRow key={page._id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4 text-muted-foreground" />
                                                {page.title}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Globe className="w-3 h-3" />
                                                /{page.slug}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${page.status === true
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {page.status ? 'Published' : 'Draft'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" onClick={() => openEdit(page)}>
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(page._id)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {dynamicPages.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                            No dynamic pages found. Create one to get started.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Webpage</DialogTitle>
                        <DialogDescription>
                            Provide details for the dynamic page to your website.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(handleSaveWebpage)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Page Title</Label>
                                <Input id="title" {...register('title')} placeholder="e.g. Our Services" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">URL Slug</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-sm">/</span>
                                    <Input id="slug" {...register('slug')} placeholder="our-services" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <div className="flex items-center gap-3">
                                    <Checkbox checked={status} onCheckedChange={handleStatusChange} id="terms" />
                                    <Label htmlFor="terms">Publish webpage now?</Label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Content</Label>
                            <div className="h-[300px] mb-12">
                                <ReactQuill
                                    theme="snow"
                                    value={editorContent}
                                    onChange={setEditorContent}
                                    className="h-full"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
                            <Button type="submit">Save Page</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
