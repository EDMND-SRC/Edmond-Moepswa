"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
}

export const SubstackFeed = () => {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/substack');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#FF4D2E]"></div>
    </div>
  );

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center md:text-left">
        <div className="mb-14">
          <span className="text-[#FF4D2E] text-xs font-bold uppercase tracking-[0.2em]">// Latest Writing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mt-6 tracking-tight">Thoughts on design & products</h2>
          <p className="text-[#a3a3a3] mt-6 max-w-xl text-lg leading-relaxed mx-auto md:mx-0">Weekly insights on building better digital experiences, delivered via Substack.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.a
              key={post.link}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-[#111111] rounded-2xl p-8 border border-white/5 hover:border-[#FF4D2E]/40 transition-all duration-300 group cursor-pointer flex flex-col shadow-2xl"
            >
              <div className="mb-4 text-xs text-[#666] font-medium uppercase tracking-widest">
                {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <h3 className="text-white font-medium text-xl mb-4 leading-tight group-hover:text-[#FF4D2E] transition-colors">{post.title}</h3>
              <p className="text-[#a3a3a3] text-sm flex-1 leading-relaxed line-clamp-3">{post.contentSnippet}</p>
              <div className="mt-8 flex items-center gap-2 text-[#FF4D2E] text-sm font-bold group-hover:gap-3 transition-all">
                Read on Substack <span className="text-lg">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
