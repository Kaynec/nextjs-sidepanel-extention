import { useEffect, useState } from 'react'
import { TranslateResponse } from '~types'
import TextArea from '~components/sidepanel/TextArea'
import Spinner from '~components/Spinner'
const formats = ['Auto', 'Email', 'Message']
const lengths = ['Auto', 'Short', 'Medium', 'Long']
const outPutLangs = [
  'English',
  'Persian',
  'Green',
  'Polish',
  'French',
  'Spanish'
]

export default function WriteView () {
  const [textToCompose, setProvidedText] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [length, setLength] = useState('Short')
  const [format, setFormat] = useState('Auto')
  const [outputLang, setOutPutLang] = useState('English')

  async function composeText () {
    if (loading) return
    if (textToCompose.length >= 350)
      return alert(
        'your text is too long , maximum text length is 350 charracters'
      )

    // TODO change this a little later

    setLoading(true)
    setResponse(' ')

    try {
      const res = await fetch(
        `${process.env.PLASMO_PUBLIC_SERVER_PATH}/api/write`,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            length,
            format,
            outputLang,
            text: textToCompose
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

  function handlekeyShurtcut (e) {
    if (e.key !== 'Enter') {
      return
    }
    if (!e.ctrlKey) return

    composeText()

    return e
  }

  useEffect(() => {
    window.addEventListener('keyup', handlekeyShurtcut)
    return () => window.removeEventListener('keyup', handlekeyShurtcut)
  }, [])

  return (
    <div>
      <h6 className='my-4 font-bold text-lg text-gray-600'>Write</h6>

      {/* language selection */}
      <span className='bg-black text-white p-2 rounded-full min-w-20'>
        Compose
      </span>
      <div className='mt-4'>
        <h5 className='text-lg font-semibold '>Write About</h5>

        <TextArea
          value={textToCompose}
          setValue={setProvidedText}
          placeholder='Tell me what to write for you. Hit Ctrl+Enter to generate.'
        />
      </div>
      {/* Error */}
      {error && (
        <p className='text-red-500'>
          something wrong happend , please try again after a couple of seconds
        </p>
      )}

      <div>
        <h6 className='py-2 text-lg font-semibold'>Length</h6>
        <div className='flex max-w-fit gap-4 rounded-full'>
          {lengths.map(el => {
            return (
              <button
                className={`${
                  length === el ? 'bg-purple-400  ' : 'bg-gray-200'
                } p-2 rounded-lg`}
                onClick={() => setLength(el)}
                key={el}
              >
                {el}
              </button>
            )
          })}
        </div>
      </div>

      <div className='my-4'>
        <h6 className='py-2 text-lg font-semibold'>Format</h6>
        <div className='flex max-w-fit gap-4 rounded-full'>
          {formats.map(el => {
            return (
              <button
                className={`${
                  format === el ? 'bg-purple-400  ' : 'bg-gray-200'
                } p-2 rounded-lg`}
                onClick={() => setFormat(el)}
                key={el}
              >
                {el}
              </button>
            )
          })}
        </div>
      </div>
      <div className='my-4 max-w-64 flex flex-col items-start gap-3'>
        <h6 className=' text-lg font-semibold'>Output Language</h6>
        <select
          onChange={e => setOutPutLang(e.target.value)}
          value={outputLang}
          className={`py-3 px-4 pe-9 block w-full outline-none 
           bg-gray-200 text-gray-500 focus:outline-purple-500 rounded-full text-sm`}
        >
          {outPutLangs.map(el => {
            return <option key={el}>{el}</option>
          })}
        </select>
      </div>

      <button
        type='button'
        className={`
            py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full duration-300 transition
         bg-purple-600 text-white hover:bg-purple-700 w-full  ${
           textToCompose.length
             ? 'cursor-pointer'
             : 'bg-opacity-80 cursor-not-allowed'
         }
            `}
        disabled={!textToCompose.length || loading}
        onClick={composeText}
      >
        Regenerate
        {loading && <Spinner />}
      </button>

      {response && (
        <div className='fadeIn'>
          <h6 className='text-lg font-semibold'>Preview</h6>

          <TextArea value={response} placeholder='' disabled={true} />
        </div>
      )}
    </div>
  )
}
