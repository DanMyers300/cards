import React, { KeyboardEvent, useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Home.module.scss'
import { cardData, textData } from './cardData'
import classnames from 'classnames'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
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

    const handleArrowKey = (e: KeyboardEvent): void => {
        e.key === 'ArrowRight' && prevSlide() 
        e.key === 'ArrowLeft' && nextSlide()
      }
    const handleEnterKey = (e: KeyboardEvent): void => {
        e.key === 'Enter' && nextSlide()
    }

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

        {/*Handle Container*/}
            <div 
                className={styles.container}
                onKeyDown={handleArrowKey}
                role="button"
                tabIndex={0}
            >

                {/*Handle Buttons*/}
                <MdKeyboardArrowLeft
                    id="leftArrow"
                    role="button"
                    tabIndex={0}
                    onKeyDown={handleEnterKey}
                    className={classnames(styles.arrow, styles.leftarrow)}
                    onClick={nextSlide}
                />
                <MdKeyboardArrowRight
                    id="rightArrow"
                    role="button"
                    tabIndex={0}
                    onKeyDown={handleEnterKey}
                    className={classnames(styles.arrow, styles.rightarrow)}
                    onClick={prevSlide}
                />

                {/*Handle Images*/}
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
                    
                {/*Handle Text*/}
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

                {/*Handle Swipe*/}
                <motion.div
                    className={styles.swipeContainer}
                    drag='x'
                    dragMomentum={false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0}
                    onDragEnd={(event, info) => {
                        if (info.offset.x > 0) {
                            prevSlide()
                        } else {
                            nextSlide()
                        }
                    }}
                >
                </motion.div>
            </div>
        </>
    )
}

export default Cards
