import './footer.css'
import { FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer className='footer'>
            <div className='social'>

                <a target='_blank' href='https://github.com/SmirnovAleksey'>
                    <FaGithub className='github-icon' />
                </a>

                <a target='_blank' href='https://t.me/AlekseyNorby'>
                    <FaTelegram className='telegram-icon' />
                </a>

                <a target='_blank' href='https://linkedin.com/in/oleksii-smirnov-57302b266/'>
                    <FaLinkedin className='linkedin-icon' />
                </a>

            </div>

            <div>
                <span>
                    Performed in
                    <a target="_blank" href='https://prometheus.org.ua/'> Prometheus </a>
                    © 2022
                </span>
            </div>
        </footer>
    )
}
