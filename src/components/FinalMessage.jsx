const FinalMessage = ({ isActive }) => {
  return (
    <section className="min-h-screen w-screen relative bg-black">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="./image20.jpg"
          alt="Final Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-8">
        <div
          className={`text-center text-white w-full max-w-6xl px-4 transition-all duration-1000 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12"
            style={{
              background: "linear-gradient(45deg, #ec4899, #8b5cf6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Forever in My Heart
          </h2>

          {/* Main Content - No Scroll */}
          <div className="space-y-6 md:space-y-8 px-2">
            {/* Emotional Message */}
            <div
              className="bg-black bg-opacity-60 rounded-2xl md:rounded-3xl p-6 mx-auto max-w-4xl"
              style={{
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-pink-200 mb-4">
                🌹 Memories Today
              </h3>
              <p className="text-base md:text-lg leading-relaxed md:leading-loose text-white/90">
                Even now, when I think of you — it's never with anger. It's
                always with warmth. Your laughter, your innocence, the way you
                made ordinary days feel special — all of that still stays with
                me.
                <br />
                <br />
                No matter where life takes us, you'll always be one of the most
                beautiful chapters of my story. A chapter that changed me,
                taught me, and made me feel what real love truly means.
                <br />
                <br />
                We never hugged each other, neither held each other's hand. So
                much remained incomplete, so many moments left unshared. There's
                a part of me that will always wonder what it would have felt
                like to hold you close, to feel your hand in mine.
                <br />
                <br />
                I'm not there with you today, can't stand by your side, can't
                give you gifts or celebrate with you in person. That's why I
                created this - the only way I could express everything I feel,
                everything you mean to me. I hope it reaches your heart the way
                you've touched mine.
              </p>
            </div>

            {/* Birthday Poem */}
            <div
              className="bg-black bg-opacity-70 rounded-2xl md:rounded-3xl p-6 md:p-8 mx-auto max-w-3xl"
              style={{
                border: "2px solid rgba(236, 72, 153, 0.4)",
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-pink-200 mb-4">
                🎂 On Your Birthday, Shivani...
              </h3>
              <div className="text-base md:text-lg leading-relaxed md:leading-loose text-white/90 whitespace-pre-line">
                Another year, another sunrise,{"\n"}
                And here I am — with misty eyes.{"\n"}
                Wishing the girl who changed my view,{"\n"}A life as bright as
                the smile I knew.{"\n\n"}
                May your days be calm, your dreams take flight,{"\n"}
                May every shadow turn into light.{"\n"}I pray you find love
                that’s pure and true,{"\n"}
                Just like the one I felt for you.{"\n\n"}
                And if someday you think of me,{"\n"}Let it bring warmth, not
                misery.{"\n"}
                Because even today, from far away,{"\n"}I wish you “Happy
                Birthday”, in my own silent way.
              </div>
            </div>

            {/* Main Poem */}
            <div
              className="bg-black bg-opacity-60 rounded-2xl md:rounded-3xl p-6 mx-auto max-w-4xl"
              style={{
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-pink-200 mb-4">
                📜 Our Untold Story
              </h3>
              <div className="text-base md:text-lg leading-relaxed md:leading-loose text-white/90 whitespace-pre-line">
                In 2022, my eyes first found you there, A quiet soul, with a
                gentle stare. Your silence spoke more than words could say, And
                slowly, our friendship paved the way. The day we met, it wasn't
                ordinary, Your smile felt warm, your eyes felt merry. From that
                moment, I knew somehow, You'd matter to me — then, now, and how.
                Your innocence made me care so deep, Every word you said, my
                heart would keep. I worried for you, your gentle soul, Afraid
                this world might take its toll. I guided you, taught you to
                grow, To stand for yourself, to let them know. Sometimes I went
                too close, too near, You scolded me once — I still hear. That
                evening we talked, like nothing went wrong, And from that day,
                our bond grew strong. We stayed together, through laugh and
                pain, Through sunshine moments and sudden rain. On June 14th, I
                opened my heart, Scared and trembling, not knowing where to
                start. A confession I carried, heavy and true, Every beat
                whispered—it belongs to you. The first proposal broke me apart,
                Your "no" carved silence deep in my heart. But fate was kind,
                and in September's embrace, We found commitment, love's sweetest
                place. On September 19th marked our vow, A promise of forever —
                I still keep somehow. And December 8th, our first photo was
                made, A memory eternal, that will never fade. Two smiles
                together, captured in time, A priceless moment—forever mine.
                Every touch, so gentle, so real, Brought a warmth no words could
                conceal. You were the first I felt proud to show, To my family,
                with a heart aglow. And each time you built something bright and
                true, The joy was mine, in watching you. When your call never
                came, my nights felt long, The silence heavy, the absence
                strong. My friends still ask, they speak your name, And I feel
                the pride, the love, the flame. But love's path isn't always
                kind, Jealousy lingered, clouding the mind. Little fights, words
                left unsaid, Turned warmth into distance, love into dread. We
                fought sometimes, my words turned cold, But your silence —
                that's what hurt the most. Hurt followed close, cutting so deep,
                Scars in the heart that quietly we keep. And slowly the silence
                grew too strong, A bond once unbreakable started to go wrong.
                Now we stand apart, with stories untold, Hearts once burning,
                now quiet and cold. Yet still in my chest, your memory stays,
                Guiding my nights, coloring my days. Shivani, no matter the
                distance we bear, A part of me will always be there. You were my
                peace, you were my chaos, My heart's cure, my reason across. My
                story began the moment I found you, And even in silence—my love
                is true.
              </div>
            </div>

            {/* Final Closure with Image */}
            <div
              className="bg-black bg-opacity-70 rounded-2xl md:rounded-3xl p-6 md:p-8 mx-auto max-w-2xl"
              style={{
                border: "2px solid rgba(236, 72, 153, 0.3)",
              }}
            >
              <div className="mb-4 md:mb-6">
                <img
                  src="./image13.jpg"
                  alt="Final Memory"
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto object-cover rounded-full"
                  style={{
                    border: "4px solid rgba(236, 72, 153, 0.3)",
                  }}
                />
              </div>
              <p className="text-lg md:text-xl lg:text-2xl italic text-pink-100 leading-relaxed">
                "Shivani, no matter how far we are today, a part of me still
                lives in you. My story began with you, and even if it never
                finds its ending, my heart will always stay where you are."
              </p>
            </div>

            {/* Final Message */}
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 md:p-6 mx-auto max-w-md border border-pink-300/30">
              <p className="text-lg md:text-xl italic text-pink-100">
                "This journey ends here, but the memories will live forever in
                my heart... 💫"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalMessage;
