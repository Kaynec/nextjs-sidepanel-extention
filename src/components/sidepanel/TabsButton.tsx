export default function TabButton ({
  active,
  setCurrentTab,
  icon,
  label,
  bgColor
}) {
  return (
    <button
      className='flex flex-col gap-2  justify-center items-center relative '
      onClick={setCurrentTab}
    >
      {active && (
        <div
          style={{ background: bgColor }}
          className='shadow-purple-300 shadow-inner absolute w-36 h-14 rounded-full bg-opacity-90 translate-y-[-22px] translate-x-[-40px]'
        >
          <div
            style={{ background: bgColor }}
            className='absolute  left-[45%] rounded-tr-full  top-[-4px]  w-5 h-5'
          ></div>
          <div
            style={{ background: bgColor }}
            className='absolute  left-[45%] rounded-br-full  bottom-[-4px]  w-5 h-5'
          ></div>
        </div>
      )}

      <div
        className={`w-8 h-8 ${icon} z-10 ${
          active ? 'bg-purple-500' : ' bg-gray-400'
        } `}
      ></div>
      <span className='text-gray-400'>{label}</span>
    </button>
  )
}
