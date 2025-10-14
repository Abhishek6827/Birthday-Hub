"use client";

import { useState, useEffect, useRef } from "react";

const StoryJourney = ({ isActive, onSectionChange, onScrollChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const journeySteps = [
    {
      title: "🌷 First Sight (2022)",
      content:
        "It all began in 2022, inside the university. The first time I saw you, something about you caught my attention. You were calm, simple, and carried a kind of innocence that made you different from everyone else. Every small thing about you started to matter to me — the way you spoke, the way you smiled, even your silence.I used to feel protective toward you. Seeing your innocence and BAKLOL nature, I often thought the world might take advantage of it. That's why I always tried to make you aware of things, to make sure you wouldn't get hurt, to help you grow — not just emotionally, but as a person.",
      image: "/image1.jpg",
      emotional: "Curiosity → Interest",
    },
    {
      title: "💫 Getting to Know You",
      content:
        "I started noticing the little things - how you smiled when someone cracked a joke, the way you tucked your hair behind your ear when concentrating.And while doing that, I didn't realize when I started caring for you more than I should have. You once scolded me for being too close, thinking it might give a wrong impression — and that hit me hard. I stayed silent, my mood changed, but that same evening, you talked to me again. And just like that, everything felt normal again. That's how we continued our friendship — with care, comfort, and a connection that kept growing stronger.",
      image: "/image2.jpg",
      emotional: "Admiration → Growing Affection",
    },
    {
      title: "🌱 Nurturing Connection",
      content:
        "I made efforts to make you laugh, to understand your thoughts, to be there for you. Your happiness became my priority, your smile my biggest reward.But love isn't always calm.There were times when jealousy and misunderstandings crept in — sometimes from my side, sometimes from yours. I started overthinking little things because I cared too much.When we fought, it wasn't just arguments — it was pain. Because every time you stopped talking, I used to wait, hoping you'd call. When you didn't, it tore me apart. I was never angry at you; I was hurt because I missed you in ways I couldn't express.",
      image: "/image3.jpg",
      emotional: "Care → Dedication",
    },
    {
      title: "💌 Confession (14 June 2023)",
      content:
        "With a heart full of emotions I'd kept hidden, I confessed my feelings. I was nervous but hopeful, scared but determined to let you know how much you meant to me.Then came 14th June 2023 — the day I gathered the courage to confess my feelings. My heart was pounding, my words trembling. I didn't know what your reaction would be, but I couldn't hold it in any longer. You had already become someone I couldn't imagine my days without.That confession wasn't just about love — it was about everything I had felt, every emotion I had hidden behind my silence. It was the first time I truly opened my heart to someone, and that someone was you.",
      image: "/image4.jpg",
      emotional: "Vulnerability → Courage",
    },
    {
      title: "❤️ Commitment (19 September 2023)",
      content:
        "After overcoming initial hesitation, we committed to each other. That moment made all the waiting and uncertainty worth it. You became my 'someone special'.The first time I proposed, you said no — and honestly, it broke something inside me. But I didn't give up, because somewhere deep down, I felt there was more to our story.And when 19th September came — the day we finally committed to each other — it felt like every wound healed in that one moment. That day wasn't just a date, it was the beginning of us. For the first time, I felt complete, proud, and at peace.You became my person, the one I could talk about proudly — even at home, even with friends. You were the first person I felt genuinely secure about.",
      image: "/image5.jpg",
      emotional: "Hope → Commitment",
    },
    {
      title: "✨ Cherished Moments",
      content:
        "Every touch, every conversation, every moment together felt magical. I cherished making you feel loved, protected, and special in every way possible. 8th December — our first picture together.It might have looked like a simple photo to anyone else, but for me, it was everything. That picture had comfort, belonging, and a silent promise hidden in our smiles. It reminded me that sometimes, a single captured moment can hold a thousand feelings.",
      image: "/image6.jpg",
      emotional: "Love → Devotion",
    },
    {
      title: "⚡ Challenges We Faced",
      content:
        "Like any relationship, we had our misunderstandings. My jealousy sometimes got the better of me, but it only came from caring too much.Even when we drifted during those fights, my heart still longed for you. My friends still ask about you sometimes, and I can't help but smile — because no matter how much time has passed, your name still feels special.And every time I see you doing something productive, growing, becoming better — it makes me genuinely happy. Because that's all I ever wanted — to see you become the best version of yourself.",
      image: "/image7.jpg",
      emotional: "Fear → Understanding",
    },
    {
      title: "💔 Growing Apart",
      content:
        "Slowly, silence replaced our conversations. The distance grew, and the bond that once felt unbreakable started to fade, leaving both of us with unanswered questions.Eventually, the little fights, the insecurities, and the silence grew too heavy. We both tried, but somewhere, we lost the ease we once had.And even though we stopped talking, it never meant I stopped caring.There were nights I'd still think about everything — how it started, how it felt, how we drifted apart. That separation didn't just break our connection; it broke something inside me too.",
      image: "/image8.jpg",
      emotional: "Pain → Acceptance",
    },
  ];

  // Handle scroll navigation
  useEffect(() => {
    if (!isActive) return;

    const handleWheel = (e) => {
      if (isScrolling) return;

      setIsScrolling(true);
      onScrollChange(true); // Lock main scrolling

      // Check if we're at the top and need to move to previous section
      if (e.deltaY < 0 && currentStep === 0) {
        if (containerRef.current && containerRef.current.scrollTop === 0) {
          onSectionChange(0); // Move to Hero section
          setIsScrolling(false);
          onScrollChange(false);
          return;
        }
      }

      // Check if we're at the bottom and need to move to next section
      if (e.deltaY > 0 && currentStep === journeySteps.length - 1) {
        if (containerRef.current) {
          const { scrollTop, scrollHeight, clientHeight } =
            containerRef.current;
          const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;

          if (isAtBottom) {
            onSectionChange(2); // Move to PhotoGallery section
            setIsScrolling(false);
            onScrollChange(false);
            return;
          }
        }
      }

      // Regular step navigation within StoryJourney
      if (e.deltaY > 0) {
        // Scroll down - go to next step
        const nextStep = Math.min(journeySteps.length - 1, currentStep + 1);
        setCurrentStep(nextStep);

        // Scroll to the next step
        if (stepRefs.current[nextStep]) {
          stepRefs.current[nextStep].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        // Scroll up - go to previous step
        const prevStep = Math.max(0, currentStep - 1);
        setCurrentStep(prevStep);

        // Scroll to the previous step
        if (stepRefs.current[prevStep]) {
          stepRefs.current[prevStep].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [
    isActive,
    isScrolling,
    currentStep,
    journeySteps.length,
    onSectionChange,
    onScrollChange,
  ]);

  // Set up intersection observer to detect which step is in view
  useEffect(() => {
    if (!isActive) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentStep(index);
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe each step element
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isActive]);

  // Reset to first step when section becomes active
  useEffect(() => {
    if (isActive) {
      setCurrentStep(0);
      onScrollChange(true); // Lock scrolling when entering StoryJourney
      if (containerRef.current) {
        containerRef.current.scrollTo(0, 0);
      }
    } else {
      onScrollChange(false); // Release scrolling when leaving StoryJourney
    }
  }, [isActive, onScrollChange]);

  return (
    <div
      className="h-screen w-screen relative overflow-y-auto"
      ref={containerRef}
    >
      {/* Background with current image - Fixed position */}
      <div className="fixed inset-0 z-0">
        <img
          src={journeySteps[currentStep].image}
          alt="Background"
          className="w-full h-full object-cover filter blur-md brightness-50 scale-110"
        />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* All steps in a vertical layout */}
        <div className="h-[800vh]">
          {journeySteps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className="h-screen flex items-center justify-center p-4"
            >
              <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
                {/* Image Section - Responsive */}
                <div className="w-full lg:w-2/5 h-1/3 lg:h-full flex items-center justify-center p-2 lg:p-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full max-h-[50vh] lg:max-h-[70vh] object-contain rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl border-2 lg:border-4 border-white/20"
                    />
                  </div>
                </div>

                {/* Content Section - Optimized for long text */}
                <div className="w-full lg:w-3/5 h-2/3 lg:h-full flex items-center justify-center p-3 lg:p-6">
                  <div className="max-w-4xl w-full h-full flex flex-col justify-center">
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-pink-200 mb-4 lg:mb-6 drop-shadow-lg text-center lg:text-left">
                      {step.title}
                    </h2>

                    <div className="mb-4 lg:mb-6 flex justify-center lg:justify-start">
                      <span className="px-4 py-2 lg:px-6 lg:py-3 rounded-full text-sm lg:text-base font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg">
                        {step.emotional}
                      </span>
                    </div>

                    {/* Scrollable Content Container */}
                    <div className="flex-1 overflow-y-auto max-h-[50vh] lg:max-h-[60vh]">
                      <p className="text-white text-base lg:text-lg xl:text-xl leading-relaxed lg:leading-loose drop-shadow-lg bg-black/40 rounded-2xl lg:rounded-3xl p-4 lg:p-6 backdrop-blur-md">
                        {step.content}
                      </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex justify-center lg:justify-start gap-2 mt-4">
                      {journeySteps.map((_, stepIndex) => (
                        <div
                          key={stepIndex}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentStep === stepIndex
                              ? "bg-pink-500 scale-125"
                              : "bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryJourney;
