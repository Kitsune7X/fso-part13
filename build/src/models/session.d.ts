import { Model } from 'sequelize';
declare class Session extends Model {
    id: number;
    userId: number;
    token: string;
    isLoggedIn: boolean;
}
export default Session;
//# sourceMappingURL=session.d.ts.map