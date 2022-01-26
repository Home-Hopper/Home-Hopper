import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const AboutUs = () => {
  return (
    <main className="bg-purple-200 flex justify-center py-12">
      <div className="w-9/12 ">
        <h1 className="text-center text-2xl mb-2">
          👋Hi! We are Nerea & Federico
        </h1>
        <h2 className="text-center mb-6">
          We are happy to see you´ve found Home Hopper, hope you like it!
        </h2>
        <p>
          Home Hopper started as a second version of one of our previous
          projects as Ironhack students. We both have struggled in the past
          trying to find a place to stay for a short amount of time and we are
          sure there are more people out there in the same situation. That´s why
          we decided to join our forces and develop this new web-application.
        </p>
        <div className="w-full h-auto flex flex-col md:flex-row justify-evenly mt-2">
          <div className="w-60 rounded-xl flex flex-col items-center  shadow-md bg-white p-6">
            <img
              src="../../images/nerea.jpg"
              alt="nerea"
              className="rounded-full mb-2"
            />
            <span className="mb-8">Nerea Pardo Cundíns</span>
            <p className="text-justify">
              Hi! I´m Nerea, a full-stack web developer, and I invite you to
              check my profiles in LinkedIn and Github so you can know what I am
              currently working on.
            </p>
            <div className="w-full flex justify-evenly text-2xl">
              <a
                href="https://github.com/nereapardo"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithubSquare} />
              </a>
              <a
                href="https://www.linkedin.com/in/nereapardo/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
          <div className="w-60 rounded-xl flex flex-col items-center  shadow-md bg-white p-6">
            <img
              src="../../images/fede.jpg"
              alt="Federico"
              className="rounded-full mb-2"
            />
            <span className="mb-8">Federico Gómez Lara</span>
            <p className="text-justify">
              I´m Fede, a full-stack web developer. Here are my LinkedIn and
              Github so you can check more of my current projects.
            </p>
            <div className="w-full flex justify-evenly mt-4 text-2xl">
              <a
                href="https://github.com/fede4954"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faGithubSquare} />
              </a>
              <a
                href="https://www.linkedin.com/in/federico-g%C3%B3mez-lara-a5641921b/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default AboutUs
