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
                    src="hwangye1.jpeg"
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
                    src="woori1.JPG"
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
                    src="cukbok1.jpeg"
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
                <figure className="slide__img-cont" style={{backgroundColor: 'black'}}>
                  <img
                    className="slide__img"
                    src="nanum2.jpeg"
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
                <h2 className="slide__heading">기쁨</h2>
                <figure className="slide__img-cont" style={{backgroundColor: 'white'}}>
                  <img
                    className="slide__img"
                    src="gibbm1.JPG"
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
          {/* <p className="overlay__count"> */}
            {/* 0<span className="count">{page}</span> */}
          {/* </p> */}
          <figure className="overlay__img-cont" style={{backgroundColor: 'black'}}>
            
            <img
              id="gibbm2"
              className="image"
              src="gibbm2.JPG"
            />
            <img
              className="image"
              src="nanum1.JPG"
            />
            <img
              className="image"
              src="cukbok2.JPG"
            />
            <img
              className="image"
              src="woori2.JPG"
            />
            <img
              className="image"
              src="hwangye2.jpeg"
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
