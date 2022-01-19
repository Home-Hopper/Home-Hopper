import Navbar from './Navbar'
import Footer from './Footer'

const Layout = (props) => {
  return (
    <div className="grid grid-rows-layout h-full">
      <Navbar {...props} />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
