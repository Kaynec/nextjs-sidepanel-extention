export interface TranslateResponse {
  id: string
  choices?: ChoicesEntity[] | null
  created: number
  model: string
  object: string
  system_fingerprint?: null
  usage: Usage
}
export interface ChoicesEntity {
  finish_reason: string
  index: number
  logprobs?: null
  message: Message
}
export interface Message {
  content: string
  role: string
  function_call?: null
  tool_calls?: null
}
export interface Usage {
  completion_tokens: number
  prompt_tokens: number
  total_tokens: number
}
