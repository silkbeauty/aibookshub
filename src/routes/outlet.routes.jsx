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
    const { setTopSection, selectedSub2Id  } = useOutletContext(); // Access context


    useEffect(() => {
        // Fetch books dynamically
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://gitbooks.vercel.app/book/list'); // Update this to your backend API endpoint
                await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
                setBooks(response.data); // Save books in state
            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false);
            }finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);


    const filteredBooks = books.filter(book => {
        if (!book.sub1_id) return false; // Handle cases where sub1_id is missing
        return book.sub1_id.includes(submenuid); // Match submenuid against sub1_id array
    });

    const filteredBooksBySub2 = selectedSub2Id
        ? filteredBooks.filter((book) => book.sub2_id?.includes(selectedSub2Id))
        : filteredBooks;

    useEffect(() => {
        setTopSection({ menu, submenu, filteredBooks: filteredBooksBySub2 });
    }, [menu, submenu, filteredBooksBySub2]);

    // if (loading) return <p>Loading...</p>;
    if (loading) return <Spinner />;


    return (
        <div className="product-list">

                <div className="product-grid">
                    {filteredBooksBySub2.map((product, index) => (
                        <BookCard key={index} product={product}/>
                    ))}
                </div>
        </div>
);
};

export default OutletRoutes;
