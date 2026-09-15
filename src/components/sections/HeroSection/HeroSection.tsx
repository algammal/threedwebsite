import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./HeroSection.module.css";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  const chapterTwoRef = useRef<HTMLDivElement>(null);
  const chapterThreeRef = useRef<HTMLDivElement>(null);
  const chapterFourRef = useRef<HTMLDivElement>(null);

  const indicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    const chapterTwo = chapterTwoRef.current;
    const chapterThree = chapterThreeRef.current;
    const chapterFour = chapterFourRef.current;

    const indicator = indicatorRef.current;

    const context = gsap.context(() => {
      /*
       * Initial state
       */
      gsap.set([chapterTwo, chapterThree, chapterFour], {
        opacity: 0,
        y: 40,
        pointerEvents: "none",
      });

      /*
       * Main cinematic scroll timeline
       */
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * CHAPTER 01
       *
       * Existing hero slowly exits.
       */
      timeline
        .to(
          [title, subtitle],
          {
            opacity: 0,
            y: -50,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.inOut",
          },
          1,
        )
        .to(
          video,
          {
            scale: 1.08,
            y: -30,
            opacity: 0.75,
            duration: 1.2,
            ease: "power2.inOut",
          },
          1,
        );

      /*
       * CHAPTER 02
       */
      timeline
        .to(
          chapterTwo,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          2,
        )
        .to(
          video,
          {
            x: 100,
            scale: 1.15,
            duration: 1.2,
            ease: "power2.inOut",
          },
          2,
        );

      /*
       * CHAPTER 03
       */
      timeline
        .to(
          chapterTwo,
          {
            opacity: 0,
            y: -30,
            duration: 0.6,
            ease: "power2.in",
          },
          3,
        )
        .to(
          chapterThree,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          3.2,
        )
        .to(
          video,
          {
            x: -100,
            scale: 1.2,
            duration: 1.2,
            ease: "power2.inOut",
          },
          3.2,
        );

      /*
       * CHAPTER 04
       */
      timeline
        .to(
          chapterThree,
          {
            opacity: 0,
            y: -30,
            duration: 0.6,
            ease: "power2.in",
          },
          4,
        )
        .to(
          chapterFour,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          4.2,
        )
        .to(
          video,
          {
            scale: 1.3,
            opacity: 0.25,
            y: -80,
            duration: 1.2,
            ease: "power2.inOut",
          },
          4.2,
        );

      /*
       * Chapter indicator
       */
      if (indicator) {
        const chapters = indicator.querySelectorAll("[data-chapter]");

        timeline.call(
          () => {
            chapters.forEach((chapter) =>
              chapter.classList.remove(styles.activeChapter),
            );

            chapters[0]?.classList.add(styles.activeChapter);
          },
          [],
          0,
        );

        timeline.call(
          () => {
            chapters.forEach((chapter) =>
              chapter.classList.remove(styles.activeChapter),
            );

            chapters[1]?.classList.add(styles.activeChapter);
          },
          [],
          2,
        );

        timeline.call(
          () => {
            chapters.forEach((chapter) =>
              chapter.classList.remove(styles.activeChapter),
            );

            chapters[2]?.classList.add(styles.activeChapter);
          },
          [],
          3.2,
        );

        timeline.call(
          () => {
            chapters.forEach((chapter) =>
              chapter.classList.remove(styles.activeChapter),
            );

            chapters[3]?.classList.add(styles.activeChapter);
          },
          [],
          4.2,
        );
      }

      /*
       * Make sure video stays playing.
       */
      if (video) {
        video.play().catch(() => {
          // Browser may block autoplay until interaction.
        });
      }
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.backgroundGlow} />

      <video
        ref={videoRef}
        className={styles.heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/your-video.mp4" type="video/mp4" />
      </video>

      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.title}>
          NOIRÉ
        </h1>

        <h2 ref={subtitleRef} className={styles.subtitle}>
          THE ART OF WEARING DIFFERENT
        </h2>
      </div>

      <div
        ref={chapterTwoRef}
        className={`${styles.chapter} ${styles.chapterTwo}`}
      >
        <span className={styles.chapterNumber}>02</span>

        <h2>
          THE
          <br />
          SILHOUETTE
        </h2>

        <p>FORM WITHOUT PERMISSION.</p>
      </div>

      <div
        ref={chapterThreeRef}
        className={`${styles.chapter} ${styles.chapterThree}`}
      >
        <span className={styles.chapterNumber}>03</span>

        <h2>
          THE
          <br />
          COLLECTION
        </h2>

        <p>CURATED FOR THOSE WHO DIFFER.</p>
      </div>

      <div
        ref={chapterFourRef}
        className={`${styles.chapter} ${styles.chapterFour}`}
      >
        <span className={styles.chapterNumber}>04</span>

        <h2>
          WEAR
          <br />
          DIFFERENT.
        </h2>

        <p>NOIRÉ</p>
      </div>

      <div ref={indicatorRef} className={styles.indicator}>
        <span data-chapter className={styles.activeChapter}>
          01
        </span>

        <span data-chapter>02</span>
        <span data-chapter>03</span>
        <span data-chapter>04</span>
      </div>

      <div className={styles.scrollHint}>
        <span>SCROLL</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}

export default HeroSection;