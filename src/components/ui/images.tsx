import { motion } from "motion/react"
import './images.css'

function Images() {
    return (
        <div className='imagen1'>
            <motion.img
                src="https://i.pinimg.com/736x/23/3b/09/233b093ffba857100ef36d3eefb28d2a.jpg"
                alt="Main Image"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="imagen1"
            />
        </div>
    )   
}

export default Images