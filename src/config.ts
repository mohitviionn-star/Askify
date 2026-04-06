import env from './local.env.json';

export const OPENAI_DEFAULT_MODEL: string = (env as any).default_model;
export const OPENAI_DEFAULT_SYSTEM_PROMPT: string = (env as any).default_system_prompt;
