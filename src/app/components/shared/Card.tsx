import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface CardProps {
  title: string
  description: string
  image: string
  link: string
  date?: string
}

const Card = ({ title, description, image, link, date }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  return (
    <motion.div 
      className="glow-card glowing-border relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-80 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      onClick={() => router.push(link)}
    >
      <div className="relative h-full w-full">
        <Image
          src={image || "/placeholder.svg?height=300&width=400"}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-6"
          initial={{ opacity: 0, height: '0%' }}
          animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? '75%' : '0%' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-200 line-clamp-3">{description}</p>
          {date && <p className="text-xs text-gray-300 mt-2">{new Date(date).toLocaleDateString()}</p>}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Card

