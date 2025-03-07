import './index.css'
import { Button } from './components/ui/button'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold text-red-500'>Hello World</h1>
        <Button onClick={() => alert('Button clicked')}>Click me</Button>
      </div>
    </ThemeProvider>
  )
}

export default App
