import Button from './components/button'
import Images from './components/ui/images'
function App() {

  return (
    <>
      <div className='main'>
        <h1>Hello World!</h1>
        <div>
          <Images />
        </div>
        <p>Clique neste botão para ver a animação!</p>
        <div className='main-sub'>
          <Button />
        </div>
      </div>
    </>
  )
}

export default App
