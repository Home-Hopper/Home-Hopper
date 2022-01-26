import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="w-full md:h-12 bg-gray-dark text-white flex flex-col md:flex-row justify-between items-center">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <div className="flex flex-col">
          <div className="flex text-md items-center">
            <a
              href="https://www.linkedin.com/in/nereapardo/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="mx-2" />
            </a>
            <a
              href="https://github.com/nereapardo"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithubSquare} className="mr-2" />
            </a>
            <span>Nerea Pardo Cundíns</span>
          </div>
          <div className="flex text-md items-center">
            <a
              href="https://www.linkedin.com/in/federico-g%C3%B3mez-lara-a5641921b/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="mx-2" />
            </a>
            <a
              href="https://github.com/fede4954"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faGithubSquare} className="mr-2" />
            </a>
            <span className="">Federico Gómez Lara</span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/3 text-center">
        <Link to="/about-us" className="hover:underline">
          About us
        </Link>
      </div>
      <div className="w-full md:w-1/3 text-center md:text-right mr-2">
        Made with ❤ || 2021
      </div>
    </footer>
  )
}

export default Footer
