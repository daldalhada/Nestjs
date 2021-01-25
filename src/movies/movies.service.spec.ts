import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  describe("getAll", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({
        "title": "Test Movie",
        "genres": ["test"],
        "year": 2021,
      });

      service.create({
        "title": "Test Movie2",
        "genres": ["test2"],
        "year": 2021,
      });

      const movie = service.getOne(1);
      const movie2 = service.getOne(2);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie2.id).toEqual(2);
    });

    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    });
  });
});
