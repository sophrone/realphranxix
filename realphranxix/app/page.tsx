'use client'; // Ensure this directive is included

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './HomePage.module.css'; // Ensure the path is correct

export default function Home() {
  const [currentTrack, setCurrentTrack] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTrackName, setCurrentTrackName] = useState('');
  const [volume, setVolume] = useState(1); // State for volume control
  const [isMuted, setIsMuted] = useState(false); // State for mute control

  const tracks = [
    { name: 'Track 1 - "Vibe with Me"', url: '/tracks/Afro_2.mp3' },
    { name: 'Track 2 - "City Dreams"', url: '/tracks/Afro_6.mp3' },
    { name: 'Track 3 - "Rise Up"', url: '/tracks/Afro_9.mp3' },
  ];

  const playTrack = (trackUrl: string, trackName: string) => {
    if (currentTrack) {
      currentTrack.pause();
    }
    const audio = new Audio(trackUrl);
    audio.volume = volume; // Set initial volume
    audio.play();
    setCurrentTrack(audio);
    setCurrentTrackName(trackName);
    setIsPlaying(true);
    
    // Mute or unmute based on the current mute state
    audio.muted = isMuted;

    audio.ontimeupdate = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
      setProgress(0);
    };
  };

  const pauseTrack = () => {
    if (currentTrack) {
      currentTrack.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (currentTrack) {
      currentTrack.muted = !isMuted; // Toggle mute state
    }
  };

  useEffect(() => {
    return () => {
      if (currentTrack) {
        currentTrack.pause();
      }
    };
  }, [currentTrack]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello! I am REALPHRANXIX!</h1>
      <Image 
        src="/image1.jpg" 
        alt="Artist Profile" 
        width={500}  
        height={500} 
        priority    
        className={styles.image} 
      />
      <p className={styles.description}>
        Discover my music, my journey, and my message. Join me as I explore the world of hip-hop, sharing stories that resonate and beats that move you.
      </p>
      
      <section className={styles.musicSection}>
        <h2 className={styles.subTitle}>Latest Tracks</h2>
        <ul className={styles.trackList}>
          {tracks.map((track) => (
            <li key={track.url} className={styles.trackItem}>
              <span className={styles.trackName}>{track.name}</span>
              <div className={styles.controls}>
                {currentTrack && currentTrackName === track.name && isPlaying ? (
                  <>
                    <button className={styles.pauseButton} onClick={pauseTrack}>⏸️</button>
                  </>
                ) : (
                  <button className={styles.playButton} onClick={() => playTrack(track.url, track.name)}>▶</button>
                )}
                <input
                  type="range"
                  className={styles.progressBar}
                  value={currentTrackName === track.name ? progress : 0}
                  onChange={(e) => {
                    if (currentTrack) {
                      const newTime = (Number(e.target.value) / 100) * currentTrack.duration;
                      currentTrack.currentTime = newTime;
                    }
                  }}
                  disabled={currentTrackName !== track.name}
                />
                <input
                  type="range"
                  className={styles.volumeSlider}
                  min="0"
                  max="1"
                  step="0.01"
                  value={currentTrackName === track.name ? volume : 1}
                  onChange={(e) => {
                    const newVolume = Number(e.target.value);
                    setVolume(newVolume);
                    if (currentTrack) {
                      currentTrack.volume = newVolume; 
                    }
                  }}
                />
                <button className={styles.muteButton} onClick={toggleMute}>
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.eventsSection}>
        <h2 className={styles.subTitle}>Upcoming Events</h2>
        <ul className={styles.eventList}>
          <li>📅 Concert at Downtown Arena - March 15, 2024</li>
          <li>📅 Music Festival - April 22, 2024</li>
          <li>📅 Release Party - May 5, 2024</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>Follow me on social media for the latest updates!</p>
        <div className={styles.socialLinks}>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </footer>
    </div>
  );
}