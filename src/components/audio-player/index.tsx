import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

type AudioPlayerProps = {
    autoPlay: boolean;
    src: string
}

const AudioPlayer = ({autoPlay, src}: AudioPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isLoaded, setIsLoaded] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleDataLoaded = () => {
        setIsLoaded(true);
    }

    useEffect(() => {
        const playerElement = audioRef.current;

        if (!playerElement) {
            return;
        }

        playerElement.addEventListener('loadeddata', handleDataLoaded);

        return () => {
            playerElement.removeEventListener('loadeddata', handleDataLoaded)
        }
    }, [])

    useEffect(() => {
        const playerElement = audioRef.current;

        if (!isLoaded || !playerElement) {
            return;
        }

        if (isPlaying) {
            playerElement.play();
            return;
        }

        playerElement.pause()
    }, [isLoaded, isPlaying])

    return (
        <>
            <button
                className={cn(
                    'track_button',
                    {'track_button--play': !isPlaying},
                    {'track_button--pause': isPlaying},
                )}
                type='button'
                disabled={!isLoaded}
                onClick={() => setIsPlaying(!isPlaying)}
            />
            <div>
                <audio
                    src={src}
                    ref={audioRef}
                    data-testid='audio'
                />
            </div>
        </>
    );
}

export default AudioPlayer;