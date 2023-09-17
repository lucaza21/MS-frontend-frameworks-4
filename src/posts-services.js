import { posts } from '../data'

export function getPosts() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(posts);
        }, 2000)
    });
}