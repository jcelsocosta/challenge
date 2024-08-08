import { Card, CardFooter, CardBody, Image } from '@nextui-org/react'
import { MovieType } from './MovieType'

export interface IMovieCardProps extends React.ComponentPropsWithoutRef<'div'> {
  movie: MovieType
}

export default function MovieCard({ movie, id }: IMovieCardProps) {
  return (
    <Card id={id} shadow="none" className="p-0 m-0">
      <CardBody className="overflow-visible p-0">
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
        <small className="text-default-500">{movie.realeaseDate}</small>
      </CardFooter>
    </Card>
  )
}
