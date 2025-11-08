import { NextApiRequest, NextApiResponse } from 'next';
import { apiClient } from '@/lib/apiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await apiClient.get('/recent-questions');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'An error occurred while fetching recent questions.' });
  }
}
