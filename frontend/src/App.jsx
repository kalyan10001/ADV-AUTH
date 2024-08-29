import FloatingShape from "./components/FloatingShape.jsx"

function App() {
  return (
    <div
			className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'>
      			<FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
    </div>
  )
}

export default App;
