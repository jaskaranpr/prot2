import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import StickFigureCharacter from './components/StickFigureCharacter';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-full bg-white text-black selection:bg-gray-100">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-10 animate-fade-in">
          <h1 className="text-6xl md:text-7xl lg:text-8xl leading-none font-normal">
            Jaskaran Singh
          </h1>
          <div className="space-y-4 text-xl md:text-2xl text-neutral-600">
            <p>Frontend Engineer & UI/UX Designer</p>
            <p className="text-lg text-neutral-400">Bengaluru, India</p>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-neutral-700 leading-relaxed max-w-2xl mx-auto pt-6">
            <p>
              Frontend Engineer with 4+ years of experience building high-performance applications across web and mobile platforms using React, React Native, Flutter, and Kotlin.
            </p>
            <p>
              Specializing in custom UI components, charting systems, and cross-platform solutions that deliver measurable results.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <a 
              href="mailto:jaskaran.psd@gmail.com"
              className="px-8 py-3 rounded-full border-4 border-neutral-300 text-neutral-500 text-xl font-bold hover:bg-neutral-50 transition-colors cursor-pointer"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
            >
              Contact Me
            </a>
            <button 
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-3 rounded-full border-4 border-black text-black text-xl font-bold hover:bg-neutral-50 transition-colors"
              style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}
            >
              View Work
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full space-y-12">
          <h2 className="text-4xl font-bold text-center">Experience</h2>
          
          <div className="space-y-6 text-left">
            <div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-2">
                <h3 className="text-3xl font-bold">Lemonn</h3>
                <span className="text-lg text-neutral-500">Apr 2022 – Present</span>
              </div>
              <p className="text-lg text-neutral-600 mb-4">Frontend Developer</p>
              <ul className="list-disc pl-5 space-y-2 text-lg text-neutral-700 marker:text-neutral-400">
                <li>Engineered a professional candlestick charting system using Flutter CustomPainter.</li>
                <li>Optimised cross-platform performance achieving consistent 60 FPS.</li>
                <li>Significantly improved legacy Android app stability by 35%.</li>
                <li>Built a cross-platform UI component library reducing feature development time by 50%.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl w-full space-y-12">
          <h2 className="text-4xl font-bold text-center">Selected Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 p-6 border-2 border-dashed border-neutral-300 rounded-3xl hover:border-black transition-colors">
              <h3 className="text-2xl font-bold">CodePen Projects</h3>
              <p className="text-lg text-neutral-600">
                Photorealistic models using pure CSS and smooth animations including a Netflix logo replica.
              </p>
            </div>

            <div className="space-y-4 p-6 border-2 border-dashed border-neutral-300 rounded-3xl hover:border-black transition-colors">
              <h3 className="text-2xl font-bold">Instagram Clone</h3>
              <p className="text-lg text-neutral-600">
                Pixel-perfect replica with real-time chat, posting systems, and seamless theme switching.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl w-full space-y-12">
          <h2 className="text-4xl font-bold text-center">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['ReactJS', 'React Native', 'Flutter', 'TypeScript', 'Android Kotlin', 'CSS3', 'Redux', 'Git'].map((skill) => (
              <span key={skill} className="px-4 py-2 text-lg border-2 border-neutral-200 rounded-xl hover:border-neutral-400 transition-colors">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-8">
          <h2 className="text-4xl font-bold">Let's Connect</h2>
          <p className="text-xl text-neutral-600">
            Open to new opportunities and collaborations.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:jaskaran.psd@gmail.com"
              className="text-xl text-neutral-600 hover:text-black transition-colors border-b-2 border-transparent hover:border-black pb-1"
            >
              jaskaran.psd@gmail.com
            </a>
            <a 
              href="tel:+918360025206"
              className="text-xl text-neutral-600 hover:text-black transition-colors border-b-2 border-transparent hover:border-black pb-1"
            >
              +91 83600 25206
            </a>
          </div>
          <p className="pt-12 text-lg text-neutral-400">
            © {new Date().getFullYear()} Jaskaran Singh
          </p>
        </div>
      </section>

      {/* Animated Stick Figure Character */}
      <StickFigureCharacter />

    </div>
  );
};

export default App;
