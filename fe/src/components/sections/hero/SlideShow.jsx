import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); 

    return () => clearInterval(timer); 
  }, []);
  return (
    <div className="relative w-full h-full">
      {slides.map((slide, index) => {
        const words = slide.text.split(' ');
        const lastWord = words.pop();
        const restOfText = words.join(' ');

        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity ts duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide.img} alt={slide.text} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-white text-center p-4">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mb-8">{restOfText} <span className="font-bold">{lastWord}</span></h1>
              <p className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-light w-9/12 leading-normal">{slide.subtext}</p>
            </div>
          </div>
        );
      })}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
        <button onClick={handlePrev} className="text-white ">
          <ChevronLeft size={36} />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
        <button onClick={handleNext} className="text-white ">
          <ChevronRight size={36} />
        </button>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={` rounded-full ${index === currentIndex ? 'bg-white w-2 h-2' : 'bg-neutral-500 w-1.5  h-1.5'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;