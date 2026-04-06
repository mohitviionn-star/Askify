const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export const OPENAI_ENDPOINT = `${BACKEND_URL}/api`;
export const TTS_ENDPOINT = `${OPENAI_ENDPOINT}/tts`;
export const CHAT_COMPLETIONS_ENDPOINT = `${OPENAI_ENDPOINT}/chat-completions`;
export const MODELS_ENDPOINT = `${OPENAI_ENDPOINT}/models`;
