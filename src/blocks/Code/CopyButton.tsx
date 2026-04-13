'use client'
import { Button } from '@/components/ui/button'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { useState } from 'react'

export function CopyButton({ code }: { code: string }) {
  const [text, setText] = useState('Copy')

  function updateCopyStatus() {
    setText((prev) => {
      if (prev === 'Copy') {
        setTimeout(() => setText('Copy'), 1000)
        return 'Copied!'
      }
      return prev
    })
  }

  return (
    <div className="flex justify-end align-middle">
      <Button
        className="flex gap-1"
        variant={'secondary'}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(code)
            updateCopyStatus()
          } catch (err) {
            console.error('Failed to copy:', err)
            setText('Failed to copy')
          }
        }}
      >
        <p>{text}</p>
        <CopyIcon />
      </Button>
    </div>
  )
}
