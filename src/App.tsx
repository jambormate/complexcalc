import Calculator from './components/Calculator'
import Fejlec from './components/Fejlec'
import Lablec from './components/Lablec'
function App() {

  return (
    <>
      <div className="container py-4">
      <Fejlec />
      <main>
        <Calculator />
      </main>
      <Lablec />
    </div>
    </>
  )
}

export default App
