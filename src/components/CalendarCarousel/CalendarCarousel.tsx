import { Button, Col, Row } from 'antd'
import { Dayjs } from 'dayjs'
import React, { FC, Fragment, useCallback, useRef, useState } from 'react'
import { IDates } from '../../helpers/getDates'
import Card from '../CalenderCard'
import { CARD_WIDTH, CARDS_GAP, CARDS_PER_VIEW } from '../../constants'

export interface CalendarCarouselProps {
  /**
   * @default 170
   */
  cardWidth?: number
  /**
   * @default 10
   */
  gap?: number
  /**
   * @default 3
   */
  cardsPerView?: number

  data: IDates[]
  containerWidth?: number
  onSelectDate?(date: Dayjs): void
}

const CalendarCarousel: FC<CalendarCarouselProps> = (props) => {
  const cardWidth = props.cardWidth || CARD_WIDTH
  const cardGap = props.gap || CARDS_GAP
  const cardsPerView = props.cardsPerView || CARDS_PER_VIEW
  const containerWidth = props.containerWidth || cardWidth * cardsPerView + cardGap * (cardsPerView + 1)
  const totalWidthOfCardsContainer = props.data.length * cardWidth + props.data.length * cardGap - cardGap
  const animationDistance = cardWidth + cardGap
  const initialPosition = 0
  const swipeBounce = 50

  const swipe = useRef<{ isMouseDown: boolean; positionOnMouseDown: number | null; transformPosition: number | null }>({
    isMouseDown: false,
    positionOnMouseDown: null,
    transformPosition: null,
  })

  const animation = useRef({ transform: initialPosition })

  const [, updateRender] = useState({})
  const forceRerender = useCallback(() => updateRender({}), [])

  const onNext = () => {
    if (animation.current.transform > -(totalWidthOfCardsContainer - cardsPerView * animationDistance)) {
      animation.current.transform -= animationDistance
      forceRerender()
    }
  }

  const onPrev = () => {
    if (animation.current.transform < initialPosition) {
      animation.current.transform += animationDistance
      forceRerender()
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    swipe.current.isMouseDown = true
    swipe.current.positionOnMouseDown = e.clientX
    swipe.current.transformPosition = animation.current.transform

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mousemove', handleMouseMove)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (swipe.current.isMouseDown) {
      const diff = e.clientX - (swipe.current.positionOnMouseDown || 0)
      const newValue = (swipe.current.transformPosition || 0) + diff

      if (newValue <= swipeBounce && animation.current.transform >= -(totalWidthOfCardsContainer + 20 - animationDistance * 3)) {
        animation.current.transform = newValue
        forceRerender()
      }
    }
  }

  const handleMouseUp = () => {
    swipe.current.isMouseDown = false
    swipe.current.positionOnMouseDown = null

    const reachedIndex = Math.round(animation.current.transform / animationDistance)
    const maxReachableIndex = cardsPerView - props.data.length
    const index = reachedIndex < maxReachableIndex ? maxReachableIndex : reachedIndex

    animation.current.transform = index * animationDistance
    forceRerender()

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          width: containerWidth,
          margin: '10px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: cardGap,
            margin: '15px 0',
            transition: 'transform 0.3s',
            transform: `translateX(${animation.current.transform + cardGap}px)`,
          }}
          onMouseDown={handleMouseDown}
        >
          {props.data.map((day) => {
            return (
              <div
                key={day.date.valueOf()}
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card date={day.date} width={cardWidth} onClick={() => props.onSelectDate && props.onSelectDate(day.date)} />
              </div>
            )
          })}
        </div>
      </div>
      <Row justify={'space-evenly'} align={'middle'}>
        <Col>
          <Button onClick={onPrev}>Prev</Button>
        </Col>
        <Col>
          <Button onClick={onNext}>Next</Button>
        </Col>
      </Row>
    </Fragment>
  )
}

export default CalendarCarousel
