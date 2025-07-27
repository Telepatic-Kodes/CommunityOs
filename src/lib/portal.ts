import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Post {
  id: string;
  organization_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  type: 'announcement' | 'event' | 'discussion' | 'resource' | 'achievement';
  title: string;
  content: string;
  image_url?: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  is_pinned: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
}

export interface Forum {
  id: string;
  organization_id: string;
  name: string;
  description: string;
  category: string;
  topics_count: number;
  posts_count: number;
  last_activity: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface ForumTopic {
  id: string;
  forum_id: string;
  author_id: string;
  author_name: string;
  title: string;
  content: string;
  views: number;
  replies: number;
  is_sticky: boolean;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'template' | 'guide';
  url: string;
  file_size?: number;
  file_type?: string;
  downloads: number;
  tags: string[];
  is_featured: boolean;
  is_public: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  type: 'announcement' | 'event' | 'discussion' | 'resource' | 'achievement';
  title: string;
  content: string;
  image_url?: string;
  tags: string[];
}

export interface CreateCommentData {
  content: string;
}

// Datos de ejemplo para testing
const mockPosts: Post[] = [
  {
    id: '1',
    organization_id: 'temp-org-id',
    author_id: 'admin-1',
    author_name: 'Admin AIAIAI',
    author_avatar: '/avatars/admin.jpg',
    type: 'announcement',
    title: '¡Bienvenidos al nuevo portal de miembros!',
    content: 'Estamos emocionados de presentarles nuestro nuevo portal de miembros. Aquí podrán conectarse, compartir experiencias y acceder a recursos exclusivos de la comunidad.',
    image_url: '/images/portal-welcome.jpg',
    tags: ['bienvenida', 'portal', 'comunidad'],
    likes: 45,
    comments: 12,
    views: 234,
    is_pinned: true,
    is_featured: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    organization_id: 'temp-org-id',
    author_id: 'member-1',
    author_name: 'María González',
    author_avatar: '/avatars/maria.jpg',
    type: 'event',
    title: 'Taller de Pitch Deck - Próximo 15 de Febrero',
    content: '¿Estás preparando tu pitch deck? Únete a nuestro taller práctico donde aprenderás a crear presentaciones impactantes para inversores.',
    image_url: '/images/pitch-workshop.jpg',
    tags: ['evento', 'pitch', 'workshop', 'inversión'],
    likes: 32,
    comments: 8,
    views: 156,
    is_pinned: false,
    is_featured: true,
    created_at: '2024-01-20T14:30:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    organization_id: 'temp-org-id',
    author_id: 'member-2',
    author_name: 'Carlos Rodríguez',
    author_avatar: '/avatars/carlos.jpg',
    type: 'discussion',
    title: '¿Qué herramientas usan para gestión de proyectos?',
    content: 'Estoy buscando recomendaciones de herramientas para gestionar proyectos de desarrollo. ¿Qué están usando actualmente y qué les funciona mejor?',
    tags: ['herramientas', 'proyectos', 'desarrollo', 'productividad'],
    likes: 18,
    comments: 15,
    views: 89,
    is_pinned: false,
    is_featured: false,
    created_at: '2024-01-22T09:15:00Z',
    updated_at: '2024-01-22T09:15:00Z'
  },
  {
    id: '4',
    organization_id: 'temp-org-id',
    author_id: 'admin-1',
    author_name: 'Admin AIAIAI',
    author_avatar: '/avatars/admin.jpg',
    type: 'resource',
    title: 'Guía completa de financiamiento para startups',
    content: 'Hemos actualizado nuestra guía de financiamiento con las últimas tendencias y opciones disponibles para startups en Chile.',
    image_url: '/images/financing-guide.jpg',
    tags: ['financiamiento', 'startup', 'guía', 'recursos'],
    likes: 67,
    comments: 5,
    views: 312,
    is_pinned: false,
    is_featured: true,
    created_at: '2024-01-18T16:45:00Z',
    updated_at: '2024-01-18T16:45:00Z'
  }
];

const mockComments: Comment[] = [
  {
    id: '1',
    post_id: '1',
    author_id: 'member-1',
    author_name: 'María González',
    author_avatar: '/avatars/maria.jpg',
    content: '¡Excelente iniciativa! Ya estoy explorando las nuevas funcionalidades.',
    likes: 5,
    created_at: '2024-01-15T11:30:00Z',
    updated_at: '2024-01-15T11:30:00Z'
  },
  {
    id: '2',
    post_id: '1',
    author_id: 'member-2',
    author_name: 'Carlos Rodríguez',
    author_avatar: '/avatars/carlos.jpg',
    content: 'Me encanta la nueva interfaz, mucho más intuitiva.',
    likes: 3,
    created_at: '2024-01-15T12:15:00Z',
    updated_at: '2024-01-15T12:15:00Z'
  },
  {
    id: '3',
    post_id: '3',
    author_id: 'member-3',
    author_name: 'Ana Martínez',
    author_avatar: '/avatars/ana.jpg',
    content: 'Yo uso Notion para todo, es súper versátil y fácil de usar.',
    likes: 8,
    created_at: '2024-01-22T10:00:00Z',
    updated_at: '2024-01-22T10:00:00Z'
  }
];

const mockForums: Forum[] = [
  {
    id: '1',
    organization_id: 'temp-org-id',
    name: 'Emprendimiento',
    description: 'Discusiones sobre emprendimiento, startups y negocios',
    category: 'general',
    topics_count: 45,
    posts_count: 234,
    last_activity: '2024-01-22T15:30:00Z',
    is_private: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-22T15:30:00Z'
  },
  {
    id: '2',
    organization_id: 'temp-org-id',
    name: 'Tecnología',
    description: 'Temas relacionados con tecnología, desarrollo y innovación',
    category: 'tech',
    topics_count: 32,
    posts_count: 189,
    last_activity: '2024-01-21T14:20:00Z',
    is_private: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-21T14:20:00Z'
  },
  {
    id: '3',
    organization_id: 'temp-org-id',
    name: 'Networking',
    description: 'Conecta con otros miembros y comparte oportunidades',
    category: 'networking',
    topics_count: 28,
    posts_count: 156,
    last_activity: '2024-01-20T11:45:00Z',
    is_private: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-20T11:45:00Z'
  },
  {
    id: '4',
    organization_id: 'temp-org-id',
    name: 'Mentoría',
    description: 'Foro exclusivo para mentores y mentees',
    category: 'mentorship',
    topics_count: 15,
    posts_count: 67,
    last_activity: '2024-01-19T16:15:00Z',
    is_private: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-19T16:15:00Z'
  }
];

const mockResources: Resource[] = [
  {
    id: '1',
    organization_id: 'temp-org-id',
    title: 'Plantilla de Pitch Deck',
    description: 'Plantilla profesional para crear presentaciones de pitch deck',
    type: 'template',
    url: '/resources/pitch-deck-template.pptx',
    file_size: 2048576,
    file_type: 'pptx',
    downloads: 156,
    tags: ['pitch', 'presentación', 'template', 'startup'],
    is_featured: true,
    is_public: true,
    created_by: 'admin-1',
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '2',
    organization_id: 'temp-org-id',
    title: 'Guía de Financiamiento 2024',
    description: 'Guía completa sobre opciones de financiamiento para startups',
    type: 'document',
    url: '/resources/financing-guide-2024.pdf',
    file_size: 5120000,
    file_type: 'pdf',
    downloads: 89,
    tags: ['financiamiento', 'startup', 'guía', '2024'],
    is_featured: true,
    is_public: true,
    created_by: 'admin-1',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    organization_id: 'temp-org-id',
    title: 'Webinar: Marketing Digital para Startups',
    description: 'Grabación del webinar sobre estrategias de marketing digital',
    type: 'video',
    url: 'https://youtube.com/watch?v=example',
    downloads: 234,
    tags: ['marketing', 'digital', 'webinar', 'startup'],
    is_featured: false,
    is_public: true,
    created_by: 'admin-1',
    created_at: '2024-01-12T00:00:00Z',
    updated_at: '2024-01-12T00:00:00Z'
  }
];

// Obtener posts del feed
export async function getFeedPosts(organizationId: string, limit: number = 20): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockPosts
    .filter(post => post.organization_id === organizationId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

// Obtener un post específico
export async function getPost(postId: string): Promise<Post | null> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return mockPosts.find(post => post.id === postId) || null;
}

// Crear un nuevo post
export async function createPost(organizationId: string, authorId: string, authorName: string, postData: CreatePostData): Promise<Post> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  const newPost: Post = {
    id: Date.now().toString(),
    organization_id: organizationId,
    author_id: authorId,
    author_name: authorName,
    ...postData,
    likes: 0,
    comments: 0,
    views: 0,
    is_pinned: false,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockPosts.push(newPost);
  return newPost;
}

// Obtener comentarios de un post
export async function getPostComments(postId: string): Promise<Comment[]> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  return mockComments
    .filter(comment => comment.post_id === postId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

// Crear un comentario
export async function createComment(postId: string, authorId: string, authorName: string, commentData: CreateCommentData): Promise<Comment> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  const newComment: Comment = {
    id: Date.now().toString(),
    post_id: postId,
    author_id: authorId,
    author_name: authorName,
    ...commentData,
    likes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  
  mockComments.push(newComment);
  
  // Actualizar contador de comentarios del post
  const post = mockPosts.find(p => p.id === postId);
  if (post) {
    post.comments += 1;
    post.updated_at = new Date().toISOString();
  }
  
  return newComment;
}

// Dar like a un post
export async function likePost(postId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
  const post = mockPosts.find(p => p.id === postId);
  if (post) {
    post.likes += 1;
    post.updated_at = new Date().toISOString();
  }
}

// Obtener foros
export async function getForums(organizationId: string): Promise<Forum[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockForums.filter(forum => forum.organization_id === organizationId);
}

// Obtener recursos
export async function getResources(organizationId: string, isPublic: boolean = true): Promise<Resource[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockResources
    .filter(resource => 
      resource.organization_id === organizationId && 
      (isPublic ? resource.is_public : true)
    )
    .sort((a, b) => b.downloads - a.downloads);
}

// Buscar posts
export async function searchPosts(organizationId: string, query: string): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const searchTerm = query.toLowerCase();
  
  return mockPosts.filter(post => 
    post.organization_id === organizationId &&
    (post.title.toLowerCase().includes(searchTerm) ||
     post.content.toLowerCase().includes(searchTerm) ||
     post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
  );
}

// Obtener posts por tipo
export async function getPostsByType(organizationId: string, type: Post['type']): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockPosts
    .filter(post => post.organization_id === organizationId && post.type === type)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

// Obtener estadísticas del portal
export async function getPortalStats(organizationId: string) {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  const posts = mockPosts.filter(p => p.organization_id === organizationId);
  const comments = mockComments.filter(c => 
    posts.some(p => p.id === c.post_id)
  );
  const forums = mockForums.filter(f => f.organization_id === organizationId);
  const resources = mockResources.filter(r => r.organization_id === organizationId);
  
  return {
    totalPosts: posts.length,
    totalComments: comments.length,
    totalForums: forums.length,
    totalResources: resources.length,
    totalViews: posts.reduce((sum, p) => sum + p.views, 0),
    totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
    totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0),
    activeUsers: 156, // Simulado
    engagementRate: 78.5, // Porcentaje simulado
  };
}

// Marcar post como visto
export async function markPostAsViewed(postId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  const post = mockPosts.find(p => p.id === postId);
  if (post) {
    post.views += 1;
  }
}

// Descargar recurso
export async function downloadResource(resourceId: string): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate download time
  const resource = mockResources.find(r => r.id === resourceId);
  if (!resource) throw new Error('Resource not found');
  
  resource.downloads += 1;
  return resource.url;
} 