import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import { cardData, textData } from './cardData'
import classnames from 'classnames'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft, FaWindowClose } from 'react-icons/fa'
import { motion } from 'framer-motion';

export const calculateVisibleCardArray = (
    cardData: any[],
    selectedIndex: number
): any[] => {
    const leftMostCard = selectedIndex - 2
    const rightMostCard = selectedIndex + 2
    const visibleCardArray = []
    for (let i = leftMostCard; i <= rightMostCard; i++) {
        visibleCardArray.push(cardData.at(i % cardData.length))
    }
    return visibleCardArray
}

const Cards = ({ slides }: { slides: any }) => {
    const [current, setCurrent] = useState(2)
    const length = cardData.length

    const nextSlide = () => {
        // Switch all the cards up one
        setCurrent(current === length - 1 ? 0 : current + 1)
        // Handle the card flip direction
        document.documentElement.style.setProperty('--flipDirection', '-180deg')
    }

    const prevSlide = () => {
        // Switch all the cards down one
        setCurrent(current === 0 ? length - 1 : current - 1)
        // Handle the card flip direction
        document.documentElement.style.setProperty('--flipDirection', '180deg')
    }

    if (!Array.isArray(cardData) || cardData.length <= 0) {
        return null
    }

    const visibleCards = calculateVisibleCardArray(cardData, current)

    return (
        <>
            <motion.div drag className={styles.container}>
                <FaArrowAltCircleLeft
                    id="leftArrow"
                    className={classnames(styles.arrow, styles.leftarrow)}
                    onClick={nextSlide}
                />
                <FaArrowAltCircleRight
                    id="rightArrow"
                    className={classnames(styles.arrow, styles.rightarrow)}
                    onClick={prevSlide}
                />
                    {visibleCards.map((card, index) => {
                        return (
                            <div
                                key={`Card-${card.id}`}
                                className={classnames(
                                    styles.card,
                                    {
                                        [styles.flipCard]: index === 2,
                                    },
                                    styles[`card${index}`]
                                )}
                            >
                                <Image
                                    src={card.back}
                                    alt={`Card ${index}`}
                                    width="352"
                                    height="493"
                                    className={styles.cardBack}
                                />
                                <Image
                                    src={card.image}
                                    alt={`Card ${index}`}
                                    width="352"
                                    height="493"
                                    className={styles.cardFront}
                                />
                            </div>
                        )
                    })}

                {textData.map((text, index) => {
                    return (
                        <div
                            id="text"
                            className={
                                index === current ? 'slide active' : 'slide'
                            }
                            key={index}
                        >
                            {index === current && (
                                <div id="text" className={styles.text}>
                                    {text.text}
                                </div>
                            )}
                        </div>
                    )
                })}
            </motion.div>
        </>
    )
}

export default Cards


// For drag:

// Framer motion drag option is what we're going to use. When I apply it to the cards they are able to be dragged all around. 
// I'm thinking maybe I need another inner container for the cards
// so that way they aren't able to be dragged individually. I'm not sure how to do that though.