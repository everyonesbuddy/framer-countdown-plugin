import { addPropertyControls, ControlType } from "framer"
import React, { useEffect, useState } from "react"

type Props = {
  targetDate: string
  fontSize: number
  color: string
}

export function Countdown({ targetDate, fontSize, color }: Props) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date()
    if (difference <= 0) return null

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    if (!timeLeft) return
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, targetDate])

  if (!timeLeft) return <div style={{ fontSize, color }}>Time's up!</div>

  return (
    <div style={{ fontSize, color }}>
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  )
}

// 👇 Makes props configurable inside Framer
addPropertyControls(Countdown, {
  targetDate: {
    type: ControlType.String,
    title: "Target Date",
    placeholder: "2025-12-31T23:59:59Z",
  },
  fontSize: {
    type: ControlType.Number,
    title: "Font Size",
    defaultValue: 24,
  },
  color: {
    type: ControlType.Color,
    title: "Color",
    defaultValue: "#000000",
  },
})
