import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GET_ABOUT, CREATE_ABOUT, UPDATE_ABOUT } from '@/resources/server-API';
import { toast } from 'sonner';

export default function About() {

    const { register, handleSubmit, reset } = useForm();

    const [preview, setPreview] = useState('');

    const [features, setFeatures] = useState([]);

    useEffect(() => {
        const getAbout = async () => {
            try {
                const response = await axios.get(GET_ABOUT);
                if (response.data.status === true && response.data.about.length > 0) {
                    reset(response.data.about[0]);
                    if (response.data.about[0]?.features) {
                        setFeatures(response.data.about[0].features);
                    }
                    if (response.data.about[0]?.file) {
                        setPreview(response.data.about[0].file);
                    }
                }
            } catch (error) {
                console.log("Error fetching about data: ", error);
                toast.error("Failed to fetch About Us data");
            }
        }
        getAbout();
    }, [reset]);

    const handlePreviewFile = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const addFeature = (e) => {
        e.preventDefault();
        setFeatures([...features, { id: Date.now(), text: '' }]);
    };

    const removeFeature = (id) => {
        setFeatures(features.filter(f => f.id !== id));
    };

    const updateFeature = (id, text) => {
        setFeatures(features.map(f => f.id === id ? { ...f, text } : f));
    };

    const handleSaveAbout = async (data) => {
        try {
            const aboutData = {
                mission: data.mission,
                vision: data.vision,
                file: preview,
                features: features
            }

            if (!aboutData.mission || !aboutData.vision) {
                toast.error("Mission and vision are required");
                return;
            }

            if (!aboutData.file) {
                toast.error("Please select an image");
                return;
            }

            if (data._id) {
                const response = await axios.patch(`${UPDATE_ABOUT}/${data._id}`, aboutData);
                if (response.data.status === true) {
                    toast.success("About Us updated successfully!");
                } else {
                    toast.error(response.data.message || "Failed to update About Us");
                }
            } else {
                const response = await axios.post(CREATE_ABOUT, aboutData);
                if (response.data.status === true) {
                    reset(response.data.newAbout);
                    toast.success("About Us created successfully!");
                } else {
                    toast.error(response.data.message || "Failed to create About Us");
                }
            }

        } catch (error) {
            console.log("Error saving about data: ", error);
            toast.error("An error occurred while saving");
        }
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">About Page</h2>
                <p className="text-muted-foreground">Manage the content of your About Us page.</p>
            </div>

            <div className="grid gap-6">
                <form onSubmit={handleSubmit(handleSaveAbout)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Overview</CardTitle>
                            <CardDescription>Define your company's mission and vision.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="mission">Our Mission</Label>
                                <Textarea
                                    id="mission"
                                    className="min-h-[100px]"
                                    placeholder="Describe your mission..."
                                    {...register("mission")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vision">Our Vision</Label>
                                <Textarea
                                    id="vision"
                                    className="min-h-[100px]"
                                    placeholder="Describe your vision..."
                                    {...register("vision")}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="grid w-full max-w-sm items-center gap-3">
                                    <Label htmlFor="picture">Featured Image</Label>
                                    <Input id="picture" onChange={handlePreviewFile} type="file" accept="image/*" />
                                </div>
                                {preview && <img src={preview} className="rounded w-32 h-32 object-cover border" alt="Preview" />}
                            </div>
                        </CardContent>
                    </Card>
                    <div className='my-5'></div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Why Choose Us?</CardTitle>
                            <CardDescription>List the key benefits and features of your tourism services.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {features.map((feature) => (
                                <div key={feature.id} className="flex gap-2">
                                    <Input
                                        value={feature.text}
                                        onChange={(e) => updateFeature(feature.id, e.target.value)}
                                        placeholder="Feature text (e.g., Expert Tour Guides)"
                                    />
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFeature(feature.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="outline" onClick={addFeature} className="w-full">
                                <Plus className="w-4 h-4 mr-2" /> Add Feature
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="my-5 flex justify-end">
                        <Button size="lg" type="submit">Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
