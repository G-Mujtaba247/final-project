import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Image as ImageIcon, Star } from 'lucide-react';
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HomeEditor() {
    const [slides, setSlides] = useState([
        { id: 1, title: 'Discover the Beauty of Pakistan', subtitle: 'From the peaks of Hunza to the beaches of Gwadar', buttonText: 'Explore Tours', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1476&auto=format&fit=crop' },
        { id: 2, title: 'Cultural Heritage', subtitle: 'Experience the rich history and traditions', buttonText: 'View Culture', image: 'https://images.unsplash.com/photo-1595843477839-4ad36395b325?q=80&w=1470&auto=format&fit=crop' },
    ]);
    const [features, setFeatures] = useState([
        { id: 1, title: 'Best Prices', description: 'We offer the most competitive prices in the market.', icon: '💰' },
        { id: 2, title: 'Expert Guides', description: 'Our local guides are knowledgeable and friendly.', icon: '🧭' },
        { id: 3, title: 'Safety First', description: 'We prioritize your safety above all else.', icon: '🛡️' },
    ]);
    const [testimonials, setTestimonials] = useState([
        { id: 1, name: 'Alice Walker', rating: 5, comment: 'The trip to Skardu was magical! Highly recommended.' },
        { id: 2, name: 'David Chen', rating: 5, comment: 'Great organization and support throughout the tour.' },
    ]);

    const [activeTab, setActiveTab] = useState('hero');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [dialogType, setDialogType] = useState(null); // 'slide', 'feature', 'testimonial'

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const id = currentItem ? currentItem.id : Date.now();

        if (dialogType === 'slide') {
            const newItem = {
                id,
                title: formData.get('title'),
                subtitle: formData.get('subtitle'),
                buttonText: formData.get('buttonText'),
                image: formData.get('image'),
            };
            setSlides(currentItem ? slides.map(i => i.id === id ? newItem : i) : [...slides, newItem]);
        } else if (dialogType === 'feature') {
            const newItem = {
                id,
                title: formData.get('title'),
                description: formData.get('description'),
                icon: formData.get('icon'),
            };
            setFeatures(currentItem ? features.map(i => i.id === id ? newItem : i) : [...features, newItem]);
        } else if (dialogType === 'testimonial') {
            const newItem = {
                id,
                name: formData.get('name'),
                rating: parseInt(formData.get('rating')),
                comment: formData.get('comment'),
            };
            setTestimonials(currentItem ? testimonials.map(i => i.id === id ? newItem : i) : [...testimonials, newItem]);
        }

        setIsDialogOpen(false);
        setCurrentItem(null);
        setDialogType(null);
    };

    const handleDelete = (id, type) => {
        if (confirm('Are you sure you want to delete this item?')) {
            if (type === 'slide') setSlides(slides.filter(i => i.id !== id));
            if (type === 'feature') setFeatures(features.filter(i => i.id !== id));
            if (type === 'testimonial') setTestimonials(testimonials.filter(i => i.id !== id));
        }
    };

    const openEdit = (item, type) => {
        setCurrentItem(item);
        setDialogType(type);
        setIsDialogOpen(true);
    };

    const openAdd = (type) => {
        setCurrentItem(null);
        setDialogType(type);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Home Page Content</h2>
                <p className="text-muted-foreground">Manage the content displayed on your landing page.</p>
            </div>

            <Tabs defaultValue="hero" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="hero">Hero Slider</TabsTrigger>
                    <TabsTrigger value="features">Why Choose Us</TabsTrigger>
                    <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                </TabsList>

                <TabsContent value="hero" className="space-y-4">
                    <div className="flex justify-end">
                        <Button onClick={() => openAdd('slide')}>
                            <Plus className="w-4 h-4 mr-2" /> Add Slide
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Slides</CardTitle>
                            <CardDescription>Manage the main banner slides.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Image</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead className="hidden md:table-cell">Subtitle</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {slides.map((slide) => (
                                        <TableRow key={slide.id}>
                                            <TableCell>
                                                <div className="w-16 h-10 rounded overflow-hidden bg-muted relative">
                                                    {slide.image ? (
                                                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                                                            <ImageIcon className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{slide.title}</TableCell>
                                            <TableCell className="hidden md:table-cell max-w-[200px] truncate">{slide.subtitle}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(slide, 'slide')}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(slide.id, 'slide')}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="features" className="space-y-4">
                    <div className="flex justify-end">
                        <Button onClick={() => openAdd('feature')}>
                            <Plus className="w-4 h-4 mr-2" /> Add Feature
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Features</CardTitle>
                            <CardDescription>Highlights showing why users should choose you.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">Icon</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {features.map((feature) => (
                                        <TableRow key={feature.id}>
                                            <TableCell className="text-2xl">{feature.icon}</TableCell>
                                            <TableCell className="font-medium">{feature.title}</TableCell>
                                            <TableCell>{feature.description}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(feature, 'feature')}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(feature.id, 'feature')}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="testimonials" className="space-y-4">
                    <div className="flex justify-end">
                        <Button onClick={() => openAdd('testimonial')}>
                            <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                        </Button>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Testimonials</CardTitle>
                            <CardDescription>What your customers are saying.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Comment</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {testimonials.map((t) => (
                                        <TableRow key={t.id}>
                                            <TableCell className="font-medium">{t.name}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    {t.rating} <Star className="w-3 h-3 ml-1 fill-primary text-primary" />
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-w-[300px] truncate">{t.comment}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(t, 'testimonial')}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(t.id, 'testimonial')}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {currentItem ? 'Edit ' : 'Add '}
                            {dialogType === 'slide' ? 'Slide' : dialogType === 'feature' ? 'Feature' : 'Testimonial'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4">
                        {dialogType === 'slide' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" defaultValue={currentItem?.title} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subtitle">Subtitle</Label>
                                    <Input id="subtitle" name="subtitle" defaultValue={currentItem?.subtitle} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="buttonText">Button Text</Label>
                                    <Input id="buttonText" name="buttonText" defaultValue={currentItem?.buttonText} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">Image URL</Label>
                                    <Input id="image" name="image" defaultValue={currentItem?.image} required />
                                </div>
                            </>
                        )}
                        {dialogType === 'feature' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon (Emoji)</Label>
                                    <Input id="icon" name="icon" defaultValue={currentItem?.icon} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" defaultValue={currentItem?.title} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea id="description" name="description" defaultValue={currentItem?.description} required />
                                </div>
                            </>
                        )}
                        {dialogType === 'testimonial' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" defaultValue={currentItem?.name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating (1-5)</Label>
                                    <Input id="rating" name="rating" type="number" min="1" max="5" defaultValue={currentItem?.rating || 5} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Textarea id="comment" name="comment" defaultValue={currentItem?.comment} required />
                                </div>
                            </>
                        )}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
