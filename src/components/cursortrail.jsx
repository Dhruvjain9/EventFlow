import { useEffect } from "react";
import gsap from "gsap";
import "./css/cursorTrail.css";

const flairImages = [
  "https://assets.codepen.io/16327/Revised+Flair.png",
  "https://assets.codepen.io/16327/Revised+Flair-1.png",
  "https://assets.codepen.io/16327/Revised+Flair-2.png",
  "https://assets.codepen.io/16327/Revised+Flair-3.png",
  "https://assets.codepen.io/16327/Revised+Flair-4.png",
  "https://assets.codepen.io/16327/Revised+Flair-5.png",
  "https://assets.codepen.io/16327/Revised+Flair-6.png",
  "https://assets.codepen.io/16327/Revised+Flair-7.png",
  "https://assets.codepen.io/16327/Revised+Flair-8.png",
];

function CursorTrail() {
  useEffect(() => {
    /* ------------------------------
       CREATE POOL (ONCE)
    ------------------------------ */

    const container = document.createElement("div");
    container.className = "flair-container";
    document.body.appendChild(container);

    const flairs = [];
    const count = 18;

    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      img.src = flairImages[i % flairImages.length];
      img.className = "flair";
      container.appendChild(img);
      flairs.push(img);
    }

    /* ------------------------------
       GSAP DEFAULTS
    ------------------------------ */

    gsap.defaults({ duration: 1 });

    const wrapper = gsap.utils.wrap(0, flairs.length);
    let index = 0;
    const gap = 100;

    /* ------------------------------
       MOUSE TRACKING
    ------------------------------ */

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cachedMousePos = { x: 0, y: 0 };

    const onMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    /* ------------------------------
       ANIMATION LOGIC (UNCHANGED)
    ------------------------------ */

    function playAnimation(shape) {
      const tl = gsap.timeline();
      tl.from(shape, {
        opacity: 0,
        scale: 0,
        ease: "elastic.out(1,0.3)",
      })
        .to(
          shape,
          {
            rotation: "random([-360, 360])",
          },
          "<"
        )
        .to(
          shape,
          {
            y: "120vh",
            ease: "back.in(0.4)",
            duration: 1,
          },
          0
        );
    }

    function animateImage() {
      const wrappedIndex = wrapper(index);
      const img = flairs[wrappedIndex];

      gsap.killTweensOf(img);
      gsap.set(img, { clearProps: "all" });

      gsap.set(img, {
        opacity: 1,
        left: mousePos.x,
        top: mousePos.y,
        xPercent: -50,
        yPercent: -50,
      });

      playAnimation(img);
      index++;
    }

    function ImageTrail() {
      const travelDistance = Math.hypot(
        lastMousePos.x - mousePos.x,
        lastMousePos.y - mousePos.y
      );

      cachedMousePos.x = gsap.utils.interpolate(
        cachedMousePos.x || mousePos.x,
        mousePos.x,
        0.1
      );
      cachedMousePos.y = gsap.utils.interpolate(
        cachedMousePos.y || mousePos.y,
        mousePos.y,
        0.1
      );

      if (travelDistance > gap) {
        animateImage();
        lastMousePos.x = mousePos.x;
        lastMousePos.y = mousePos.y;
      }
    }

    gsap.ticker.add(ImageTrail);

    /* ------------------------------
       CLEANUP
    ------------------------------ */

    return () => {
      gsap.ticker.remove(ImageTrail);
      window.removeEventListener("mousemove", onMove);
      container.remove();
    };
  }, []);

  return null;
}

export default CursorTrail;
