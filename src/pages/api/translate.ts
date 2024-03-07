import type { NextApiRequest, NextApiResponse } from 'next'

import { allowCors } from '~lib/cors'

async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.send('unsupported method')

  if (req.method === 'POST') {
    const { text } = req.body

    if (!text)
      return res.json({
        message: 'Please Provide a text for me to handle',
        statusCode: 400
      })

    // send a request to the llvm chat model

    try {
      const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: `
            please provide the persian translation of the text below
            --------------------------------------------------------
            ${text}
            `
            }
          ]
        })
      })
      const response = await resp.json()

      return res.json({
        data: response,
        statusCode: 200
      })
    } catch (error) {
      return res.json({
        message: 'internal error , this is on us',
        statusCode: 500
      })
    }
  }
}
export default allowCors(handler)
