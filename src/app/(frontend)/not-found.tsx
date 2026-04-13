'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
          404 Error
        </span>
        <h1 className="text-6xl font-bold mb-6 tracking-tight">Lost in space?</h1>
        <p className="text-[#a3a3a3] text-lg mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved to a new dimension.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#FF4D2E] hover:bg-[#e03a1f] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#FF4D2E]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4D2E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          Back to Homepage
        </Link>
      </motion.div>

      {/* Visual background element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D2E] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
      </div>
    </div>
  )
}
