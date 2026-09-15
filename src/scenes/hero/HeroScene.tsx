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

  const cleanupFns: Array<() => void> = [];

  const context = gsap.context(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const video = videoRef.current;

    const chapterTwo = chapterTwoRef.current;
    const chapterThree = chapterThreeRef.current;
    const chapterFour = chapterFourRef.current;

    const indicator = indicatorRef.current;

    if (
      !title ||
      !subtitle ||
      !video ||
      !chapterTwo ||
      !chapterThree ||
      !chapterFour ||
      !indicator
    ) {
      return;
    }

    /*
     * ========================================
     * CHAPTER NAVIGATION TIMES
     * ========================================
     */

    const chapterNavigationTimes = [
      0,    // Chapter 01
      2.8,  // Chapter 02
      4.0,  // Chapter 03
      5.0,  // Chapter 04
    ];

    /*
     * ========================================
     * INTRO ANIMATION
     * ========================================
     */

    const animateIntro = () => {
      gsap.killTweensOf([title, subtitle]);

      gsap
        .timeline()
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

    /*
     * ========================================
     * INTRO HIDE
     * ========================================
     */

    const hideIntro = () => {
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
     * ========================================
     * INITIAL STATES
     * ========================================
     */

    gsap.set(title, {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    });

    gsap.set(subtitle, {
      opacity: 0,
      y: 15,
      filter: "blur(6px)",
    });

    gsap.set(chapterTwo, {
      opacity: 0,
      y: 40,
    });

    gsap.set(chapterThree, {
      opacity: 0,
      y: 40,
    });

    gsap.set(chapterFour, {
      opacity: 0,
      y: 40,
    });

    /*
     * ========================================
     * MAIN TIMELINE
     * ========================================
     *
     * Build the complete timeline first.
     * ScrollTrigger is created afterwards.
     */

    const timeline = gsap.timeline();

    /*
     * ========================================
     * CHAPTER 01
     * ========================================
     */

    timeline.to(
      title,
      {
        opacity: 1,
        duration: 0.1,
      },
      0,
    );

    timeline.to(
      subtitle,
      {
        opacity: 1,
        duration: 0.1,
      },
      0,
    );

    /*
     * ========================================
     * VIDEO — CHAPTER 01
     * ========================================
     */

    timeline.to(
      video,
      {
        scale: 1.08,
        y: -30,
        opacity: 0.8,
        duration: 1,
        ease: "power2.inOut",
      },
      1,
    );

    /*
     * ========================================
     * INTRO OUT
     * ========================================
     */

    timeline.to(
      [title, subtitle],
      {
        opacity: 0,
        y: -50,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power2.inOut",
      },
      1,
    );

    /*
     * ========================================
     * CHAPTER 02
     * ========================================
     */

    timeline.to(
      chapterTwo,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      2,
    );

    timeline.to(
      video,
      {
        x: 100,
        scale: 1.15,
        duration: 1,
        ease: "power2.inOut",
      },
      2,
    );

    /*
     * ========================================
     * CHAPTER 03
     * ========================================
     */

    timeline.to(
      chapterTwo,
      {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: "power2.inOut",
      },
      3,
    );

    timeline.to(
      chapterThree,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      3.2,
    );

    timeline.to(
      video,
      {
        x: -100,
        scale: 1.2,
        duration: 1,
        ease: "power2.inOut",
      },
      3.2,
    );

    /*
     * ========================================
     * CHAPTER 04
     * ========================================
     */

    timeline.to(
      chapterThree,
      {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: "power2.inOut",
      },
      4,
    );

    timeline.to(
      chapterFour,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      4.2,
    );

    timeline.to(
      video,
      {
        scale: 1.3,
        opacity: 0.25,
        y: -80,
        duration: 1,
        ease: "power2.inOut",
      },
      4.2,
    );

    /*
     * ========================================
     * CHAPTER STATE
     * ========================================
     */

    let currentChapter = -1;

    /*
     * ========================================
     * SCROLL TRIGGER
     * ========================================
     */

    const scrollTrigger = ScrollTrigger.create({
      trigger: scene,

      start: "top top",

      /*
       * Longer scroll distance gives the
       * cinematic animation more breathing room.
       */
      end: "+=6000",

      animation: timeline,

      scrub: true,

      pin: true,

      anticipatePin: 1,

      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const duration = timeline.duration();

        if (!duration) return;

        const progress = self.progress;

        /*
         * ------------------------------------
         * CONVERT SCROLL PROGRESS TO
         * TIMELINE TIME
         * ------------------------------------
         */

        const currentTime = progress * duration;

        /*
         * ------------------------------------
         * CHAPTER THRESHOLDS
         * ------------------------------------
         *
         * We use the midpoint between chapters
         * instead of exact positions.
         *
         * This prevents indicator flickering
         * around chapter boundaries.
         */

        const chapter2Threshold =
          (chapterNavigationTimes[0] +
            chapterNavigationTimes[1]) /
          2;

        const chapter3Threshold =
          (chapterNavigationTimes[1] +
            chapterNavigationTimes[2]) /
          2;

        const chapter4Threshold =
          (chapterNavigationTimes[2] +
            chapterNavigationTimes[3]) /
          2;

        let activeIndex = 0;

        if (currentTime >= chapter4Threshold) {
          activeIndex = 3;
        } else if (currentTime >= chapter3Threshold) {
          activeIndex = 2;
        } else if (currentTime >= chapter2Threshold) {
          activeIndex = 1;
        }

        /*
         * ------------------------------------
         * UPDATE INDICATOR
         * ------------------------------------
         */

        const chapters =
          indicator.querySelectorAll<HTMLButtonElement>(
            "[data-chapter]",
          );

        chapters.forEach((chapter, index) => {
          chapter.classList.toggle(
            styles.activeChapter,
            index === activeIndex,
          );
        });

        /*
         * ------------------------------------
         * CHAPTER CHANGED
         * ------------------------------------
         */

        if (activeIndex !== currentChapter) {
          /*
           * CHAPTER 01
           *
           * Re-show the intro whenever we
           * return to Chapter 01.
           */

          if (activeIndex === 0) {
            animateIntro();
          } else {
            /*
             * CHAPTER 02 / 03 / 04
             *
             * Make absolutely sure the intro
             * is hidden.
             */

            hideIntro();
          }

          currentChapter = activeIndex;
        }
      },
    });

    /*
     * ========================================
     * INITIAL INTRO
     * ========================================
     */

    animateIntro();

    /*
     * ========================================
     * CLICKABLE INDICATORS
     * ========================================
     */

    const chapters =
      indicator.querySelectorAll<HTMLButtonElement>(
        "[data-chapter]",
      );

    chapters.forEach((chapter) => {
      const handleClick = () => {
        const chapterIndex = Number(
          chapter.dataset.chapter,
        );

        const targetTime =
          chapterNavigationTimes[chapterIndex];

        if (targetTime === undefined) {
          return;
        }

        const duration = timeline.duration();

        if (!duration) {
          return;
        }

        /*
         * Convert timeline time into
         * normalized ScrollTrigger progress.
         */

        const targetProgress =
          targetTime / duration;

        /*
         * Convert progress into document
         * scroll position.
         */

        const targetScroll =
          scrollTrigger.start +
          (scrollTrigger.end -
            scrollTrigger.start) *
            targetProgress;

        /*
         * Navigate smoothly.
         */

        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });
      };

      chapter.addEventListener(
        "click",
        handleClick,
      );

      cleanupFns.push(() => {
        chapter.removeEventListener(
          "click",
          handleClick,
        );
      });
    });

    /*
     * ========================================
     * VIDEO PLAYBACK
     * ========================================
     */

    video.play().catch(() => {
      // Browser autoplay may be blocked.
    });
  }, scene);

  /*
   * ========================================
   * CLEANUP
   * ========================================
   */

  return () => {
    cleanupFns.forEach((cleanup) => {
      cleanup();
    });

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
  <button
    type="button"
    data-chapter="0"
    className={styles.activeChapter}
  >
    01
  </button>

  <button
    type="button"
    data-chapter="1"
  >
    02
  </button>

  <button
    type="button"
    data-chapter="2"
  >
    03
  </button>

  <button
    type="button"
    data-chapter="3"
  >
    04
  </button>
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