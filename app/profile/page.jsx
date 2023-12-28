'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        //console.log(response)
        //console.log("hello")
        const data = await response.json();
    
          setPosts(data);
          setMyPosts(data);
        }
        if(session?.user.id) fetchPosts();
    }, []);

  const handleEdit = (posts) => {
    router.push(`/update-prompt?id=${posts._id}`);

    }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        // FETCH THE DELETE API
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        // get current posts after deleting
        const filteredPosts = myPosts.filter((p) => p._id !== post._id);

        setMyPosts(filteredPosts);

      } catch (error) {
        console.log(error)
      }
    }

    }
  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile