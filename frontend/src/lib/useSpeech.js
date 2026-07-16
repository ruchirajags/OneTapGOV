'use client';
import { useState, useCallback, useRef } from 'react';

// Languages that should use Web Speech API (English)
const WEB_SPEECH_LANGUAGES = ['English'];

const LANG_MAP = {
  "English": "en-IN",
  "Hindi": "hi-IN",
  "Marathi": "mr-IN",
  "Bengali": "bn-IN",
  "Tamil": "ta-IN",
  "Telugu": "te-IN",
  "Kannada": "kn-IN",
  "Gujarati": "gu-IN"
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Track the currently playing SARVAM audio element for cancellation
let sarvamAudioRef = null;

/**
 * Fallback: use Web Speech API for any language when SARVAM is unavailable.
 */
const speakWithWebSpeech = (text, language) => {
  if (typeof window === 'undefined') return;
  
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const langCode = LANG_MAP[language] || 'en-IN';
  utterance.lang = langCode;
  
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(langCode)) ||
                voices.find(v => v.lang.startsWith('en'));
  if (voice) {
    utterance.voice = voice;
  }
  
  window.speechSynthesis.speak(utterance);
};

/**
 * Decode base64 audio string and play it.
 * Returns a promise that resolves when playback ends or fails.
 */
const playBase64Audio = (base64Audio) => {
  try {
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([bytes], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    sarvamAudioRef = audio;

    return new Promise((resolve) => {
      audio.onended = () => {
        URL.revokeObjectURL(url);
        sarvamAudioRef = null;
        resolve();
      };
      audio.onerror = () => {
        console.warn('SARVAM audio playback error - falling back to Web Speech');
        URL.revokeObjectURL(url);
        sarvamAudioRef = null;
        resolve(false); // Signal fallback needed
      };
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => resolve(true)).catch((err) => {
          console.warn('SARVAM audio play blocked (likely autoplay policy):', err.message);
          URL.revokeObjectURL(url);
          sarvamAudioRef = null;
          resolve(false); // Signal fallback needed
        });
      }
    });
  } catch (error) {
    console.error('SARVAM base64 decode error:', error);
    sarvamAudioRef = null;
    return Promise.resolve(false);
  }
};

/**
 * Speak using SARVAM API for Indian languages.
 * Falls back to Web Speech API if SARVAM fails or autoplay is blocked.
 */
const speakWithSarvam = async (text, language) => {
  console.log(`[SARVAM] Requesting TTS for language: "${language}"`);
  
  try {
    const res = await fetch(`${backendUrl}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`[SARVAM] API error (${res.status}): ${errorText} - falling back to Web Speech`);
      speakWithWebSpeech(text, language);
      return;
    }

    const data = await res.json();
    
    if (!data.audio) {
      console.warn('[SARVAM] No audio in response - falling back to Web Speech');
      speakWithWebSpeech(text, language);
      return;
    }

    const played = await playBase64Audio(data.audio);
    if (!played) {
      console.log('[SARVAM] Playback failed - falling back to Web Speech');
      speakWithWebSpeech(text, language);
    }
  } catch (error) {
    console.warn('[SARVAM] Request failed:', error.message, '- falling back to Web Speech');
    speakWithWebSpeech(text, language);
  }
};

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // 1. Text to Speech (AI speaks)
  const speak = useCallback((text, language = 'English') => {
    if (typeof window === 'undefined') return;

    // Stop any current speech (both Web Speech and SARVAM)
    window.speechSynthesis.cancel();
    if (sarvamAudioRef) {
      sarvamAudioRef.pause();
      sarvamAudioRef = null;
    }

    // Use Web Speech API for English, SARVAM API for Indian languages
    if (WEB_SPEECH_LANGUAGES.includes(language)) {
      speakWithWebSpeech(text, language);
    } else {
      // Use SARVAM API for Indian languages
      speakWithSarvam(text, language);
    }
  }, []);

  // 2. Speech to Text (User speaks)
  const listen = useCallback((onResult, language = 'English') => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = LANG_MAP[language] || 'en-IN';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return { speak, listen, stopListening, isListening };
};
