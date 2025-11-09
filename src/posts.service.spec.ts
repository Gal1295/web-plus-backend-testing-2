import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();
      expect(result).toHaveLength(4);
      expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2', 'Post 3', 'Post 4']);
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });
      expect(result).toHaveLength(2);
      expect(result.map(p => p.text)).toEqual(['Post 2', 'Post 3']);
    });

    // 🔹 Дополнительные важные кейсы:

    it('should return empty array when skip >= total posts', () => {
      const result = postsService.findMany({ skip: 5 });
      expect(result).toEqual([]);
    });

    it('should respect limit when skip is not provided', () => {
      const result = postsService.findMany({ limit: 2 });
      expect(result).toHaveLength(2);
      expect(result.map(p => p.text)).toEqual(['Post 1', 'Post 2']);
    });

    it('should return all remaining posts if limit is larger than available', () => {
      const result = postsService.findMany({ skip: 2, limit: 10 });
      expect(result).toHaveLength(2);
      expect(result.map(p => p.text)).toEqual(['Post 3', 'Post 4']);
    });

    it('should return empty array when no posts exist', () => {
      const emptyService = new PostsService();
      const result = emptyService.findMany();
      expect(result).toEqual([]);
    });

    it('should handle skip=0 and limit=0 correctly', () => {
      const result = postsService.findMany({ skip: 0, limit: 0 });
      expect(result).toEqual([]);
    });
  });
});
