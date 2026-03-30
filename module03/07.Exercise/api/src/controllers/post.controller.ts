import { NextFunction, Request, Response } from "express";
import { responseBuilder } from "../utils/response.helper";
import { appErrorHandler } from "../errors/handlers/app.error.handler";
import AppError from "../errors/app.error";
import postService from "../services/post.service";
import redisClient from "../libs/redis";

export default new (class PostController {
	private postService = postService;
	private cacheKey = "posts_cache"; // Example cache key
	private cacheTTL = 3600; // Cache time-to-live in seconds (1 hour)

	getAllPostsPaginated = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { page, show } = req.query;
			const paginatedCacheKey = `${this.cacheKey}_page_${page || 0}_show_${
				show || 10
			}`;
			const cachedData = await redisClient.get(paginatedCacheKey);
			if (cachedData) {
				return res.send(
					responseBuilder(200, "Success! (from cache)", JSON.parse(cachedData))
				);
			}
			const { posts, totalPages } = await this.postService.getAllPostsPaginated(
				req
			);
			await redisClient.setEx(
				paginatedCacheKey,
				this.cacheTTL,
				JSON.stringify({ posts, totalPages })
			);
			return res.send(
				responseBuilder(200, "Success!", {
					posts,
					meta: {
						page: Number(page) || 0,
						show: Number(show) || 10,
						totalPages,
					},
				})
			);
		} catch (error) {
			appErrorHandler(error, next);
		}
	};

	getAllPostsByAuthorIdPaginated = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { page, show } = req.query;
			const { posts, totalPages } =
				await this.postService.getAllPostsByAuthorId(req);
			return res.send(
				responseBuilder(200, "Success!", {
					posts,
					meta: {
						page: Number(page) || 0,
						show: Number(show) || 10,
						totalPages,
					},
				})
			);
		} catch (error) {
			appErrorHandler(error, next);
		}
	};

	getPostById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const post = await this.postService.getPostById(req);
			if (!post) {
				return res
					.status(404)
					.send(
						responseBuilder(404, `Post ID: ${req.params.id} not found`, null)
					);
			}
			return res.send(responseBuilder(200, "Success!", post));
		} catch (error) {
			appErrorHandler(error, next);
		}
	};

	createPost = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const newPost = await this.postService.createPost(req);
			return res
				.status(201)
				.send(responseBuilder(201, "Post created successfully", newPost));
		} catch (error) {
			appErrorHandler(error, next);
		}
	};

	updatePost = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const updatedPost = await this.postService.updatePost(req);
			if (!updatedPost) {
				throw new AppError(`Post ID: ${req.params.id} not found`, 404);
			}
			return res.send(
				responseBuilder(200, "Post updated successfully", updatedPost)
			);
		} catch (error) {
			appErrorHandler(error, next);
		}
	};

	deletePost = async (req: Request, res: Response, next: NextFunction) => {
		try {
			await this.postService.deletePost(req);
			return res.send(
				responseBuilder(
					200,
					`Post ID: ${req.params.id} deleted successfully`,
					null
				)
			);
		} catch (error) {
			appErrorHandler(error, next);
		}
	};
})();
