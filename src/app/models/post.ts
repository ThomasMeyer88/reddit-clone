import { User } from './user';
import { Comment } from './comment';
import { Vote } from './vote';
import { Time } from '@angular/common';

export class Post {
    // Post: { User(Poster), Title, Body, Date/Time, Votes[], Comments[]}
    poster: User;
    title: String;
    body: String;
    dateTime: Time;
    votes: Vote[];
    comments: Comment[];
}