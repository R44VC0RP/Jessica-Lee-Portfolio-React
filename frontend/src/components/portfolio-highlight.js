import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useMediaQuery } from 'react-responsive';

const PortfolioHighlight = ({ title, description, images }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div className="flex flex-row p-4" style={{ width: '70%' }}>
            {isMobile ? (
                <div className="flex flex-col items-center">
                    <div className="flex flex-row">
                        {images.map((image, index) => (
                            <img
                                key={image}
                                src={image}
                                alt={`Portfolio image ${image}`}
                                className="mb-2 project-image"
                                style={{ maxWidth: '250px', objectFit: 'cover' }}
                                onClick={() => { setPhotoIndex(index); setIsOpen(true); }}
                            />
                        ))}
                    </div>
                    {images.length > 1 && (
                        <div className="text-center mt-2">
                            <a href="#" onClick={() => { setPhotoIndex(0); setIsOpen(true); }}>
                                See {images.length - 1} more image{images.length - 1 > 1 ? 's' : ''}
                            </a>
                        </div>
                    )}
                    <div className="flex flex-col items-center">
                        <h2 className="thq-heading-2 mt-4">{title}</h2>
                        <p className="text-sm">{description}</p>
                    </div>
                    <hr className="border-t-2 border-gray-300 w-full my-4" />
                    
                </div>
            ) : (
                <div className="flex flex-row p-4" style={{ width: '100%' }}>
                    <div className="flex flex-col items-center mr-4">
                        <div className="flex flex-row">
                            <img
                                key={images[0]}
                                src={images[0]}
                                alt={`Portfolio image ${images[0]}`}
                                className="mb-2 project-image"
                                style={{ maxWidth: '500px', maxHeight: '250px', objectFit: 'cover' }}
                                onClick={() => { setPhotoIndex(0); setIsOpen(true); }}
                            />
                        </div>
                        {images.length > 1 && (
                            <div className='flex flex-row justify-center'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row justify-center p-2'>
                                        <img
                                            key={images[1]}
                                            src={images[1]}
                                            alt={`Portfolio image ${images[1]}`}
                                            className="mb-2 project-image"
                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                            onClick={() => { setPhotoIndex(1); setIsOpen(true); }}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row justify-center p-2'>
                                        <img
                                            key={images[2]}
                                            src={images[2]}
                                            alt={`Portfolio image ${images[2]}`}
                                            className="mb-2 project-image"
                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                            onClick={() => { setPhotoIndex(2); setIsOpen(true); }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='flex flex-row justify-center'>
                            {images.length > 3 ? (
                                <span className='text-sm' onClick={() => { setPhotoIndex(3); setIsOpen(true); }}>View {images.length - 3} more images</span>
                            ) : (
                                <span className='text-sm'></span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col justify-start">
                        <h2 className="thq-heading-2">{title}</h2>
                        <p className="text-sm">{description}</p>
                    </div>
                    
                </div>
            )}
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
