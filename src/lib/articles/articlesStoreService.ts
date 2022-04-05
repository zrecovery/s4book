import Dexie, { type Table } from 'dexie';
import type { Article, IArticleStoreService } from './articles';

//判断是否包含全部关键词
function isContentIncludeKeywords(keywords: string[]): (article: Article) => boolean {
    return function (article: Article) {
        const content = article.content;
        let res = keywords
            .map(keyword => { return content.indexOf(keyword) })
            .indexOf(-1)
        return res === -1;
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

export class ArticlesDBStoreService implements IArticleStoreService {
    getArticleByID(id: number): Promise<Article> {
        return articlesDBStore.articles.get(id);
    }

    getArticles(limit: number, offset: number, keywords?: string[]): Promise<Article[]> {
        let isArticlesIncludeKeywords = isContentIncludeKeywords(keywords);
        return articlesDBStore
            .articles
            .filter(isArticlesIncludeKeywords)
            .offset(offset)
            .limit(limit)
            .toArray();
    }
    countArticles(keywords?: string[]): Promise<number> {
        let isArticlesIncludeKeywords = isContentIncludeKeywords(keywords);
        return articlesDBStore
            .articles
            .filter(isArticlesIncludeKeywords)
            .count();
    }
    addArticles(articles: Article[]): Promise<number> {
        return articlesDBStore
            .articles
            .bulkAdd(articles)
            .then(data => { return articles.length })
    }
    updateArticle(id: number, article: Article): Promise<number> {
        throw new Error('Method not implemented.');
    }
    deleteArticle(id: number): Promise<number> {
        return articlesDBStore.articles
            .delete(id)
            .then(()=>{return id})
    }

}


export const articlesDBStoreService = new ArticlesDBStoreService();