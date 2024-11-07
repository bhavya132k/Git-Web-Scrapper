import axios from 'axios';
import { Request, Response } from 'express';
import { GITHUB_API_TOKEN } from '../config';




export const getRepos = async (req: Request, res: Response) => {
    const keywords = req.query.keywords;
    const page = req.query.page;
    if (typeof keywords !== 'string') {
        return res.status(400).json({ error: 'Invalid keywords' });
    }
    const url_encoded_keywords = encodeURIComponent(keywords);
    try {

        const response = await axios.get(`https://api.github.com/search/repositories?q=${url_encoded_keywords}&language=C&per_page=10&page=${page}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
}





