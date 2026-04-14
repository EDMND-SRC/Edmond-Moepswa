'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { X, Copy, Download, Check } from 'lucide-react'
import { toast } from 'sonner'

interface SummaryDownloadProps {
  isOpen: boolean
  onClose: () => void
  selections: {
    service: string
    serviceLabel: string
    tier: string
    tierLabel: string
    tierPriceBWP: number
    addons: { id: string; name: string; qty: number; priceBWP: number }[]
    addonsSubtotalBWP: number
    delivery: string
    deliveryLabel: string
    deliveryCostBWP: number
    deliveryMultiplier: number
    staticDiscount: boolean
    staticDiscountBWP: number
    estimatedTotalBWP: number
    formattedTotal: string
    formattedBase: string
    currency: string
  }
}

type FormatType = 'markdown' | 'text' | 'csv' | 'pdf'

function generateMarkdown(s: SummaryDownloadProps['selections']): string {
  const lines: string[] = []
  lines.push(`# Service Package Summary`)
  lines.push('')
  lines.push(`## Service`)
  lines.push(`- **Category:** ${s.serviceLabel}`)
  lines.push(`- **Tier:** ${s.tierLabel}`)
  lines.push(`- **Base Price:** ${s.formattedBase}`)
  lines.push('')

  if (s.addons.length > 0) {
    lines.push(`## Add-ons`)
    lines.push('')
    lines.push('| Add-on | Qty | Price (BWP) |')
    lines.push('|--------|-----|-------------|')
    s.addons.forEach((a) => {
      lines.push(`| ${a.name} | ${a.qty} | P${(a.priceBWP * a.qty).toLocaleString()} |`)
    })
    lines.push(`| **Subtotal** | | **P${s.addonsSubtotalBWP.toLocaleString()}** |`)
    lines.push('')
  } else {
    lines.push(`## Add-ons`)
    lines.push('')
    lines.push('None selected')
    lines.push('')
  }

  lines.push(`## Delivery`)
  lines.push(`- **Option:** ${s.deliveryLabel}`)
  if (s.deliveryMultiplier > 0) {
    lines.push(`- **Surcharge:** +${Math.round(s.deliveryMultiplier * 100)}%`)
  } else {
    lines.push(`- **Surcharge:** None`)
  }
  lines.push('')

  if (s.staticDiscount) {
    lines.push(`## Discount`)
    lines.push(`- **Static website discount:** −P${s.staticDiscountBWP.toLocaleString()}`)
    lines.push('')
  }

  lines.push(`---`)
  lines.push('')
  lines.push(`### **Estimated Total: ${s.formattedTotal}**`)
  lines.push('')
  lines.push(
    `_Generated on ${new Date().toLocaleDateString('en-BW', { year: 'numeric', month: 'long', day: 'numeric' })}_`,
  )
  lines.push('')

  return lines.join('\n')
}

function generatePlainText(s: SummaryDownloadProps['selections']): string {
  const lines: string[] = []
  lines.push('Service Package Summary')
  lines.push('=========================')
  lines.push('')
  lines.push(`Category:   ${s.serviceLabel}`)
  lines.push(`Tier:       ${s.tierLabel}`)
  lines.push(`Base Price: ${s.formattedBase}`)
  lines.push('')

  if (s.addons.length > 0) {
    lines.push('Add-ons:')
    lines.push('---------')
    s.addons.forEach((a) => {
      const qtyLabel = a.qty > 1 ? ` x${a.qty}` : ''
      lines.push(`  - ${a.name}${qtyLabel} ... P${(a.priceBWP * a.qty).toLocaleString()}`)
    })
    lines.push(`  Subtotal: P${s.addonsSubtotalBWP.toLocaleString()}`)
    lines.push('')
  } else {
    lines.push('Add-ons: None selected')
    lines.push('')
  }

  lines.push('Delivery')
  lines.push('--------')
  lines.push(`  Option: ${s.deliveryLabel}`)
  if (s.deliveryMultiplier > 0) {
    lines.push(`  Surcharge: +${Math.round(s.deliveryMultiplier * 100)}%`)
  } else {
    lines.push(`  Surcharge: None`)
  }
  lines.push('')

  if (s.staticDiscount) {
    lines.push('Discount')
    lines.push('--------')
    lines.push(`  Static website discount: -P${s.staticDiscountBWP.toLocaleString()}`)
    lines.push('')
  }

  lines.push('-------------------------')
  lines.push(`Estimated Total: ${s.formattedTotal}`)
  lines.push('')
  lines.push(
    `Generated on ${new Date().toLocaleDateString('en-BW', { year: 'numeric', month: 'long', day: 'numeric' })}`,
  )
  lines.push('')

  return lines.join('\n')
}

function generateCSV(s: SummaryDownloadProps['selections']): string {
  const rows: string[] = []
  rows.push('Section,Item,Quantity,Price BWP')
  rows.push(`Service,${s.serviceLabel} - ${s.tierLabel},1,${s.tierPriceBWP}`)

  if (s.addons.length > 0) {
    s.addons.forEach((a) => {
      rows.push(`Add-on,"${a.name}",${a.qty},${a.priceBWP * a.qty}`)
    })
    rows.push(`Add-on Subtotal,,,"${s.addonsSubtotalBWP}"`)
  }

  rows.push(
    `Delivery,${s.deliveryLabel},1,${s.deliveryCostBWP > 0 ? Math.round(s.deliveryCostBWP) : 0}`,
  )

  if (s.staticDiscount) {
    rows.push(`Discount,Static website discount,1,-${s.staticDiscountBWP}`)
  }

  rows.push(`Total,Estimated Total,,${s.estimatedTotalBWP}`)
  rows.push('')

  return rows.join('\n')
}

const FORMAT_CONFIG: Record<FormatType, { label: string; extension: string; mime: string }> = {
  markdown: { label: 'Markdown', extension: 'md', mime: 'text/markdown' },
  text: { label: 'Plain Text', extension: 'txt', mime: 'text/plain' },
  csv: { label: 'CSV', extension: 'csv', mime: 'text/csv' },
  pdf: { label: 'PDF Quote', extension: 'pdf', mime: 'application/pdf' },
}

export default function SummaryDownload({ isOpen, onClose, selections }: SummaryDownloadProps) {
  const [format, setFormat] = useState<FormatType>('markdown')
  const [copied, setCopied] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscKey)
    return () => document.removeEventListener('keydown', handleEscKey)
  }, [isOpen, onClose])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormat('markdown')
      setCopied(false)
    }
  }, [isOpen])

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    if (e.key === 'Escape') onClose()
  }

  const generatedContent: string = (() => {
    switch (format) {
      case 'markdown':
        return generateMarkdown(selections)
      case 'text':
        return generatePlainText(selections)
      case 'csv':
        return generateCSV(selections)
      case 'pdf':
        return '' // PDF content is handled via API
      default:
        return ''
    }
  })()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy to clipboard.')
    }
  }

  const handleDownload = async () => {
    const config = FORMAT_CONFIG[format]
    
    if (format === 'pdf') {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      
      try {
        const response = await fetch('/api/quote-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ selections }),
          signal: controller.signal,
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) throw new Error('Failed to generate PDF')
        
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `service-summary-${selections.service}-${selections.tier}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        toast.success('PDF downloaded!')
      } catch (err) {
        toast.error('Failed to generate PDF summary.')
        console.error(err)
      }
      return
    }

    const blob = new Blob([generatedContent], { type: config.mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `service-summary-${selections.service}-${selections.tier}.${config.extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        onKeyDown={handleKeyDown}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={
            reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }
          }
          animate={reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: reducedMotion ? 0 : 0.3 }}
          className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="summary-modal-title"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-[#b0b0b0] hover:text-white hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <h3
            id="summary-modal-title"
            className="text-xl font-medium text-white tracking-tight mb-2"
          >
            Download Summary
          </h3>
          <p className="text-[#b0b0b0] text-sm mb-6">Export your configured service package.</p>

          {/* Format Selector */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <span className="text-sm text-[#b0b0b0] mb-2 block">Format</span>
              <div className="grid grid-cols-2 gap-2">
                {(['markdown', 'text', 'csv', 'pdf'] as FormatType[]).map((f) => {
                  const isActive = format === f
                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFormat(f)}
                      className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                        isActive
                          ? 'bg-[#FF4D2E] text-white'
                          : 'bg-white/5 border border-white/10 text-[#b0b0b0] hover:bg-white/10'
                      }`}
                    >
                      {FORMAT_CONFIG[f].label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Preview (small) */}
          <div className="mb-6 p-3 rounded-lg bg-black/30 border border-white/5 max-h-40 overflow-y-auto">
            <pre className="text-xs text-[#b0b0b0] whitespace-pre-wrap font-mono break-words">
              {generatedContent.slice(0, 500)}
              {generatedContent.length > 500 ? '...' : ''}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  Copy to Clipboard
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#FF4D2E] text-white rounded-full font-medium hover:bg-[#e03a1f] transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Download .{FORMAT_CONFIG[format].extension}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
