import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <NavBar />
      <h1>DMIT2015 - Course Project | Home</h1>
    </div>
  );
}
