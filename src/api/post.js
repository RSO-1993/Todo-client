import axios from 'axios'

axios.defaults.withCredentials = true

export async function onCreatePost(createPostData) {
    return await axios.post(
        'http://localhost:8000/api/posts',
        createPostData
    )
}

export async function onCompletedPost(completedPostId, completedPostData) {
    return await axios.post(
        `http://localhost:8000/api/posts/${completedPostId}`,
        completedPostData
    )
}

export async function onGetPosts(getPostsData) {
    return await axios.get(
        'http://localhost:8000/api/posts',
        getPostsData
    )
}

export async function onGetPost(getPostId) {
    return await axios.get(
        `http://localhost:8000/api/posts/${getPostId}`
    )
}

export async function onUpdatePost(updatePostId, updatePostData) {
    return await axios.put(
        `http://localhost:8000/api/posts/${updatePostId}`,
        updatePostData
    )
}

export async function onDeletePost(deletePostId) {
    return await axios.delete(
        `http://localhost:8000/api/posts/${deletePostId}`
    )
}