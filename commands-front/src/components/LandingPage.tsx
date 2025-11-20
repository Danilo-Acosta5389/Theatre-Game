import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function LandingPage() {

  // Scroll progress for the whole page
  const { scrollYProgress } = useScroll();

  // Map scroll progress to a scaleY value for the center line.
  // Starts at 0.06 (6% tall) and grows to 1 (full intended height) before the bottom.
  // We clamp the end at 0.92 so the line "finishes" ~8% before the absolute bottom.
  const scaleY = useTransform(scrollYProgress, [0, 0.92], [0.06, 1]);

  const fadeIn: Variants = {
      hidden: { opacity: 0, y: 60 },
      visible: {
      opacity: 1,
      y: 0,
      transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1] // cubic-bezier easing instead of string
      }
    }
  };

  const { ref, inView } = useInView({threshold: 0});

  useEffect(() => {
    
    if (inView) {
      console.log("In View? " + inView);
      
    }
  }, [inView]);


  return (
    <div className="w-full h-full text-white flex flex-col items-center my-20 space-y-40">

      {/* HERO SECTION */}
      <section className="w-full h-screen flex flex-col justify-center items-center text-center px-6">
        <div className=" left-1/2 w-[4px] h-[200px] -translate-x-1/2 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 rounded-full shadow-[0_0_25px_4px_rgba(0,122,255,0.45)] pointer-events-none"></div>
      {/* Fixed center line that grows with scroll. We use scaleY so the line appears to grow downward. */}
      {inView && <motion.div
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1, transition: { duration: 0.5 }}}
        style={{
          scaleY,
          transformOrigin: "top",
        }}
        className="fixed left-1/2 top-0 -translate-x-1/2 w-[4px] ml-[5px] h-[100vh] bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 rounded-full shadow-[0_0_25px_4px_rgba(0,122,255,0.45)] pointer-events-none"
      />}

        <motion.h1
          initial={{ opacity: 1, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{once:true}}
          transition={{ duration: 1 }}
          className="bg-black h-full text-7xl font-extrabold mb-6 tracking-tight"
        >
          Theatre Commands
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-xl max-w-2xl opacity-80 mt-10 bg-black"
        >
          A live theatre experience where actors perform — and the audience directs the story.
        </motion.p>
      </section>

      {/* CONTENT SECTIONS */}
      <section ref={ref} className="w-full max-w-6xl px-6 py-20 space-y-40 relative snap-start">
        {/* WHAT IS THIS? */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-4xl font-semibold mb-4">🎭 What Is This Website?</h2>
            <p className="opacity-80 text-lg leading-relaxed">
              Theatre Commands is a real-time stage where actors assume roles and audiences send spoken instructions.
            </p>
          </div>

          {/* Floating image placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-72 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-600 shadow-xl"
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0,122,255,0.35)" }}
              className="w-full h-72 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-600 shadow-xl"
            >
              Image Placeholder
            </motion.div>
          </motion.div>
        </motion.div>

        {/* FOR ACTORS */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-72 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-600 shadow-xl"
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0,122,255,0.35)" }}
              className="w-full h-72 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-600 shadow-xl"
            >
              Image Placeholder
            </motion.div>
          </motion.div>

          <div>
            <h2 className="text-4xl font-semibold mb-4">🕺 For Actors</h2>
            <ul className="list-disc pl-6 space-y-3 opacity-80 text-lg leading-relaxed">
              <li>Create a role name (e.g. "mailman")</li>
              <li>Receive real-time instructions from the audience</li>
              <li>Hear instructions spoken aloud with voice synthesis</li>
              <li>View all messages as a continuous chat stream</li>
            </ul>
          </div>
        </motion.div>

        {/* FOR AUDIENCE */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-4xl font-semibold mb-4">👥 For the Audience</h2>
            <ul className="list-disc pl-6 space-y-3 opacity-80 text-lg leading-relaxed">
              <li>Browse a real-time list of active roles</li>
              <li>Select a role to start interacting</li>
              <li>Send chat-like messages instantly</li>
              <li>Your instructions are spoken aloud to the actor</li>
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-72 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-600 shadow-xl"
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(0,122,255,0.35)" }}
              className="w-full h-72 bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center text-zinc-600 shadow-xl"
            >
              Image Placeholder
            </motion.div>
          </motion.div>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-semibold">⚡ Key Features</h2>
          <ul className="list-disc pl-6 space-y-3 opacity-80 text-lg leading-relaxed">
            <li>Real-time SignalR communication</li>
            <li>Live voice synthesis</li>
            <li>Always-updated list of active roles</li>
            <li>Simple flows for actors and audiences</li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="text-center space-y-10 py-20 bg-black"
        >
          <h2 className="text-4xl font-semibold">Ready to Begin?</h2>

          <div className="flex gap-8 justify-center">
            <a
              href="/actor"
              className="px-10 py-4 rounded-2xl bg-white text-black font-semibold hover:bg-zinc-200 transition shadow-xl"
            >
              Become an Actor
            </a>
            <a
              href="/audience"
              className="px-10 py-4 rounded-2xl bg-zinc-800 text-white border border-white/20 hover:bg-zinc-700 transition shadow-xl"
            >
              Join as Audience
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
