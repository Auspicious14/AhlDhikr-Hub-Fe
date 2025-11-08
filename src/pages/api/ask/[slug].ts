import { NextApiRequest, NextApiResponse } from 'next';
import { apiClient } from '@/lib/apiClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'A valid slug is required.' });
  }

  try {
    const response = await apiClient.get(`/ask/${slug}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'An error occurred while fetching the answer.' });
  }
}
