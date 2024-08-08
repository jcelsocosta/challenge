import { Card, CardFooter, CardBody, Image } from '@nextui-org/react'
import { MovieType } from './MovieType'
import moment from 'moment'

export interface IMovieCardProps extends React.ComponentPropsWithoutRef<'div'> {
  movie: MovieType
}

export default function MovieCard({ movie, id }: IMovieCardProps) {
  return (
    <Card id={id} shadow="none" className="p-0 m-0 h-[300px]">
      <CardBody className="overflow-visible p-0 h-[200px]">
        <Image
          alt="Card background"
          shadow="sm"
          radius="sm"
          className="w-[250px] object-cover h-[200px] rounded-b-none"
          src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movie.posterPath}`}
        />
      </CardBody>
      <CardFooter className="text-small flex-col items-start">
        <p className="text-tiny uppercase font-bold">{movie.title}</p>
        <p className="flex items-center gap-x-1">
          <i className="icon-calendar" />
          <span> {moment(movie.realeaseDate).format('LL')}</span>
        </p>

        <p className="flex gap-x-1 items-center">
          <i className="icon-tv" />
          <span>{movie.populatiry}</span>
        </p>

        <p className="flex items-center gap-x-1">
          <span className={`${movie.voteAverage <= 0 ? 'invisible' : 'visible'} flex gap-x-1 items-center`}>
            <span className="text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {Math.ceil(movie.voteAverage)}
          </span>
        </p>
      </CardFooter>
    </Card>
  )
}
