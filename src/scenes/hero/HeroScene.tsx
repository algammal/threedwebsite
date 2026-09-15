import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./HeroScene.module.css";

gsap.registerPlugin(ScrollTrigger);

function HeroScene() {
  const sceneRef = useRef<HTMLElement>(null);

  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const chapterTwoRef = useRef<HTMLDivElement>(null);
  const chapterThreeRef = useRef<HTMLDivElement>(null);
  const chapterFourRef = useRef<HTMLDivElement>(null);

  const indicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
  const scene = sceneRef.current;

  if (!scene) return;

  const context = gsap.context(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const video = videoRef.current;

    const chapterTwo = chapterTwoRef.current;
    const chapterThree = chapterThreeRef.current;
    const chapterFour = chapterFourRef.current;

    const indicator = indicatorRef.current;

    /*
     * ----------------------------------------
     * INITIAL CHAPTER STATE
     * ----------------------------------------
     */

    gsap.set([chapterTwo, chapterThree, chapterFour], {
      opacity: 0,
      y: 40,
      pointerEvents: "none",
    });

    /*
     * ----------------------------------------
     * INTRO ANIMATION
     * ----------------------------------------
     */

    const animateIntro = () => {
      if (!title || !subtitle) return;

      gsap.killTweensOf([title, subtitle]);

      const introTimeline = gsap.timeline();

      introTimeline
        .fromTo(
          title,
          {
            opacity: 0,
            y: 20,
            letterSpacing: "0.35em",
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.18em",
            filter: "blur(0px)",
            duration: 0.7,
            ease: "power3.out",
          },
        )
        .fromTo(
          subtitle,
          {
            opacity: 0,
            y: 15,
            letterSpacing: "0.3em",
            filter: "blur(6px)",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.18em",
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.4",
        );
    };
    const hideIntro = () => {
  if (!title || !subtitle) return;

  gsap.killTweensOf([title, subtitle]);

  gsap.to([title, subtitle], {
    opacity: 0,
    y: -50,
    filter: "blur(10px)",
    duration: 0.35,
    ease: "power2.inOut",
  });
};

    /*
     * ----------------------------------------
     * INITIAL INTRO
     * ----------------------------------------
     */

    animateIntro();

    /*
     * ----------------------------------------
     * CHAPTER TRACKING
     * ----------------------------------------
     */

    let previousChapter = 0;

    /*
     * ----------------------------------------
     * CINEMATIC SCROLL TIMELINE
     * ----------------------------------------
     */

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scene,
        start: "top top",
        end: "+=3200",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

       onUpdate: (self) => {
  if (!indicator) return;

  const chapters =
    indicator.querySelectorAll<HTMLElement>(
      "[data-chapter]",
    );

  const progress = self.progress;

  let activeIndex = 0;

  if (progress >= 0.75) {
    activeIndex = 3;
  } else if (progress >= 0.5) {
    activeIndex = 2;
  } else if (progress >= 0.25) {
    activeIndex = 1;
  }

  chapters.forEach((chapter, index) => {
    chapter.classList.toggle(
      styles.activeChapter,
      index === activeIndex,
    );
  });

  /*
   * Entering Chapter 01
   */
  if (
    activeIndex === 0 &&
    previousChapter !== 0 &&
    self.direction === -1
  ) {
    animateIntro();
  }

  /*
   * Leaving Chapter 01
   */
  if (
    previousChapter === 0 &&
    activeIndex !== 0 &&
    self.direction === 1
  ) {
    hideIntro();
  }

  previousChapter = activeIndex;
},
      },
    });

    /*
     * ----------------------------------------
     * CHAPTER 01 → CHAPTER 02
     * ----------------------------------------
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
          opacity: 0.8,
          duration: 1.2,
          ease: "power2.inOut",
        },
        1,
      );

    /*
     * ----------------------------------------
     * CHAPTER 02
     * ----------------------------------------
     */

    timeline
      .to(
        chapterTwo,
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
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
     * ----------------------------------------
     * CHAPTER 02 → CHAPTER 03
     * ----------------------------------------
     */

    timeline
      .to(
        chapterTwo,
        {
          opacity: 0,
          y: -30,
          pointerEvents: "none",
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
          pointerEvents: "auto",
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
     * ----------------------------------------
     * CHAPTER 03 → CHAPTER 04
     * ----------------------------------------
     */

    timeline
      .to(
        chapterThree,
        {
          opacity: 0,
          y: -30,
          pointerEvents: "none",
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
          pointerEvents: "auto",
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
     * ----------------------------------------
     * VIDEO PLAYBACK
     * ----------------------------------------
     */

    if (video) {
      video.play().catch(() => {
        // Browser may block autoplay until interaction.
      });
    }
  }, scene);

  return () => {
    context.revert();
  };
}, []);

  return (
    <section ref={sceneRef} className={styles.scene}>
      <div className={styles.homeContainer}>
        {/* ----------------------------------------
            CHAPTER 01 — INTRO
        ---------------------------------------- */}

        <div className={styles.leftSide}>
          <div>
            <p ref={titleRef} className={styles.title}>
              NOIRÉ
            </p>

            <p ref={subtitleRef} className={styles.subtitle}>
              THE ART OF WEARING DIFFERENT
            </p>
          </div>
        </div>

        {/* ----------------------------------------
            CENTER VIDEO
        ---------------------------------------- */}

        <div className={styles.center}>
          <div className={styles.spot} />

          <video
            ref={videoRef}
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

        {/* ----------------------------------------
            CHAPTER 02 — THE SILHOUETTE
        ---------------------------------------- */}

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

        {/* ----------------------------------------
            CHAPTER 03 — THE COLLECTION
        ---------------------------------------- */}

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

        {/* ----------------------------------------
            CHAPTER 04 — THE STATEMENT
        ---------------------------------------- */}

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

        {/* ----------------------------------------
            CHAPTER INDICATOR
        ---------------------------------------- */}

        <div ref={indicatorRef} className={styles.indicator}>
          <span data-chapter className={styles.activeChapter}>
            01
          </span>

          <span data-chapter>02</span>

          <span data-chapter>03</span>

          <span data-chapter>04</span>
        </div>

        {/* ----------------------------------------
            SCROLL HINT
        ---------------------------------------- */}

        <div className={styles.scrollHint}>
          <span>SCROLL</span>

          <span className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}

export default HeroScene;