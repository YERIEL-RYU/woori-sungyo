import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(Observer) 

function App() {
  const container = useRef();
  
  useGSAP(
    () => {
      const sections = gsap.utils.toArray(".slide");
      const images = gsap.utils.toArray(".image").reverse();
      const slideImages = gsap.utils.toArray(".slide__img");
      const outerWrappers = gsap.utils.toArray(".slide__outer");
      const innerWrappers = gsap.utils.toArray(".slide__inner");
      const count = document.querySelector(".count");
      let currentIndex = 0;
      const wrap = gsap.utils.wrap(0, sections.length);
      let animating;

      gsap.set(outerWrappers, { xPercent: 100 });
      gsap.set(innerWrappers, { xPercent: -100 });
      gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
      gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });

      function gotoSection(index, direction) {
        animating = true;
        index = wrap(index);

        let tl = gsap.timeline({
          defaults: { duration: 1, ease: "expo.inOut" },
          onComplete: () => {
            animating = false;
          },
        });

        let currentSection = sections[currentIndex];
        let heading = currentSection.querySelector(".slide__heading");
        let nextSection = sections[index];
        let nextHeading = nextSection.querySelector(".slide__heading");

        gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
        gsap.set([sections[currentIndex], images[index]], {
          zIndex: 1,
          autoAlpha: 1,
        });
        gsap.set([sections[index], images[currentIndex]], {
          zIndex: 2,
          autoAlpha: 1,
        });

        tl.set(count, { text: index + 1 }, 0.32)
          .fromTo(
            outerWrappers[index],
            {
              xPercent: 100 * direction,
            },
            { xPercent: 0 },
            0
          )
          .fromTo(
            innerWrappers[index],
            {
              xPercent: -100 * direction,
            },
            { xPercent: 0 },
            0
          )
          .to(
            heading,
            {
              "--width": 800,
              xPercent: 30 * direction,
            },
            0
          )
          .fromTo(
            nextHeading,
            {
              "--width": 800,
              xPercent: -30 * direction,
            },
            {
              "--width": 200,
              xPercent: 0,
            },
            0
          )
          .fromTo(
            images[index],
            {
              xPercent: 125 * direction,
              scaleX: 1.5,
              scaleY: 1.3,
            },
            { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 },
            0
          )
          .fromTo(
            images[currentIndex],
            { xPercent: 0, scaleX: 1, scaleY: 1 },
            {
              xPercent: -125 * direction,
              scaleX: 1.5,
              scaleY: 1.3,
            },
            0
          )
          .fromTo(
            slideImages[index],
            {
              scale: 2,
            },
            { scale: 1 },
            0
          )
          .timeScale(0.8);

        currentIndex = index;
      }

      Observer.create({
        type: "wheel,touch,pointer",
        preventDefault: true,
        wheelSpeed: -1,
        onUp: () => {
          // console.log("down");
          if (animating) return;
          gotoSection(currentIndex + 1, +1);
        },
        onDown: () => {
          // console.log("up");
          if (animating) return;
          gotoSection(currentIndex - 1, -1);
        },
        tolerance: 10,
      });

      document.addEventListener("keydown", logKey);

      function logKey(e) {
        // console.log(e.code);
        if ((e.code === "ArrowUp" || e.code === "ArrowLeft") && !animating) {
          gotoSection(currentIndex - 1, -1);
        }
        if (
          (e.code === "ArrowDown" ||
            e.code === "ArrowRight" ||
            e.code === "Space" ||
            e.code === "Enter") &&
          !animating
        ) {
          gotoSection(currentIndex + 1, 1);
        }
      }
    },
    { scope: container }
  );

  return (
    <main ref={container}>
      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">황계교회</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=80&w=400"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">우리마을</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1558603668-6570496b66f8?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDUzOA&ixlib=rb-1.2.1&q=85&w=400"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">축복</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1537165924986-cc3568f5d454?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=85&w=400"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="slide">
        <div className="slide__outer">
          <div className="slide__inner">
            <div className="slide__content">
              <div className="slide__container">
                <h2 className="slide__heading">나눔</h2>
                <figure className="slide__img-cont">
                  <img
                    className="slide__img"
                    src="https://images.unsplash.com/photo-1589271243958-d61e12b61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMyMDU4NA&ixlib=rb-1.2.1&q=80&w=400"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="overlay">
        <div className="overlay__content">
          <p className="overlay__count">
            0<span className="count">{1}</span>
          </p>
          <figure className="overlay__img-cont">
            <img
              className="image"
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTU4Mw&ixlib=rb-1.2.1&q=80&w=800"
            />
            <img
              className="image"
              src="https://images.unsplash.com/photo-1594666757003-3ee20de41568?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTcwOA&ixlib=rb-1.2.1&q=80&w=800"
            />
            <img
              className="image"
              src="https://images.unsplash.com/photo-1579830341096-05f2f31b8259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTQ5Ng&ixlib=rb-1.2.1&q=80&w=800"
            />
            <img
              className="image"
              src="https://images.unsplash.com/photo-1603771628302-c32c88e568e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NjMxOTUxNg&ixlib=rb-1.2.1&q=80&w=800"
            />
          </figure>
        </div>
      </section>

      <footer>
        <p>2025 흩어지는 예배</p>
        <p>우리마을 & 황계교회</p>
      </footer>
    </main>
  );
}

export default App;
