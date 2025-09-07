export interface ClassSection {
  id: string;
  name: string;
  capacity: number;
  currentStudents: number;
}

export interface ClassData {
  id: string;
  grade: string;
  gradeName: string;
  sections: ClassSection[];
  academicYear: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClassRequest {
  grade: string;
  gradeName: string;
  sections: Omit<ClassSection, 'id'>[];
  academicYear: string;
}

export interface UpdateClassRequest {
  id: string;
  grade?: string;
  gradeName?: string;
  sections?: ClassSection[];
  academicYear?: string;
  isActive?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface ApiError {
  status: number;
  data: {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
  };
}
