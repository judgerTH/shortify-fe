import type { Comment } from '../../types';
import styles from './NewsCard.module.css';

interface CommentSectionProps {
    comments: Comment[];
}

export const CommentSection = ({ comments }: CommentSectionProps) => {
    return (
        <div className={styles.comments}>
            <div className={styles.commentsHeader}>댓글 {comments.length}개</div>
            <div className={styles.commentList}>
                {comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                        <span className={styles.commentAuthor}>{comment.author}</span>
                        {comment.content}
                    </div>
                ))}
            </div>
            <div className={styles.form}>
                <input className={styles.input} placeholder="댓글을 남겨주세요..." />
                <button className={styles.button}>등록</button>
            </div>
        </div>
    );
};
