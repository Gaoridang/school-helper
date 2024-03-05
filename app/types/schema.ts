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
      activities: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      evaluation_items: {
        Row: {
          class_id: string
          content: string
          created_at: string | null
          creator_id: string
          date: string | null
          id: number
          period: string
          subject_name: string
          template_id: number | null
          updated_at: string | null
        }
        Insert: {
          class_id: string
          content: string
          created_at?: string | null
          creator_id: string
          date?: string | null
          id?: number
          period: string
          subject_name: string
          template_id?: number | null
          updated_at?: string | null
        }
        Update: {
          class_id?: string
          content?: string
          created_at?: string | null
          creator_id?: string
          date?: string | null
          id?: number
          period?: string
          subject_name?: string
          template_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "evaluation_summary_view"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "fk_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "evaluation_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "session_evaluation_summary"
            referencedColumns: ["template_id"]
          }
        ]
      }
      evaluation_results: {
        Row: {
          created_at: string | null
          evaluatee_id: string
          evaluator_id: string
          id: number
          is_passed: boolean | null
          item_id: number
          session_id: string | null
          template_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          evaluatee_id: string
          evaluator_id: string
          id?: number
          is_passed?: boolean | null
          item_id: number
          session_id?: string | null
          template_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          evaluatee_id?: string
          evaluator_id?: string
          id?: number
          is_passed?: boolean | null
          item_id?: number
          session_id?: string | null
          template_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_evaluatee"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_evaluator"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_item"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "evaluation_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_session_id"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "evaluation_summary_view"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "fk_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "evaluation_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_template"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "session_evaluation_summary"
            referencedColumns: ["template_id"]
          }
        ]
      }
      evaluation_templates: {
        Row: {
          class_id: string
          created_at: string | null
          creator_id: string
          date: string
          id: number
          period: string
          subject_name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          class_id: string
          created_at?: string | null
          creator_id: string
          date: string
          id?: number
          period: string
          subject_name: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          class_id?: string
          created_at?: string | null
          creator_id?: string
          date?: string
          id?: number
          period?: string
          subject_name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
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
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          activity_id: number | null
          content: string
          created_at: string
          id: number
        }
        Insert: {
          activity_id?: number | null
          content: string
          created_at?: string
          id?: number
        }
        Update: {
          activity_id?: number | null
          content?: string
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_questions_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          creator_id: string
          id: string
          start_time: string | null
          template_id: number
        }
        Insert: {
          creator_id: string
          id?: string
          start_time?: string | null
          template_id: number
        }
        Update: {
          creator_id?: string
          id?: string
          start_time?: string | null
          template_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_sessions_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "evaluation_summary_view"
            referencedColumns: ["template_id"]
          },
          {
            foreignKeyName: "evaluation_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "evaluation_templates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluation_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "session_evaluation_summary"
            referencedColumns: ["template_id"]
          }
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
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_classes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
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
      evaluation_session_view: {
        Row: {
          content: string | null
          is_passed: boolean | null
          session_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_session_id"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          }
        ]
      }
      evaluation_summary_view: {
        Row: {
          contents: Json | null
          date: string | null
          evaluatee_id: string | null
          period: string | null
          subject_name: string | null
          template_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_evaluatee"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      session_evaluation_summary: {
        Row: {
          class_id: string | null
          date: string | null
          evaluatee_id: string | null
          period: string | null
          session_id: string | null
          subject_name: string | null
          template_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_class"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_evaluatee"
            columns: ["evaluatee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_session_id"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          }
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
          }
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
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
