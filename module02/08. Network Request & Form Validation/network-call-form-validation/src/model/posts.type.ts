export default interface IPost {
	objectId: number;
	title: string;
	body: string;
}

export type TCreatePost = Omit<IPost, "objectId">;
export type TUpdatePost = Partial<TCreatePost>;
