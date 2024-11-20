import { useEffect, useState } from 'react';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import BookCard from '../components/book.card.jsx';
// import books from '../db/books.json'; // Static JSON file for now


const OutletRoutes = () => {
    const { menu, submenu, submenuid } = useParams();
    const [books, setBooks] = useState([]); // State to store books from API
    const [loading, setLoading] = useState(true);

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


    // const filteredBooks = books.filter(book => {
    //     console.log("book.sub1_id:", `"${book.sub1_id}"`, "submenuid:", `"${submenuid}"`);
    //     // return book.sub1_id.trim() === submenuid.trim();
    //     return book.sub1_id.includes(submenuid);
    // });


    const filteredBooks = books.filter(book => {
        if (!book.sub1_id) return false; // Handle cases where sub1_id is missing
        console.log("Checking book.sub1_id:", book.sub1_id, "against submenuid:", submenuid);
        return book.sub1_id.includes(submenuid); // Match submenuid against sub1_id array
    });

    if (loading) return <p>Loading...</p>;

    return (
        <div className="product-list">
            <h2>{menu} : {submenu} </h2>
            <p>Finding {filteredBooks.length} books</p>
            <div className="product-grid">
                {filteredBooks.map((product, index) => (
                    <BookCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default OutletRoutes;
