import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { movieController } from './MovieController'
import { MovieType } from './MovieType'
import { notifyError } from './notification/Notification'
import ReIndexModal from './ReIndexModal'
import { useDisclosure } from '@nextui-org/react'

export interface IMovieProps extends React.ComponentPropsWithoutRef<'div'> {}

let page = 1
const LIMIT = 20

export default function Movie({}: IMovieProps) {
  const [movies, setMovies] = useState<MovieType[]>([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    initComponent()
  }, [])

  async function initComponent(): Promise<void> {
    listennerEvents()
    await listMoviesByPagination(page)
  }

  async function listMoviesByPagination(page: number): Promise<void> {
    const { data, error } = await movieController.listMoviesByPagination(page, LIMIT)

    if (error) {
      notifyError(error.message)
    } else {
      if (page <= 1) {
        setMovies(() => [])
        setMovies(() => data)
      } else {
        setMovies((prevValues) => [...prevValues, ...data])
      }
    }
  }

  async function listennerEvents(): Promise<void> {
    if (window) {
      window.addEventListener('re-index-movie', async () => {
        await listMoviesByPagination(1)
      })

      window.addEventListener('scroll', () => {
        const documentHeight = document.documentElement.scrollHeight

        const scrollTop = window.scrollY

        const windowHeight = window.innerHeight

        if (scrollTop + windowHeight >= documentHeight - 100) {
          page++
          listMoviesByPagination(page)
        }
      })
    }
  }
  return (
    <>
      <div className="px-2 md:px-0 mt-2">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-5xl font-semibold cursor-pointer">Movies</h1>
          <span className="text-2xl">
            <i className="icon-settings cursor-pointer" onClick={onOpen}></i>
          </span>
        </div>
        {movies && movies.length > 0 && (
          <div className="pt-4 grid grid-cols-2 md:grid-cols-5 gap-x-3 md:gap-x-4 md:gap-y-5">
            {movies.map((movie: any, idx: any) => (
              <MovieCard movie={movie} key={idx} id={`movie-${movie.movieID}`} />
            ))}
          </div>
        )}
      </div>
      <ReIndexModal isOpen={isOpen} onOpenChange={onClose} />
    </>
  )
}
