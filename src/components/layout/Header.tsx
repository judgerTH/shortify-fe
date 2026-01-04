import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.brand}>세상읽기.</div>
        <div className={styles.controls}>
            <select className={styles.select}>
                <option>최근 2시간</option>
                <option>최근 4시간</option>
                <option>오늘</option>
            </select>
            <select className={styles.select}>
                <option>전체 언론사</option>
                <option>연합뉴스</option>
                <option>뉴스1</option>
                <option>중앙일보</option>
                <option>조선비즈</option>
            </select>
        </div>
      </div>
      <div className={styles.onair}>
        <span className={styles.active}>● 기사 수집중</span>
        <span>● AI 요약중</span>
        <span>● 기사 배포</span>
      </div>
    </header>
  );
};
