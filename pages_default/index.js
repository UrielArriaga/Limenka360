
import NavbarHome from '../components/Home/NavBarHome'
import HeroArea from '../components/Home/HeroArea'
import Footer from '../components/Home/Footer'
export default function Home() {
return(
 <>
   <NavbarHome/>
      <main className="fix">
      <HeroArea/>
      <Footer/>
      </main>
 </>
)
}
