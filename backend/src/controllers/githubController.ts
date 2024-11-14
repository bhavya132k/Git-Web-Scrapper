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
        const query = keywordsArray.map(keyword => `${keyword}`).join('+');

        // const built_URL = `https://api.github.com/search/repositories?q=(${query}+language:C&per_page=25&page=${page}`;
        const built_URL = `https://api.github.com/search/repositories?q=${query}+language:C&per_page=25&page=${page}&sort=updated&order=desc`;

        let response = await axios.get(built_URL, {
            headers: {
            Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        // if total_count < 25 in reposnse then make another request 
        // with the same query but no per_page and page = 1

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
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        
        res.status(404).json({ error: 'System is offline Check your internet' });
    }
}

export const getDependencies = async (req: Request, res: Response) => {

    const owner = req.query.owner;
    const repo = req.query.repo;
    if (typeof owner !== 'string' || typeof repo !== 'string') {
        return res.status(400).json({ error: 'Invalid owner or repo' });
    }
    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/dependency-graph/sbom`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(404).json({ error: 'System is offline Check your internet' });
    }
}






