import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useState, useEffect } from 'react';
const Timer = ({duration, onComplete}) => {
    const [remainingTime, setRemainingTime] = useState( localStorage.getItem('remainingTime') || duration );
    
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
      
        const formattedTime = [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':');
      
        return formattedTime;
    };

    useEffect(() => {
        if (remainingTime === 0) {
            onComplete();
        }
    }, [remainingTime, onComplete]); 

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timerInterval);
                    return prevTime;
                  }  
                const updatedTime = prevTime - 1;
                localStorage.setItem('remainingTime', updatedTime);
                return updatedTime;
            });
        }, 1000);
        
        return () => {
          clearInterval(timerInterval);
        };
      }, []);

    useEffect(() => {
        //console.log(remainingTime);
        localStorage.setItem('remainingTime', remainingTime);
    }, [remainingTime]);

    return(
        <CountdownCircleTimer
            isPlaying = {remainingTime>0}
            duration={duration}
            size={100}
            rotation='anticlockwise'
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[60*60, 30*60, 10*60, 120]}
            onComplete={()=>{}}
        >
            {({remainingTime} ) => (
                <div>
                {remainingTime>0 ? (
                    <span className="text-black text-md">{formatTime(parseInt(localStorage.getItem('remainingTime')))}</span>
                ): (
                    <span className="text-red-500 text-md">Time Up</span>
                )}
                </div>
                )}
        </CountdownCircleTimer>
    )
};


export default Timer;