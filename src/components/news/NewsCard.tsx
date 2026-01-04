import { useState } from 'react';
import type { NewsItem } from '../../types';
import { CommentSection } from './CommentSection';
import styles from './NewsCard.module.css';

interface NewsCardProps {
    data: NewsItem;
}

export const NewsCard = ({ data }: NewsCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(data.likes);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: data.title,
                    text: data.summary,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert('공유 기능을 지원하지 않는 환경입니다.');
        }
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className={`${styles.card} ${isOpen ? styles.open : ''}`}>
            <div className={styles.press}>{data.press}</div>
            <div className={styles.title}>{data.title}</div>
            <div className={styles.content}>{data.summary}</div>
            
            <div className={styles.actions}>
                <div 
                    className={`${styles.action} ${isLiked ? styles.liked : ''}`} 
                    onClick={toggleLike}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{likeCount}</span>
                </div>
                <div 
                    className={styles.action} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    <span>{data.comments.length}</span>
                </div>
                <div className={`${styles.action}`} onClick={handleShare}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span>SHARE</span>
                </div>
                <div 
                    className={styles.toggle} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? 'LESS -' : 'MORE +'}
                </div>
            </div>

            {isOpen && <CommentSection comments={data.comments} />}
        </div>
    );
};
