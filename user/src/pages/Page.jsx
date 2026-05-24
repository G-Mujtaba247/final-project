import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { DETAIL_WEBPAGE } from '@/resources/server-API';
import WebLayout from '@/layout/WebLayout';

const Page = () => {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${DETAIL_WEBPAGE}/${slug}`);
                if (response.data.status) {
                    setPage(response.data.webpage);
                } else {
                    setPage(null);
                }
            } catch (error) {
                console.error("Error fetching page:", error);
                setPage(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);

    if (loading) {
        return (
            <WebLayout>
                <div className="min-h-[50vh] flex items-center justify-center">
                    <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
                </div>
            </WebLayout>
        );
    }

    if (!page) {
        return (
            <WebLayout>
                <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="text-xl text-muted-foreground">Page Not Found</p>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">{page.title}</h1>
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </div>
        </WebLayout>
    );
};

export default Page;
