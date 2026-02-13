import React, { useEffect, useState } from 'react';
import { FloatingHeart } from '../types';

const COLORS = ['text-pastel-pink', 'text-pastel-rose', 'text-pastel-lavender', 'text-pastel-blue', 'text-pastel-peach'];

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate static hearts on mount to avoid re-rendering flicker
    const newHearts: FloatingHeart[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 10}s`,
      animationDelay: `-${Math.random() * 20}s`, // Negative delay to start mid-animation
      size: `${1 + Math.random()}rem`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute bottom-[-50px] animate-float-up opacity-60 ${heart.color}`}
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
            fontSize: heart.size,
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;