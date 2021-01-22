import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entitiy';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    // @Get("search")
    // search(@Query("year") movieYear: string){
    //     return `We are searching for a ${movieYear} year of movie`;
    // }

    @Get("/:id")
    getOne(@Param("id") id: string): Movie {
        return this.moviesService.getOne(id)
    }

    @Post()
    create(@Body() movieData){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id") 
    remove(@Param("id") movieId: string) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch("/:id")
    patch(@Param("id") movieId: string, @Body() updateData){
        return {
            updateMovie: movieId,
            ...updateData,
        }
    }
}
