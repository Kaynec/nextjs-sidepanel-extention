import type { NextApiRequest, NextApiResponse } from 'next'

import { allowCors } from '~lib/cors'

async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.send('unsupported method')

  if (req.method === 'POST') {
    const { text, format, length, outputLang } = req.body

    if (!text || !format || !length || !outputLang)
      return res.json({
        message: 'Please Provide correct data for me to handle',
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
            compose a write up for me using this properties
            --------------------------------------------------------
            format:${format}
            length:${length}
            outputLang:${outputLang}
            this is the actual text:${text}
            `
            }
          ]
        })
      })
      const response = await resp.json()
      console.log(process.env.NEXT_PUBLIC_API_KEY, response)

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
