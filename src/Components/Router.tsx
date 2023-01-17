import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LocalPosts from "./Pages/LocalPosts";
import PostAdder from "./Pages/PostAdder";
import PublicPosts from "./Pages/PublicPosts";

const loadedLocalPosts = JSON.parse(localStorage.getItem('localPosts')) || {posts: []};

export default function Router(){
    const [localPosts, setLocalPosts] = useState<any>(loadedLocalPosts);
    console.log("rendering router");

    useEffect(() => {
        localStorage.setItem('localPosts', JSON.stringify(localPosts));
    }, [localPosts]);

    const toggleLike = (index) => {
        let localPostsCopy = {...localPosts};
        localPostsCopy.posts[index].likedByUser = !localPostsCopy.posts[index].likedByUser;
        localPostsCopy.posts[index].likes += localPostsCopy.posts[index].likedByUser ? 1 : -1;
        setLocalPosts(localPostsCopy);
    }

    const deletePost = (index) => {
        let localPostsCopy = {...localPosts};
        console.log('deleting: ', localPostsCopy.posts[index], 'from: ', localPostsCopy);
        
        localPostsCopy.posts.splice(index, 1);
        setLocalPosts(localPostsCopy);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Navigate to='/ghalaba-instagram/public'/>} path='/'/>
                <Route element={<PublicPosts />} path='/ghalaba-instagram/public' />
                <Route element={<LocalPosts deletePost={(i) => deletePost(i)} localPosts={localPosts} setLocalPosts={setLocalPosts} toggleLike={toggleLike} />} path='/local' />
                <Route element={<PostAdder localPosts={localPosts} setLocalPosts={setLocalPosts} />}path='/add-post'/>
            </Routes>
        </BrowserRouter>
    )
}