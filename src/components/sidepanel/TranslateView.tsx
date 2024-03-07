import { useState } from 'react'
import { TranslateResponse } from '~types'
import TextArea from '~components/sidepanel/TextArea'

const languages = ['Auto Detect', 'Thai', 'French']
const outPutlanguages = ['Persian', 'English', 'Spanish']

export default function TranslateView () {
  const [lang, setLang] = useState('Auto Detect')
  const [outLang, setOutLang] = useState('Persian')
  const [providedText, setProvidedText] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function translateText () {
    if (providedText.length >= 350)
      return alert(
        'your text is too long , maximom text length is 350 charracters'
      )

    setLoading(true)
    setResponse(' ')

    try {
      const res = await fetch(
        `${process.env.PLASMO_PUBLIC_SERVER_PATH}/api/translate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: providedText
          })
        }
      )

      const translateData = (await res.json()).data as TranslateResponse

      const response = translateData.choices[0].message

      setResponse(response.content)
    } catch (error) {
      console.warn(error)
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500)
      setResponse('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h6 className='my-4 font-bold text-lg text-gray-600'>Translate</h6>

      {/* language selection */}
      <div className='flex bg-[#dfdfe4] max-w-fit gap-4 rounded-full'>
        {languages.map(el => {
          return (
            <button
              className={`${
                lang === el ? 'bg-black text-white ' : ''
              } p-2 rounded-full min-w-20`}
              onClick={() => setLang(el)}
              key={el}
            >
              {el}
            </button>
          )
        })}
      </div>

      <TextArea
        value={providedText}
        setValue={setProvidedText}
        placeholder='Enter Text'
      />

      {/* Error */}

      {error && (
        <p className='text-red-500'>
          something wrong happend , please try again after a couple of seconds
        </p>
      )}

      {/* Action Button */}
      <div className='text-center '>
        <button
          onClick={translateText}
          className='bg-gray-300 hover:bg-gray-200 transition duration-300 text-center rounded-full  aspect-1 h-9 w-9'
        >
          <span className='icon-[mdi--arrow-up-down] bg-gray-500'></span>
        </button>
      </div>

      <div className='flex bg-[#dfdfe4] max-w-fit gap-4 rounded-full'>
        {outPutlanguages.map(el => {
          return (
            <button
              className={`${
                outLang === el ? 'bg-black text-white ' : ''
              } p-2 rounded-full min-w-20`}
              onClick={() => setOutLang(el)}
              key={el}
            >
              {el}
            </button>
          )
        })}
      </div>

      <TextArea
        value={response}
        placeholder='Translate'
        disabled={true}
        loading={loading}
      />
    </div>
  )
}
