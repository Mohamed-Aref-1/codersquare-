export interface user{
    id: string;
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
}

export interface post{
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: string;
}

export interface like{
    postId: string;
    userId: string;
    likedAt: string;
}

export interface comment  {
    id: string;
    postId: string;
    userId: string;
    comment: string;
    commentedAt: string;
}
