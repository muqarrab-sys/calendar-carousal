import { Dayjs } from 'dayjs'
import React, { FC, useCallback, useRef, useState } from 'react'
import { useToken } from '../../theme'
import { IDate } from '../../types'
import CalenderCard from '../CalenderCard'
import { useCalculateCardsPerView } from '../../hooks'

export interface CalendarCarouselProps {
  dates: IDate[]
  containerWidth?: number
  cardStyles?: {
    head?: React.CSSProperties
    body?: React.CSSProperties
  }
  onSelectDate?(date: Dayjs): void
}

const CalendarCarousel: FC<CalendarCarouselProps> = (props) => {
  const [, token] = useToken()
  const cardsPerView = useCalculateCardsPerView(token.calenderCardsPerView)

  const datesLength = props.dates.length
  const containerWidth = props.containerWidth || token.calenderCardSize * cardsPerView + token.calenderCardGap * (cardsPerView + 1)
  const totalWidthOfCardsContainer = datesLength * token.calenderCardSize + datesLength * token.calenderCardGap - token.calenderCardGap
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

      if (newValue <= swipeBounce && animation.current.transform >= -(totalWidthOfCardsContainer + 20 - token.animationDistance * 3)) {
        animation.current.transform = newValue
        forceRerender()
      }
    }
  }

  const handleMouseUp = () => {
    swipe.current.isMouseDown = false
    swipe.current.positionOnMouseDown = null

    const reachedIndex = Math.round(animation.current.transform / token.animationDistance)
    const maxReachableIndex = cardsPerView - datesLength
    const index = reachedIndex < maxReachableIndex ? maxReachableIndex : reachedIndex

    animation.current.transform = index * token.animationDistance
    forceRerender()

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
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
          gap: token.calenderCardGap,
          margin: '15px 0',
          transition: 'transform 0.3s',
          transform: `translateX(${animation.current.transform + token.calenderCardGap}px)`,
        }}
        onMouseDown={handleMouseDown}
      >
        {props.dates.map((day) => {
          return (
            <div
              key={day.date.valueOf()}
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CalenderCard
                date={day.date}
                onClick={() => props.onSelectDate && props.onSelectDate(day.date)}
                closed={day.closed}
                headStyle={props?.cardStyles?.head}
                bodyStyle={props?.cardStyles?.body}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarCarousel
