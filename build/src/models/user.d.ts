import { Model } from 'sequelize';
declare class User extends Model {
    id: number;
    username: string;
    name: string;
    passwordHash: string;
    isLoggedIn: boolean;
}
export default User;
//# sourceMappingURL=user.d.ts.map