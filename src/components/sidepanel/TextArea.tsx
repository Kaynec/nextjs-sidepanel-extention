import Spinner from '~components/Spinner'
import { copyToClipBoard } from '~lib/util/clipboard'

export default function TextArea ({
  value,
  setValue,
  placeholder,
  disabled = false,
  loading = false
}: {
  value: string
  setValue?: (s) => void
  placeholder: string
  disabled?: boolean
  loading?: boolean
}) {
  return (
    <div className='bg-gray-200 text-sm relative my-2 flex items-center justify-center rounded-lg border focus-within:border-purple-500'>
      {loading && <Spinner className='absolute w-full h-full' />}
      <textarea
        rows={6}
        className='relative w-full h-full bg-transparent mb-10 appearance-none outline-none rounded-lg p-2 '
        value={value}
        disabled={disabled}
        onInput={e => setValue((e.target as any).value)}
        placeholder={placeholder}
      ></textarea>
      <button
        className='absolute left-3 bottom-3 z-99'
        onClick={() => copyToClipBoard(value)}
      >
        <span className='icon-[mdi--content-copy]     w-5 h-5 bg-gray-500 '></span>
      </button>
      <button
        className='absolute left-12 bottom-3 z-99'
        onClick={() => alert('not implemented yet')}
      >
        <span className='icon-[mdi--volume-high] w-5 h-5 bg-gray-500 '></span>
      </button>
    </div>
  )
}
