import { useLayoutEffect, useRef } from "react";
import styles from "./HeroScene.module.css";
import gsap from "gsap";

function HeroScene() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!title && !subtitle) return;

    const context = gsap.context(() => {
      if (title) {
        gsap.fromTo(
          title,
          {
            opacity: 0,
            y: 30,
            letterSpacing: "0.5em",
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.18em",
            filter: "blur(0px)",
            duration: 1.8,
            ease: "power3.out",
          },
        );
      }

      if (subtitle) {
        gsap.fromTo(
          subtitle,
          {
            opacity: 0,
            y: 30,
            letterSpacing: "0.5em",
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.18em",
            filter: "blur(0px)",
            duration: 1.8,
            delay: 0.25,
            ease: "power3.out",
          },
        );
      }
    });

    return () => {
      context.revert();
    };
  }, []);
  return (
    <div>
      <div className={styles.homeContainer}>
        <div className={styles.leftSide}>
          <div>
            <p ref={titleRef} className={styles.title}>
              Loreiem
            </p>
            <p ref={subtitleRef} className={styles.subtitle}>
              Loreiem,epsio mmodel Test
            </p>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.spot}></div>
          <div>
            <video
              className={styles.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/videos/herovideo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className={styles.rightSide}></div>
      </div>
    </div>
  );
}

export default HeroScene;
