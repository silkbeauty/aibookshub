// outlet.routes.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

import {useOutletContext, useParams} from 'react-router-dom';
import BookCard from '../components/book.card.jsx';

const Spinner = () => {
    return (
        <div className="spinner-layout">
            <div className="spinner-square">
                <div className="square-1 square"></div>
                <div className="square-2 square"></div>
                <div className="square-3 square"></div>
            </div>
        </div>
    );
};


const OutletRoutes = () => {
    const { menu, submenu, submenuid } = useParams();
    const [books, setBooks] = useState([]); // State to store books from API
    const [loading, setLoading] = useState(true);
    const { setTopSection } = useOutletContext(); // Access context
    // const [topSection, setTopSection] = useState();

    useEffect(() => {
        // Fetch books dynamically
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://gitbooks.vercel.app/book/list'); // Update this to your backend API endpoint
                console.log("API Response:", response.data);
                setBooks(response.data); // Save books in state
                setLoading(false);
            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);


    const filteredBooks = books.filter(book => {
        if (!book.sub1_id) return false; // Handle cases where sub1_id is missing
        return book.sub1_id.includes(submenuid); // Match submenuid against sub1_id array
    });

    useEffect(() => {
        setTopSection({ menu, submenu, filteredBooks });
    }, [menu, submenu, filteredBooks]);

    if (loading) return <p>Loading...</p>;
    if (loading) return <Spinner />;


    return (
        <div className="product-list">

                <div className="product-grid">
                    {filteredBooks.map((product, index) => (
                        <BookCard key={index} product={product}/>
                    ))}
                </div>
        </div>
);
};

export default OutletRoutes;
