export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
  
  export const staggerChildren = (staggerTime = 0.1) => ({
    animate: { transition: { staggerChildren: staggerTime } }
  })
  
  