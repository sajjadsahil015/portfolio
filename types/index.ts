export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name?: string | null;
  email: string;
  image?: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  iconUrl?: string | null;
  proficiency?: number | null;
  createdAt: Date;
}

export interface Experience {
  id: number;
  type: string;
  position: string;
  company: string;
  location?: string | null;
  startDate: Date;
  endDate?: Date | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string | null;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
