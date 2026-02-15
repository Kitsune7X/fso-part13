import { Model } from 'sequelize';
declare class Reading extends Model {
    id: number;
    userId: number;
    blogId: number;
    read: boolean;
}
export default Reading;
//# sourceMappingURL=reading.d.ts.map