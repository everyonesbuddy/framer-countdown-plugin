import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string; // ISO string, e.g. "2025-12-31T23:59:59Z"
  onExpire?: () => void;
  style?: React.CSSProperties;
}

const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  onExpire,
  style,
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!timeLeft) {
      if (onExpire) onExpire();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, targetDate, onExpire]);

  if (!timeLeft) return <div style={style}>Time’s up!</div>;

  return (
    <div style={style}>
      <span>{timeLeft.days}d </span>
      <span>{timeLeft.hours}h </span>
      <span>{timeLeft.minutes}m </span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
};

export default Countdown;
