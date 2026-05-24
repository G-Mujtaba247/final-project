import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GET_SETTINGS, CREATE_SETTINGS, UPDATE_SETTINGS } from '@/resources/server-API';
import { toast } from 'sonner';

export default function Settings() {
    const { register, handleSubmit, reset } = useForm();
    const [socials, setSocials] = useState([]);
    const [appLogoPreview, setAppLogoPreview] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(GET_SETTINGS);
                if (response.data.status === true && response.data.settings.length > 0) {
                    const settingsData = response.data.settings[0];
                    reset(settingsData);
                    if (settingsData.sociallinks) {
                        setSocials(settingsData.sociallinks);
                    }
                    if (settingsData.applogo) {
                        setAppLogoPreview(settingsData.applogo);
                    }
                }
            } catch (error) {
                console.log("Error fetching settings:", error);
                toast.error("Failed to fetch settings");
            }
        }
        fetchSettings();
    }, [reset]);

    const handleLogoPreview = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setAppLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const addSocial = () => {
        setSocials([...socials, { id: Date.now(), platform: '', url: '' }]);
    };

    const removeSocial = (id) => {
        setSocials(socials.filter(s => s.id !== id));
    };

    const updateSocial = (id, field, value) => {
        setSocials(socials.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSaveSettings = async (data) => {
        try {
            const settingsData = {
                appname: data.appname,
                applogo: appLogoPreview,
                copyrighttext: data.copyrighttext,
                sociallinks: socials
            };

            if (!settingsData.appname || !settingsData.copyrighttext) {
                toast.error("App name and copyright text are required");
                return;
            }

            if (data._id) {
                const response = await axios.patch(`${UPDATE_SETTINGS}/${data._id}`, settingsData);
                if (response.data.status === true) {
                    toast.success("Settings updated successfully!");
                } else {
                    toast.error(response.data.message || "Failed to update settings");
                }
            } else {
                const response = await axios.post(CREATE_SETTINGS, settingsData);
                if (response.data.status === true) {
                    reset(response.data.newSettings);
                    toast.success("Settings created successfully!");
                } else {
                    toast.error(response.data.message || "Failed to create settings");
                }
            }
        } catch (error) {
            console.log("Error saving settings:", error);
            toast.error("An error occurred while saving settings");
        }
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>
            <Separator />

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            Update your personal information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="Admin User" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" defaultValue="admin@explorepakistan.com" />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            Configure how you receive notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                                <Label className="text-base">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails about new booking requests.
                                </p>
                            </div>
                            <input type="checkbox" className="h-4 w-4 accent-primary" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit(handleSaveSettings)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Website Settings</CardTitle>
                            <CardDescription>
                                Manage global website settings like footer content.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="appname">App Name</Label>
                                <Input
                                    id="appname"
                                    placeholder="Explore Pakistan"
                                    {...register("appname")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="applogo">App Logo</Label>
                                <Input
                                    type="file"
                                    id="applogo"
                                    onChange={handleLogoPreview}
                                    accept="image/*"
                                />
                                {appLogoPreview && (
                                    <img
                                        src={appLogoPreview}
                                        className="rounded w-24 h-24 object-cover border mt-2"
                                        alt="App Logo Preview"
                                    />
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="copyrighttext">Copyright Text</Label>
                                <Input
                                    id="copyrighttext"
                                    placeholder="© 2025 Explore Pakistan. All rights reserved."
                                    {...register("copyrighttext")}
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Social Media Links</Label>
                                    <Button variant="outline" size="sm" type="button" onClick={addSocial}>Add Link</Button>
                                </div>
                                <div className="space-y-3">
                                    {socials.map((social) => (
                                        <div key={social.id} className="flex gap-2">
                                            <Input
                                                placeholder="Platform (e.g. Facebook)"
                                                value={social.platform}
                                                onChange={(e) => updateSocial(social.id, 'platform', e.target.value)}
                                                className="w-1/3"
                                            />
                                            <Input
                                                placeholder="URL"
                                                value={social.url}
                                                onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button variant="ghost" size="icon" type="button" className="text-destructive" onClick={() => removeSocial(social.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Button type="submit">Save Website Settings</Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}
