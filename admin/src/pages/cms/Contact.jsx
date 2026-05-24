import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { GET_CONTACT, CREATE_CONTACT, UPDATE_CONTACT } from '@/resources/server-API';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

export default function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const fetchContactDetails = async () => {
            try {
                const response = await axios.get(GET_CONTACT);
                if (response.data.status === true && response.data.contact.length > 0) {
                    reset(response.data.contact[0]);
                    if (response.data.contact[0].faqs) {
                        setFaqs(response.data.contact[0].faqs);
                    }
                }
            } catch (error) {
                console.log("Error fetching contact details:", error);
                toast.error("Failed to fetch contact details");
            }
        }
        fetchContactDetails();
    }, [reset]);

    const handleSaveContactDetails = async (data) => {
        try {
            const contactData = {
                phone: data.phone,
                address: data.address,
                email: data.email,
                map: data.map,
                faqs: faqs
            };

            if (data._id) {
                // Update existing contact
                const response = await axios.patch(`${UPDATE_CONTACT}/${data._id}`, contactData);
                if (response.data.status === true) {
                    reset(response.data.updatedContact);
                    toast.success("Contact information updated successfully!");
                } else {
                    toast.error("Failed to update contact information");
                }
            } else {
                // Create new contact
                const response = await axios.post(CREATE_CONTACT, contactData);
                if (response.data.status === true) {
                    reset(response.data.newContact);
                    toast.success("Contact information created successfully!");
                } else {
                    toast.error("Failed to create contact information");
                }
            }
        } catch (error) {
            console.log("Error: ", error);
            toast.error("An error occurred while saving contact information");
        }
    }

    const addFAQ = (e) => {
        e.preventDefault();
        setFaqs([...faqs, { id: Date.now(), question: '', answer: '' }]);
    };

    const removeFAQ = (id) => {
        setFaqs(faqs.filter(f => f.id !== id));
    };

    const updateFAQ = (id, field, value) => {
        setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Contact Page</h2>
                <p className="text-muted-foreground">Manage your contact information and location displayed on the website.</p>
            </div>

            <form onSubmit={handleSubmit(handleSaveContactDetails)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>Update the contact details displayed on your website's contact page.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    {...register("phone")}
                                    id="phone"
                                    placeholder="+92 300 1234567"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="info@explorepakistan.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Physical Address</Label>
                            <Textarea
                                {...register("address")}
                                id="address"
                                placeholder="Enter your business address"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="map">Google Maps Embed URL (Optional)</Label>
                            <Input
                                {...register("map")}
                                id="map"
                                placeholder="https://www.google.com/maps/embed?..."
                            />
                            <p className="text-xs text-muted-foreground">
                                Paste the 'src' attribute from the Google Maps embed code to display a map on your contact page.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="my-5"></div>

                <Card>
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions</CardTitle>
                        <CardDescription>Add common questions and answers for your visitors.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {faqs.map((faq) => (
                            <div key={faq.id} className="space-y-2 p-4 border rounded-lg">
                                <div className="flex gap-2 items-start">
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            value={faq.question}
                                            onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                                            placeholder="Question (e.g., What documents do I need?)"
                                        />
                                        <Textarea
                                            value={faq.answer}
                                            onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                                            placeholder="Answer to the question"
                                            rows={2}
                                        />
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFAQ(faq.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button onClick={addFAQ} variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Add FAQ
                        </Button>
                    </CardContent>
                </Card>

                <div className="my-5 flex justify-end">
                    <Button type="submit" size="lg">Save Changes</Button>
                </div>
            </form>
        </div>
    );
}
