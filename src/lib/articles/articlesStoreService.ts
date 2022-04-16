import Dexie, { type Table } from 'dexie';
import type { Article, ArticleStoreService } from './articles';

//判断是否包含全部关键词
function isArticleContentIncludeKeywords(keywords: string[]): (article: Article) => boolean {
	return function (article: Article) {
		const content = article.content;
		return !(keywords
			.map((keyword) => {
				return content.includes(keyword);
			})
			.includes(false));
	};
}

export class ArticlesDBStore extends Dexie {
	articles!: Table<Article>;

	constructor() {
		super('articles');
		this.version(2).stores({
			articles: '++id, title, author, book, serial, content' // Primary key and indexed props
		});
	}
}

export const articlesDBStore = new ArticlesDBStore();

export class ArticlesDBStoreService implements ArticleStoreService {
	getArticleByID(id: number): Promise<Article> {
		return articlesDBStore.articles.get(id);
	}

	getArticles(limit: number, offset: number, keywords?: string[]): Promise<Article[]> {
		let isArticlesIncludeKeywords = isArticleContentIncludeKeywords(keywords);
		return articlesDBStore.articles
			.orderBy('book')
			.filter(isArticlesIncludeKeywords)
			.offset(offset)
			.limit(limit)
			.toArray();
	}
	countArticles(keywords?: string[]): Promise<number> {
		let isArticlesIncludeKeywords = isArticleContentIncludeKeywords(keywords);
		return articlesDBStore.articles.filter(isArticlesIncludeKeywords).count();
	}
	addArticles(articles: Article[]): Promise<number> {
		return articlesDBStore.articles.bulkAdd(articles).then((data) => {
			return articles.length;
		});
	}
	updateArticle(id: number, article: Article): Promise<number> {
		return articlesDBStore.articles.update(id, article);
	}
	deleteArticle(id: number): Promise<number> {
		return articlesDBStore.articles.delete(id).then(() => {
			return id;
		});
	}
}

export const articlesDBStoreService = new ArticlesDBStoreService();
