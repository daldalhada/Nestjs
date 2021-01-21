import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return "This will return all movies";
    }

    @Get("search")
    search(@Query("year") movieYear: string){
        return `We are searching for a ${movieYear} year of movie`;
    }

    @Get("/:id")
    getOne(@Param("id") id: string) {
        return `This will return one movies of ${id}`;
    }

    @Post()
    create(@Body() movieData){
        console.log(movieData);
        return movieData;
    }

    @Delete("/:id") 
    remove(@Param("id") movieId: string) {
        return `This will remove a movie of ${movieId}`;
    }

    @Patch("/:id")
    patch(@Param("id") movieId: string, @Body() updateData){
        return {
            updateMovie: movieId,
            ...updateData,
        }
    }
}
