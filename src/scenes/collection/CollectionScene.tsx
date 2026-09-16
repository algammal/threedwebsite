"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./CollectionScene.module.css";

gsap.registerPlugin(ScrollTrigger);

function CollectionScene() {
  const sceneRef = useRef<HTMLElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const cardOneRef = useRef<HTMLDivElement>(null);
  const cardTwoRef = useRef<HTMLDivElement>(null);
  const cardThreeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;

    if (!scene) return;

    const context = gsap.context(() => {
      const panel = panelRef.current;
      const heading = headingRef.current;

      const cardOne = cardOneRef.current;
      const cardTwo = cardTwoRef.current;
      const cardThree = cardThreeRef.current;

      if (
        !panel ||
        !heading ||
        !cardOne ||
        !cardTwo ||
        !cardThree
      ) {
        return;
      }

      /*
       * ------------------------------------------------------------
       * INITIAL STATES
       * ------------------------------------------------------------
       */

      gsap.set(panel, {
        yPercent: 100,
        rotation: 4,
        skewY: 3,
        scale: 1.08,
        transformOrigin: "bottom left",
      });

      gsap.set(heading, {
        opacity: 0,
        y: 80,
        filter: "blur(12px)",
      });

      gsap.set(cardOne, {
        opacity: 0,
        y: 180,
        rotate: -8,
      });

      gsap.set(cardTwo, {
        opacity: 0,
        y: 240,
        rotate: 8,
      });

      gsap.set(cardThree, {
        opacity: 0,
        y: 300,
        rotate: -5,
      });

      /*
       * ------------------------------------------------------------
       * MAIN TIMELINE
       * ------------------------------------------------------------
       */

      const timeline = gsap.timeline();

      /*
       * 1. Collection panel rises from the bottom diagonally.
       *    It then straightens itself as it reaches the viewport.
       */
      timeline.to(
        panel,
        {
          yPercent: 0,
          rotation: 0,
          skewY: 0,
          scale: 1,
          duration: 1.5,
          ease: "power4.inOut",
        },
        0,
      );

      /*
       * 2. Main heading enters.
       */
      timeline.to(
        heading,
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        },
        0.9,
      );

      /*
       * 3. First collection piece.
       */
      timeline.to(
        cardOne,
        {
          opacity: 1,
          y: 0,
          rotate: -3,
          duration: 1,
          ease: "power3.out",
        },
        1.15,
      );

      /*
       * 4. Second collection piece.
       */
      timeline.to(
        cardTwo,
        {
          opacity: 1,
          y: 0,
          rotate: 4,
          duration: 1,
          ease: "power3.out",
        },
        1.35,
      );

      /*
       * 5. Third collection piece.
       */
      timeline.to(
        cardThree,
        {
          opacity: 1,
          y: 0,
          rotate: -2,
          duration: 1,
          ease: "power3.out",
        },
        1.55,
      );

      /*
       * ------------------------------------------------------------
       * PARALLAX
       * ------------------------------------------------------------
       */

      timeline.to(
        cardOne,
        {
          y: -100,
          duration: 2,
          ease: "none",
        },
        2.2,
      );

      timeline.to(
        cardTwo,
        {
          y: 70,
          duration: 2,
          ease: "none",
        },
        2.2,
      );

      timeline.to(
        cardThree,
        {
          y: -150,
          duration: 2,
          ease: "none",
        },
        2.2,
      );

      /*
       * ------------------------------------------------------------
       * SCROLLTRIGGER
       * ------------------------------------------------------------
       */

      ScrollTrigger.create({
        trigger: scene,
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: true,
        animation: timeline,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, scene);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      className={styles.scene}
    >
      <div
        ref={panelRef}
        className={styles.panel}
      >
        {/* -------------------------------------------------------
            HEADING
        ------------------------------------------------------- */}

        <div
          ref={headingRef}
          className={styles.heading}
        >
          <span className={styles.eyebrow}>
            CHAPTER 05
          </span>

          <h2>
            THE
            <br />
            COLLECTION
          </h2>

          <p>
            PIECES FOR THOSE
            <br />
            WHO DIFFER.
          </p>
        </div>

        {/* -------------------------------------------------------
            CARD 01
        ------------------------------------------------------- */}

        <article
          ref={cardOneRef}
          className={`${styles.card} ${styles.cardOne}`}
        >
          <div className={styles.imageWrapper}>
            <img
              src="/images/model1.jpg"
              alt="Noiré collection"
            />
          </div>

          <div className={styles.cardInfo}>
            <span>01</span>
            <span>SILHOUETTE</span>
          </div>
        </article>

        {/* -------------------------------------------------------
            CARD 02
        ------------------------------------------------------- */}

        <article
          ref={cardTwoRef}
          className={`${styles.card} ${styles.cardTwo}`}
        >
          <div className={styles.imageWrapper}>
            <img
              src="/images/model2.jpg"
              alt="Noiré collection"
            />
          </div>

          <div className={styles.cardInfo}>
            <span>02</span>
            <span>FORM</span>
          </div>
        </article>

        {/* -------------------------------------------------------
            CARD 03
        ------------------------------------------------------- */}

        <article
          ref={cardThreeRef}
          className={`${styles.card} ${styles.cardThree}`}
        >
          <div className={styles.imageWrapper}>
            <img
              src="/images/model3.png"
              alt="Noiré collection"
            />
          </div>

          <div className={styles.cardInfo}>
            <span>03</span>
            <span>IDENTITY</span>
          </div>
        </article>

        {/* -------------------------------------------------------
            FOOTER
        ------------------------------------------------------- */}

        <div className={styles.footerLabel}>
          <span>NOIRÉ</span>
          <span>05 — 07</span>
        </div>
      </div>
    </section>
  );
}

export default CollectionScene;