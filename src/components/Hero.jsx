import "./css/hero.css";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const slides = [
  {
    title: "Discover Amazing Events",
    subtitle: "Book experiences you’ll never forget",
    images: [
      "https://tinyurl.com/eventflow1",
      "https://tinyurl.com/eventflow2",
      "https://tinyurl.com/eventflow3",
      "https://tinyurl.com/eventflow4",
      "https://tinyurl.com/eventflow5",
      "https://tinyurl.com/eventflow6",
    ],
  },
  {
    title: "Live Music & Entertainment",
    subtitle: "Concerts, shows, and festivals near you",
    images: [
      "https://tinyurl.com/eventflow7",
      "https://tinyurl.com/eventflow8",
      "https://tinyurl.com/eventflow9",
      "https://tinyurl.com/eventflow10",
      "https://tinyurl.com/eventflow11",
      "https://tinyurl.com/eventflow12",
    ],
  },
  {
    title: "Moments That Matter",
    subtitle: "Create memories with friends and family",
    images: [
      "https://tinyurl.com/eventflow13",
      "https://tinyurl.com/eventflow14",
      "https://tinyurl.com/eventflow15",
      "https://tinyurl.com/eventflow16",
      "https://tinyurl.com/eventflow17",
      "https://tinyurl.com/eventflow18",
    ],
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const slideRefs = useRef([]);
  const textRefs = useRef([]);
  const intervalRef = useRef(null);

  // 🎯 Direction logic
  const getFlyInProps = (index) => {
    const dirs = [
      { x: -350, y: -250, rotate: -18 },
      { x: 350, y: -250, rotate: 18 },
      { x: -350, y: 250, rotate: -14 },
      { x: 350, y: 250, rotate: 14 },
      { x: -250, y: -350, rotate: -12 },
      { x: 250, y: 350, rotate: 12 },
    ];
    return dirs[index % dirs.length];
  };

  // 🚀 Initial mount
  useGSAP(() => {
    gsap.set(slideRefs.current, { autoAlpha: 0 });
    gsap.set(slideRefs.current[0], { autoAlpha: 1 });
    animateSlide(0);
  }, []);

  // 🔁 Auto slide
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        transition(prev, next);
        return next;
      });
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  // 🔄 Transition logic
  const transition = (from, to) => {
    if (!slideRefs.current[from] || !slideRefs.current[to]) return;

    gsap.killTweensOf(slideRefs.current[from]);
    gsap.killTweensOf(slideRefs.current[to]);

    const tl = gsap.timeline();

    tl.to(slideRefs.current[from], {
      autoAlpha: 0,
      duration: 1.1,
      ease: "power3.inOut",
    });

    tl.fromTo(
      slideRefs.current[to],
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.6"
    );

    animateSlide(to);
  };

  // ✨ Flying collage animation
    const animateSlide = (index) => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    const items = slide.querySelectorAll(".collage-item");
    const text = textRefs.current[index];

    // Kill old animations (VERY important)
    gsap.killTweensOf(items);

    gsap.killTweensOf(text.children);

    // 1️⃣ FORCE items off-screen FIRST
    items.forEach((item, i) => {
        const { x, y, rotate } = getFlyInProps(i);

        gsap.set(item, {
        x,
        y,
        rotate,
        scale: 1.5,
        opacity: 0,
        });
    });

    // 2️⃣ NOW animate them INTO place
    gsap.to(items, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: "power4.out",
        stagger: {
        each: 0.12,
        from: "random",
        },
    });

    // 3️⃣ Text animation
    gsap.fromTo(
        text.children,
        { y: 40, opacity: 0 },
        {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: 0.6,
        ease: "power3.out",
        }
    );
    };


  return (
    <section className="hero-collage">
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => (slideRefs.current[index] = el)}
          className="hero-slide"
        >
          <div className="collage">
            {slide.images.map((img, i) => (
              <div
                key={i}
                className="collage-item"
                style={{ backgroundImage: `url(${img})` }}
              />
            ))}
          </div>

          <div
            className="hero-content"
            ref={(el) => (textRefs.current[index] = el)}
          >
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <Link to="/Events" className="btn">
              Browse Events
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Hero;
