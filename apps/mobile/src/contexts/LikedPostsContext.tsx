import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

/**
 * Post data that can be liked
 */
export interface LikedPost {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  images: string[];
  likedBy: string;
  caption: {
    username: string;
    text: string;
    hashtags?: string[];
  };
  commentCount: number;
}

/**
 * Liked posts context state
 */
interface LikedPostsContextState {
  likedPosts: LikedPost[];
  isLiked: (postId: string) => boolean;
  toggleLike: (post: LikedPost) => void;
  likePost: (post: LikedPost) => void;
  unlikePost: (postId: string) => void;
}

const LikedPostsContext = createContext<LikedPostsContextState | undefined>(undefined);

interface LikedPostsProviderProps {
  children: ReactNode;
}

/**
 * Liked Posts Provider
 *
 * Manages the state of liked posts throughout the app.
 * Posts that are liked appear in the Liked screen.
 */
export function LikedPostsProvider({ children }: LikedPostsProviderProps) {
  const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);

  const isLiked = useCallback(
    (postId: string) => {
      return likedPosts.some(post => post.id === postId);
    },
    [likedPosts]
  );

  const likePost = useCallback((post: LikedPost) => {
    setLikedPosts(prev => {
      if (prev.some(p => p.id === post.id)) {
        return prev;
      }
      return [...prev, post];
    });
  }, []);

  const unlikePost = useCallback((postId: string) => {
    setLikedPosts(prev => prev.filter(post => post.id !== postId));
  }, []);

  const toggleLike = useCallback(
    (post: LikedPost) => {
      if (isLiked(post.id)) {
        unlikePost(post.id);
      } else {
        likePost(post);
      }
    },
    [isLiked, likePost, unlikePost]
  );

  return (
    <LikedPostsContext.Provider
      value={{
        likedPosts,
        isLiked,
        toggleLike,
        likePost,
        unlikePost,
      }}
    >
      {children}
    </LikedPostsContext.Provider>
  );
}

/**
 * Hook to access liked posts functionality
 *
 * @example
 * const { likedPosts, toggleLike, isLiked } = useLikedPosts();
 * toggleLike(post);
 */
export function useLikedPosts() {
  const context = useContext(LikedPostsContext);
  if (context === undefined) {
    throw new Error('useLikedPosts must be used within a LikedPostsProvider');
  }
  return context;
}
