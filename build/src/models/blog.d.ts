import { Model } from 'sequelize';
declare class Blog extends Model {
    id: number;
    author?: string;
    url: string;
    title: string;
    likes?: number;
    userId: number;
}
export default Blog;
//# sourceMappingURL=blog.d.ts.map