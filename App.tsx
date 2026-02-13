import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import Button from './components/Button';
import { GIFS, SPEECH_BUBBLE_TEXTS, MAX_NO_CLICKS } from './constants';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.QUESTION);
  const [noCount, setNoCount] = useState(0);

  const handleNoClick = () => {
    setNoCount((prev) => Math.min(prev + 1, MAX_NO_CLICKS + 1));
  };

  const handleYesClick = () => {
    setGameState(GameState.SUCCESS);
  };

  const handleToSadClick = () => {
    setGameState(GameState.SAD);
  };

  const handleToVideoCallClick = () => {
    setGameState(GameState.VIDEO_CALL);
  };

  // Calculate scales
  // Yes button grows: 1 -> 1.3 -> 1.6 -> 1.9...
  const yesScale = 1 + (noCount * 0.35);
  // No button shrinks: 1 -> 0.8 -> 0.6 -> 0
  const noScale = Math.max(0, 1 - (noCount * 0.25));

  const shouldHideNoButton = noCount >= MAX_NO_CLICKS;

  const renderContent = () => {
    switch (gameState) {
      case GameState.QUESTION:
        return (
          <div key="question" className="flex flex-col items-center space-y-8 animate-fade-in">
            {/* Image Container with Speech Bubble */}
            <div className="relative">
              {/* Speech Bubble */}
              {noCount > 0 && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-pop-in z-20 w-48">
                  <div className="relative bg-white text-gray-600 px-4 py-2 rounded-2xl shadow-sm text-center text-sm font-semibold border border-pastel-pink">
                    {SPEECH_BUBBLE_TEXTS[Math.min(noCount - 1, SPEECH_BUBBLE_TEXTS.length - 1)]}
                    {/* Triangle pointer */}
                    <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                  </div>
                </div>
              )}
              
              <img 
                src={GIFS.QUESTION} 
                alt="Cute questioning animal" 
                className="w-48 h-48 object-contain rounded-3xl drop-shadow-xl border-4 border-white/50"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-pastel-strongPink text-center drop-shadow-sm">
              Will you be my valentine?
            </h1>

            {/* Buttons */}
            <div className="flex flex-row items-center justify-center gap-8 min-h-[100px] w-full">
              <Button 
                variant="yes"
                onClick={handleYesClick}
                customScale={yesScale}
                className={`transition-all ${noCount > 0 ? 'animate-pulse-fast shadow-pink-300/50 shadow-lg' : 'animate-pulse-slow'}`}
              >
                Да 💖
              </Button>

              {!shouldHideNoButton && (
                <Button 
                  variant="no"
                  onClick={handleNoClick}
                  customScale={noScale}
                  className="whitespace-nowrap"
                  disabled={shouldHideNoButton}
                >
                  Нет 💔
                </Button>
              )}
            </div>
          </div>
        );

      case GameState.SUCCESS:
        return (
          <div key="success" className="flex flex-col items-center space-y-6 animate-slide-up">
            <img 
              src={GIFS.SUCCESS} 
              alt="Hugging animals" 
              className="w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
            <h1 className="text-4xl font-bold text-pastel-strongPink text-center mt-6">
              yaaay, i knew it🥰!
            </h1>
            <p className="text-pastel-text text-lg opacity-80 mt-2">
              (лучшее решение)
            </p>
            <Button 
              variant="yes" 
              onClick={handleToSadClick}
              className="mt-4 animate-pulse-slow"
            >
              дальше
            </Button>
          </div>
        );

      case GameState.SAD:
        return (
          <div key="sad" className="flex flex-col items-center space-y-6 animate-slide-up">
            <img 
              src={GIFS.SAD} 
              alt="Sad animal" 
              className="w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
            <h1 className="text-3xl font-bold text-pastel-strongPink text-center mt-6">
              but we cant hang out🥹
            </h1>
            <Button 
              variant="yes" 
              onClick={handleToVideoCallClick}
              className="mt-4 animate-pulse-slow"
            >
              дальше
            </Button>
          </div>
        );

      case GameState.VIDEO_CALL:
        return (
          <div key="video" className="flex flex-col items-center space-y-6 animate-slide-up">
            <img 
              src={GIFS.VIDEO_CALL} 
              alt="Happy animal" 
              className="w-64 h-64 object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
            <h1 className="text-3xl font-bold text-pastel-strongPink text-center mt-6">
              но можем созвониться🤩
            </h1>
            <p className="text-pastel-text text-lg opacity-80 mt-2 text-center">
              (если тебе никуда не надо ofc)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 font-sans text-pastel-text overflow-hidden">
      {/* Background Animation */}
      <FloatingHearts />

      {/* Main Content Card */}
      <main className="relative z-10 w-full max-w-md mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;