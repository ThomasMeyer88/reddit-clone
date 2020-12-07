import { User } from './user';

export class Vote {
    // Vote: { Up/Down(Boolean), User, Post/Comment }
    poster: User;
    vote: boolean;
}