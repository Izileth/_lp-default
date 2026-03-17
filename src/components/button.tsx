

import { motion } from "motion/react"
import './button.css'
const Button = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <button className="botao1">
                <span>Olá, eu sou um botão!</span>
            </button>
        </motion.div>
    )
}

export default Button