import React from 'react'
import WebLayout from '../layout/WebLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Globe, MapPin, Sun, Users, ArrowRight } from 'lucide-react'

const About = () => {
    const features = [
        {
            icon: <Globe className="h-10 w-10 text-primary" />,
            title: "Rich Culture & Heritage",
            description: "Experience the vibrant culture and centuries-old history of Pakistan through its museums, architecture, and traditions."
        },
        {
            icon: <MapPin className="h-10 w-10 text-primary" />,
            title: "Breathtaking Landscapes",
            description: "From the majestic peaks of the Himalayas to the serene beaches, Pakistan offers diverse landscapes that will leave you in awe."
        },
        {
            icon: <Sun className="h-10 w-10 text-primary" />,
            title: "Affordable Travel",
            description: "Pakistan offers incredible travel experiences without breaking your budget, making it an affordable destination for all types of travelers."
        },
        {
            icon: <Users className="h-10 w-10 text-primary" />,
            title: "Warm Hospitality",
            description: "The people of Pakistan are known for their friendliness and hospitality, ensuring a memorable experience for all visitors."
        }
    ]

    const destinations = [
        {
            name: "Islamabad",
            description: "The capital city, known for its modern architecture, beautiful gardens, and proximity to nature.",
            image: "islamabad.webp"
        },
        {
            name: "Hunza Valley",
            description: "A stunning mountainous region known for its dramatic landscapes, terraced fields, and crystal-clear lakes.",
            image: "hunza.jpg"
        },
        {
            name: "Skardu",
            description: "Located in the northern areas, Skardu offers some of the most beautiful views of snow-capped peaks and rugged landscapes.",
            image: "skardu.jpg"
        },
        {
        name: "Lahore",
        description: "Known as the 'Heart of Pakistan,' Lahore is a city rich in history, culture, and vibrant traditions. Visit the majestic Badshahi Mosque, Lahore Fort, and experience the famous Lahori food culture.",
        image: "Lahore.jpg"
    }
    ]

    const team = [
        {
            name: "Ali Khan",
            role: "Tour Guide & Founder",
            initials: "AK",
            image: "1.jpg"
        },
        {
            name: "Ayesha Bukhari",
            role: "Customer Support Manager",
            initials: "AB",
            image: "6.jpg"
        },
        {
            name: "Farhan Hussain",
            role: "Operations Lead",
            initials: "FH",
            image: "4.jpg"
        },
        {
            name: "Mehreen Shah",
            role: "Tourism Expert",
            initials: "MS",
            image: "7.jpg"
        }
    ]

    const travelPackages = [
        {
            title: "Northern Adventure",
            description: "Explore the majestic northern areas of Pakistan including Hunza, Skardu, and Gilgit.",
            price: "Starting at 35,000 PKR",
            image: "northern.jpg"
        },
        {
            title: "Cultural Tour of Lahore & Islamabad",
            description: "Discover the rich history and culture of Lahore and Islamabad, with visits to museums, forts, and local bazaars.",
            price: "Starting at 25,000 PKR",
            image: "Lah_Isl.webp"
        }
    ]

    const testimonials = [
        {
            name: "Sarah Ahmed",
            review: "Exploring Pakistan was an unforgettable experience! From the breathtaking mountains to the incredible food, every moment was magical.",
            image: "2.jpg"
        },
        {
            name: "John Doe",
            review: "The tour was well-organized, and the guides were friendly and knowledgeable. Highly recommend for anyone looking for adventure!",
            image: "3.jpg"
        }
    ]

    return (
        <WebLayout>
            <div className="min-h-screen bg-background text-foreground mt-20">
                {/* Banner Section */}
                <section className="relative h-[400px] w-full bg-gradient-to-br from-blue-900 via-green-700 to-yellow-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/Planning.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            Explore the Wonders of Pakistan
                        </h1>
                        <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                            Discover the beauty, culture, and adventure that await you in Pakistan.
                        </p>
                        <Button size="lg" className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 bg-green-600 hover:bg-green-700">
                            Explore Tours <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </section>

                <div className="container mx-auto pl-8 pr-8 py-16 md:py-24 space-y-24">
                    {/* Our Story / Intro */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                Discover the Beauty of Pakistan
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                "Explore Pakistan" aims to showcase the incredible landscapes, rich culture, and unique experiences that Pakistan has to offer. Whether you're looking for adventure in the mountains or exploring vibrant cities, we’ve got it all covered for you.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 mix-blend-multiply" />
                            <img
                                src="landscape.webp"
                                alt="Pakistani landscape"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </section>

                    <Separator />

                    {/* Why Explore Pakistan */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Why Visit Pakistan?</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Pakistan offers a diverse range of experiences for all kinds of travelers. Here’s why you should explore Pakistan.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="border-none shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                                            {feature.icon}
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Popular Destinations */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Popular Destinations</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Explore the most popular destinations in Pakistan that will make your journey unforgettable.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {destinations.map((destination, index) => (
                                <div key={index} className="card shadow-lg">
                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="h-48 w-full object-cover rounded-lg"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-xl">{destination.name}</h3>
                                        <p className="text-muted-foreground text-sm">{destination.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Travel Packages */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Travel Packages</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Choose from a variety of travel packages to make the most of your time in Pakistan.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {travelPackages.map((packageItem, index) => (
                                <Card key={index} className="border-none shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
                                    <img
                                        src={packageItem.image}
                                        alt={packageItem.title}
                                        className="h-78 w-full object-cover rounded-t-lg"
                                    />
                                    <CardContent>
                                        <h3 className="font-semibold text-lg">{packageItem.title}</h3>
                                        <p className="text-muted-foreground text-sm">{packageItem.description}</p>
                                        <p className="font-bold mt-2">{packageItem.price}</p>
                                        <Button className="mt-4 bg-green-600 hover:bg-green-700  ">Book Now</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <Separator />

                    {/* Meet the Team */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet Our Guides</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Our expert guides are ready to take you on an unforgettable journey through Pakistan.
                            </p>
                        </div>
                        <div className="px-12">
                            <Carousel opts={{ align: "start", loop: true }} className="w-full">
                                <CarouselContent>
                                    {team.map((member, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 pl-4">
                                            <Card className="overflow-hidden border shadow-md hover:shadow-lg transition-all duration-300 group h-full m-0 p-0">
                                                <CardContent className="p-0">
                                                    <div className="aspect-square relative overflow-hidden bg-muted">
                                                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/20">
                                                            {member.initials}
                                                        </div>
                                                        <img
                                                            src={member.image}
                                                            alt={member.name}
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="p-6 text-center">
                                                        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                                                        <p className="text-sm text-muted-foreground font-medium text-primary">{member.role}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </section>

                    <Separator />

                    {/* Testimonials */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What Our Travelers Say</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Hear from our happy customers about their unforgettable experiences exploring Pakistan.
                            </p>
                        </div>
                        <div className="space-y-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="flex flex-col items-center space-y-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-center italic text-lg">{testimonial.review}</p>
                                    <p className="font-semibold">{testimonial.name}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </WebLayout>
    )
}

export default About
