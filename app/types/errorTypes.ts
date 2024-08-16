import { AuthError, PostgrestError } from "@supabase/supabase-js";

export interface SupabaseAuthErrorType {
  status: "AUTH_ERROR";
  error?: AuthError | number;
  message: string;
}

export interface SupabasePostgrestErrorType {
  status: "POSTGREST_ERROR";
  error?: PostgrestError | string;
  message: string;
}

export type SupabaseActionReturnType = SupabaseAuthErrorType | SupabasePostgrestErrorType;

export const AUTH_ERROR_MESSAGES = {
  400: "아이디 혹은 비밀번호가 일치하지 않습니다.",
  401: "인증 에러가 발생했습니다.",
  403: "권한이 없습니다.",
  422: "이미 사용 중인 이메일입니다.",
};

export const POSTGREST_ERROR_MESSAGES = {
  "409": "이미 존재하는 데이터입니다.",
  "500": "데이터베이스 에러가 발생했습니다.",
  "400": "잘못된 요청입니다.",
  "404": "찾을 수 없는 데이터입니다.",
};
