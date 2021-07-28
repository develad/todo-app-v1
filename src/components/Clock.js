import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(() => moment().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h1 className='time'>{time}</h1>
    </div>
  );
};

export default Clock;
