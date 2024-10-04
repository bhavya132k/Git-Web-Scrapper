import { Schema, model } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    age: number;
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true }
});

const User = model<IUser>('User', userSchema);

export default User;
