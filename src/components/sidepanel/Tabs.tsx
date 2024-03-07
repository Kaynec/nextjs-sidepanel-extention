import { useState } from 'react'
import TabButton from './TabsButton'
import TranslateView from './TranslateView'
import WriteView from './WriteView'

const icons = {
  translate: 'icon-[mdi--translate]',
  write: 'icon-[mdi--pencil-box]'
}

const Tabs = {
  TRANSLATE: 'TRANSLATE',
  WRITE: 'WRITE'
} as const

const bgColor = '#f4f4f5'
const tabColor = '#ececee'

export default function SidePanelTabs () {
  const [tab, setTab] = useState<keyof typeof Tabs>(Tabs.TRANSLATE)

  return (
    <main
      className=' h-screen overflow-hidden flex'
      style={{
        background: bgColor
      }}
    >
      {/* THIS IS RESPONSIBLE FOR THE CURRENT TAB VIEW */}
      <div className='grow  p-4 overflow-auto'>
        {tab === 'TRANSLATE' ? <TranslateView /> : <WriteView />}
      </div>
      <div
        style={{ background: tabColor }}
        className='basis-20 pt-36 h-full text-center flex flex-col gap-12 overflow-hidden'
      >
        <TabButton
          label='Translate'
          active={tab === Tabs.TRANSLATE}
          icon={icons.translate}
          setCurrentTab={() => setTab('TRANSLATE')}
          bgColor={bgColor}
        />
        <TabButton
          label='Write'
          active={tab === Tabs.WRITE}
          icon={icons.write}
          setCurrentTab={() => setTab('WRITE')}
          bgColor={bgColor}
        />
      </div>
    </main>
  )
}
