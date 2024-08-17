export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          emoji: string | null
          id: number
          parent_comment_id: number | null
          session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          emoji?: string | null
          id?: number
          parent_comment_id?: number | null
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          emoji?: string | null
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
            foreignKeyName: "public_comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments_view"
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
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          image_url: string | null
          name: string | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
            foreignKeyName: "public_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "review_results_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "public_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "public_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      review_seen: {
        Row: {
          parent_id: string
          seen: boolean | null
          session_id: string
          student_id: string
        }
        Insert: {
          parent_id?: string
          seen?: boolean | null
          session_id?: string
          student_id?: string
        }
        Update: {
          parent_id?: string
          seen?: boolean | null
          session_id?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_seen_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "review_seen_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "review_seen_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_seen_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "review_seen_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "review_seen_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_visibility_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "review_results_view"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "review_visibility_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["session_id"]
          },
          {
            foreignKeyName: "review_visibility_session_id_fkey"
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
            foreignKeyName: "sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "sessions_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "sessions_evaluator_id_fkey"
            columns: ["evaluator_id"]
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
          parent_id: string | null
          student_code: string | null
          student_id: string | null
        }
        Insert: {
          class_id?: string | null
          id?: number
          parent_id?: string | null
          student_code?: string | null
          student_id?: string | null
        }
        Update: {
          class_id?: string | null
          id?: number
          parent_id?: string | null
          student_code?: string | null
          student_id?: string | null
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
          {
            foreignKeyName: "students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
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
            foreignKeyName: "public_user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
          {
            foreignKeyName: "public_user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
            foreignKeyName: "user_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
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
      comments_view: {
        Row: {
          comment: string | null
          created_at: string | null
          emoji: string | null
          id: number | null
          name: string | null
          session_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_comments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
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
        ]
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
            foreignKeyName: "sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_class_id_fkey"
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
            foreignKeyName: "sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_evaluatee_id_fkey"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "sessions_evaluatee_id_fkey"
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
          {
            foreignKeyName: "students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "students_parents_student_id_fkey"
            columns: ["student_id"]
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
            foreignKeyName: "sessions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_class_id_fkey"
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
            foreignKeyName: "public_user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "class_students_view"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "public_user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "session_results"
            referencedColumns: ["evaluator_id"]
          },
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
