
import axios from 'axios';
import { Request, Response } from 'express';
import { GITHUB_API_TOKEN } from '../config';

export const getUser = async (req: Request, res: Response) => {
    const q = req.params.keywords;
    try {
        const response = await axios.get(`https://api.github.com/search/repositories?q=${q}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'User not found' });
    }
};
