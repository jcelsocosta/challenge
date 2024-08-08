import { Route, Routes } from 'react-router-dom'
import LayoutPrimary from './layouts/LayoutPrimary'
import Movie from './components/Movie'

function App() {
  return (
    <>
      <Routes>
        <Route element={<LayoutPrimary justify="items-start" />}>
          <Route path="/" element={<Movie />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
