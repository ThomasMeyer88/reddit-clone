import { User } from './user';
import { Post } from './post';
import { Vote } from './vote';
import { Time } from '@angular/common';

export class Comment {
    // Comments: { User(Poster), Body, Date/Time, Votes[], Comments[], Post/Comment}
    poster: User;
    body: string;
    date: Time;
    votes: Vote[];
    comments: Comment[];
}