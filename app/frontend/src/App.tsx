import Hero  from "./component/hero"
import CoreContent from "./component/corecontent"
import Footer from "./component/footer"
function App() {
  
  return (
    <>
      <Hero />
        <div className=" mx-22">
            <CoreContent></CoreContent>
        </div>
      <Footer />
    </>
  )
}

export default App
