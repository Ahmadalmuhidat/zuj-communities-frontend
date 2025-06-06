import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Post_Card from '@/Shared_Components/post/Post_Card';
import { useEffect, useState } from 'react';
import Axios_Client from '@/config/axios';

interface Post {
  ID: string;
  Content: string;
  Image: string,
  Likes: string;
  Comments: string,
  User: string,
  User_Name: string,
  User_Image: string
};

export default function HomeContainer() {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const get_posts = async () => {
    try {
      const res = await Axios_Client.get("/posts/get_all_posts", {
        params: {
          token: localStorage.getItem("token")
        }
      });

      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    get_posts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {posts.map((post) => (
          <Post_Card key={post.ID} post={post} />
        ))}
      </div>
    </div>
  );
}
