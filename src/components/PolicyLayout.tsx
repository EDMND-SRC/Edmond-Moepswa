'use client'
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

interface PolicyLayoutProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
}

export const PolicyLayout: React.FC<PolicyLayoutProps> = ({ title, lastUpdated, children }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-[#FF4D2E] text-sm font-medium mb-8 inline-block hover:underline"
          >
            ← Back to Homepage
          </Link>

          <h1 className="text-4xl md:text-5xl font-normal mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {title}
          </h1>

          {lastUpdated && (
            <p className="text-[#a3a3a3] text-sm mb-12 italic">Last Updated: {lastUpdated}</p>
          )}

          <div
            className="prose prose-invert prose-orange max-w-none 
            prose-headings:text-white prose-headings:font-medium 
            prose-p:text-[#a3a3a3] prose-p:leading-relaxed 
            prose-li:text-[#a3a3a3]
            prose-strong:text-white
          "
          >
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
