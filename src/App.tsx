import './App.css'
import Autocomplete from './components/autocomplete/Autocomplete'
import movieList from './data.json'

const movies: string[] = movieList.movies.map((movie: { title: string }) => movie.title)

function App() {

  return (
    <>
      <h1>Autocomplete Demo</h1>
      <Autocomplete suggestions={movies} onSelected={(value) => console.log(value)} />
    </>
  )
}

export default App
