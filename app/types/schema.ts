export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      classes: {
        Row: {
          class_code: string
          class_number: number
          created_at: string
          grade: number
          id: string
          is_primary: boolean | null
          school: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          class_code: string
          class_number: number
          created_at?: string
          grade: number
          id?: string
          is_primary?: boolean | null
          school: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          class_code?: string
          class_number?: number
          created_at?: string
          grade?: number
          id?: string
          is_primary?: boolean | null
          school?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "public_classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          comment: string | null
          created_at: string
          id: number
          parent_comment_id: number | null
          session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: number
          parent_comment_id?: number | null
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: number
          parent_comment_id?: number | null
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "review_results_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "public_comments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "public_comments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "public_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          class_id: string
          content: string
          creator_id: string | null
          id: number
          template_id: number | null
        }
        Insert: {
          class_id: string
          content: string
          creator_id?: string | null
          id?: number
          template_id?: number | null
        }
        Update: {
          class_id?: string
          content?: string
          creator_id?: string | null
          id?: number
          template_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_class"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "fk_class"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_creator"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_creator"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "fk_creator"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "assessment_view"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "public_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates_view"
            referencedColumns: ["template_id"]
          },
        ]
      }
      results: {
        Row: {
          id: number
          is_passed: boolean
          item_id: number
          session_id: string
        }
        Insert: {
          id?: number
          is_passed: boolean
          item_id: number
          session_id: string
        }
        Update: {
          id?: number
          is_passed?: boolean
          item_id?: number
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "assessment_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "fk_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_session_id"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "review_results_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "fk_session_id"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "fk_session_id"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          class_id: string | null
          date: string | null
          evaluatee_id: string | null
          evaluator_id: string | null
          id: string
          template_id: number
        }
        Insert: {
          class_id?: string | null
          date?: string | null
          evaluatee_id?: string | null
          evaluator_id?: string | null
          id?: string
          template_id: number
        }
        Update: {
          class_id?: string | null
          date?: string | null
          evaluatee_id?: string | null
          evaluator_id?: string | null
          id?: string
          template_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_sessions_creator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "evaluation_sessions_creator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "evaluation_sessions_creator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "assessment_view"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "evaluation_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates_view"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "public_sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      students_parents: {
        Row: {
          class_id: string | null
          id: number
          parent_id: string
          student_code: string
          student_id: string
        }
        Insert: {
          class_id?: string | null
          id?: number
          parent_id: string
          student_code: string
          student_id: string
        }
        Update: {
          class_id?: string | null
          id?: number
          parent_id?: string
          student_code?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_students_parents_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "public_students_parents_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "public_students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "students_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "students_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_parents_student_code_fkey"
            columns: ["student_code"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["student_code"]
          },
        ]
      }
      templates: {
        Row: {
          class_id: string | null
          created_at: string | null
          creator_id: string | null
          end_date: string | null
          id: number
          period: string | null
          start_date: string | null
          subject: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          end_date?: string | null
          id?: number
          period?: string | null
          start_date?: string | null
          subject?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          creator_id?: string | null
          end_date?: string | null
          id?: number
          period?: string | null
          start_date?: string | null
          subject?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_creator"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fk_creator"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "fk_creator"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_templates_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "public_templates_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_classes: {
        Row: {
          class_id: string
          is_primary: boolean | null
          role: string | null
          user_id: string
        }
        Insert: {
          class_id: string
          is_primary?: boolean | null
          role?: string | null
          user_id: string
        }
        Update: {
          class_id?: string
          is_primary?: boolean | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "user_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          detail_role: string | null
          email: string
          id: string
          name: string
          role: string
          student_code: string | null
          student_number: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          detail_role?: string | null
          email: string
          id?: string
          name: string
          role: string
          student_code?: string | null
          student_number?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          detail_role?: string | null
          email?: string
          id?: string
          name?: string
          role?: string
          student_code?: string | null
          student_number?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      assessment_view: {
        Row: {
          content: string | null
          item_id: number | null
          period: string | null
          subject: string | null
          template_created_at: string | null
          template_id: number | null
        }
        Relationships: []
      }
      class_students_view: {
        Row: {
          class_id: string | null
          name: string | null
          user_id: string | null
        }
        Relationships: []
      }
      review_results_view: {
        Row: {
          class_id: string | null
          content: string | null
          evaluatee_name: string | null
          evaluator_name: string | null
          is_passed: boolean | null
          item_id: number | null
          period: string | null
          session_date: string | null
          session_id: string | null
          subject: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "assessment_view"
            referencedColumns: ["item_id"]
          },
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
        ]
      }
      session_results: {
        Row: {
          class_id: string | null
          evaluatee_id: string | null
          evaluatee_name: string | null
          evaluator_id: string | null
          evaluator_name: string | null
          first_comment: string | null
          period: string | null
          session_date: string | null
          session_id: string | null
          subject: string | null
          total_passed: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "public_sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
        ]
      }
      student_with_class_parents: {
        Row: {
          class_id: string | null
          name: string | null
          parent_id: string | null
          student_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_students_parents_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_students_parents_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "public_students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "students_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "students_parents_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
        ]
      }
      templates_view: {
        Row: {
          class_id: string | null
          created_at: string | null
          end_date: string | null
          period: string | null
          start_date: string | null
          subject: string | null
          template_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
        ]
      }
      user_class_details: {
        Row: {
          class_code: string | null
          class_id: string | null
          class_number: number | null
          grade: number | null
          is_primary: boolean | null
          school: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "teacher" | "student" | "parents"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
