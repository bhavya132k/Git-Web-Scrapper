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
    try {
        // split the keywords by comma and pass them to the query
        const keywordsArray = keywords.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
        if (keywordsArray.length === 0) {
            return res.status(400).json({ error: 'Invalid keywords' });
        }
        const query = keywordsArray.map(keyword => `${keyword}`).join('+');

        // const built_URL = `https://api.github.com/search/repositories?q=(${query}+language:C&per_page=25&page=${page}`;
        const built_URL = `https://api.github.com/search/repositories?q=${query}+language:C&per_page=20&page=${page}&sort=updated&order=desc`;

        let response = await axios.get(built_URL, {
            headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });


        if (response.data.total_count < 25) {

            const built_URL = `https://api.github.com/search/repositories?q=${query}+language:C&sort=updated&order=desc`;
            // wait for 1 second before making the request
            await new Promise(resolve => setTimeout(resolve, 1000));
            response = await axios.get(built_URL, {
                headers: {
                    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
                },
            });
        
        }

        if(response.status == 403){
            res.status(403).json({ error: 'Rate limit exceeded' });
        }


        console.log(built_URL);
        console.log(response.headers);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        
        res.status(404).json({ error: 'System is offline Check your internet' });
    }
}







