import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entitiy';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';

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
    getOne(@Param("id") id: number): Movie {
        //console.log(typeof(id));
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDTO){
        return this.moviesService.create(movieData);
    }

    @Delete("/:id") 
    remove(@Param("id") movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch("/:id")
    patch(@Param("id") movieId: number, @Body() updateData: UpdateMovieDTO){
        return this.moviesService.update(movieId, updateData);
    }
}
