import React, { useState, useRef, useEffect } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { useMediaQuery } from 'react-responsive';

const PortfolioHighlight = ({ title, description, images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const sectionRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || !infoRef.current || isMobile) return;

            const sectionRect = sectionRef.current.getBoundingClientRect();
            const infoRect = infoRef.current.getBoundingClientRect();

            if (sectionRect.top <= 0 && sectionRect.bottom >= infoRect.height) {
                infoRef.current.style.position = 'sticky';
                infoRef.current.style.top = '0';
            } else {
                infoRef.current.style.position = 'static';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    return (
        <div ref={sectionRef} className="flex flex-col md:flex-row p-4 w-full">
            <div className="w-full md:w-1/2 flex flex-col items-center">
                {images.map((image, index) => (
                    <div key={index} className="w-full mb-4">
                        <img
                            src={image}
                            alt={`Portfolio image ${index + 1}`}
                            className="w-full h-auto object-contain cursor-pointer"
                            onClick={() => { setPhotoIndex(index); setIsOpen(true); }}
                        />
                    </div>
                ))}
            </div>
            <div ref={infoRef} className="w-full md:w-1/2 md:pl-4">
                <div className="sticky top-0">
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    <p className="text-lg">{description}</p>
                </div>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
        </div>
    );
};

export default PortfolioHighlight;
