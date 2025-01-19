import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
}

const Section = ({ id, className = '', children }: SectionProps) => {
  return (
    <>
      <section id={id} className={`min-h-screen flex flex-col justify-center py-20 ${className}`}>
        <div className="container mx-auto px-6">
          {children}
        </div>
      </section>
      <div className="section-divider"></div>
    </>
  )
}

export const SectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <motion.h2 
      className="section-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  )
}

export default Section

