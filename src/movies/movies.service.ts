import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entitiy';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

        getAll(): Movie[] {
            return this.movies;
        }

        getOne(id: number): Movie {
            const movie = this.movies.find(movie => movie.id === id);     // +id == parseInt(id)
            if(!movie) {
                throw new NotFoundException(`Movie with ID ${id} not found.`);
            }
            return movie;
        }

        deleteOne(id: number) {
            this.getOne(id);
            this.movies = this.movies.filter(movie => movie.id !== id);
        }

        create(movieData: CreateMovieDTO){
            this.movies.push({
                id: this.movies.length + 1,
                ...movieData,
            })
        }

        update(id: number, updateData: UpdateMovieDTO) {
            const movie = this.getOne(id);
            this.deleteOne(id);
            this.movies.push({...movie, ...updateData})
        }
}
