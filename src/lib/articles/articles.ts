export class BaseArticle {
	id?: number;
	title: string;
	author: string;
	book: string;
	serial: number;
	constructor(title: string, author: string, book: string, serial: number, id?: number) {
		this.title = title;
		this.author = author;
		this.book = book;
		this.serial = serial;
		if (id) this.id = id;
	}
}
export class Article extends BaseArticle {
	content: string;
	constructor(
		title: string,
		author: string,
		book: string,
		serial: number,
		content: string,
		id?: number
	) {
		super(title, author, book, serial, id);
		this.content = content;
	}
}

export interface IArticleStoreService {
	getArticleByID(id: number): Promise<Article>;
	getArticles(limit: number, offset: number, keywords?: string[]): Promise<Article[]>;
	countArticles(keywords?: string[]): Promise<number>;
	addArticles(articles: Article[]): Promise<number>;
	updateArticle(id: number, article: Article): Promise<number>;
	deleteArticle(id: number): Promise<number>;
}
