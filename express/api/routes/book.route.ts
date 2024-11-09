import {sql} from "@vercel/postgres";

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ name: 'aibookshub', website: 'https://aibookshub.com' });
});

router.get('/side', async (req, res) => {
    try {
        // Fetch all categories from the database
        const side = await sql`SELECT side_id, side_name, side_logo, head_id, head_name FROM books_cat;`;

        // If data is found, send it as JSON
        if (side && side.rows.length > 0) {
            res.status(200).json(side.rows); // Sends the data as JSON
        } else {
            res.status(404).json({ message: 'No categories found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving categories' });
    }
});


router.post('/new', (req, res) => {
    res.status(201).json({ msg: 'new book, new start' });
});

module.exports = router;

