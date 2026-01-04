import { ReactNode } from 'react';
import styles from './TimeGroup.module.css';

interface TimeGroupProps {
    time: string;
    children: ReactNode;
}

export const TimeGroup = ({ time, children }: TimeGroupProps) => {
    return (
        <section className={styles.group}>
            <div className={styles.title}>{time}</div>
            {children}
        </section>
    );
};
