import axios from 'axios';
import { Request, Response } from 'express';
import { GITHUB_API_TOKEN } from '../config';




export const getRepos = async (req: Request, res: Response) => {
    const keywords = req.query.keywords;
    const page = req.query.page;
    if (typeof keywords !== 'string') {
        // split the keywords by comma and check if they are valid
        return res.status(400).json({ error: 'Invalid keywords' });
    }
    const url_encoded_keywords = encodeURIComponent(keywords);
    try {
        // split the keywords by comma and pass them to the query
        const keywordsArray = keywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
        const query = keywordsArray.map(keyword => `${keyword}`).join('+');

        const response = await axios.get(`https://api.github.com/search/repositories?q=${query}+language:C&per_page=25&page=${page}`, {
            headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'System is offline Check your internet' });
    }
}





