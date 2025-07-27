'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Users, 
  FileText, 
  Heart, 
  Eye, 
  Share2,
  Plus,
  Search,
  Filter,
  Calendar,
  BookOpen,
  Download,
  TrendingUp,
  Bell
} from "lucide-react";
import { useConfig } from "@/hooks/useConfig";
import { 
  Post, 
  Comment, 
  Forum, 
  Resource,
  getFeedPosts, 
  getForums, 
  getResources,
  getPortalStats,
  searchPosts,
  getPostsByType
} from "@/lib/portal";

// ID temporal de organización para testing
const TEMP_ORG_ID = "temp-org-id";

export default function PortalPage() {
  const { config } = useConfig();
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState<Post[]>([]);
  const [forums, setForums] = useState<Forum[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalForums: 0,
    totalResources: 0,
    totalViews: 0,
    totalLikes: 0,
    totalDownloads: 0,
    activeUsers: 0,
    engagementRate: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Cargar datos
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [postsData, forumsData, resourcesData, statsData] = await Promise.all([
          getFeedPosts(TEMP_ORG_ID),
          getForums(TEMP_ORG_ID),
          getResources(TEMP_ORG_ID),
          getPortalStats(TEMP_ORG_ID)
        ]);
        
        setPosts(postsData);
        setForums(forumsData);
        setResources(resourcesData);
        setStats(statsData);
      } catch (error) {
        console.error('Error loading portal data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Función para obtener el color del badge según el tipo de post
  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'discussion': return 'bg-purple-100 text-purple-800';
      case 'resource': return 'bg-orange-100 text-orange-800';
      case 'achievement': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el texto del tipo de post
  const getPostTypeText = (type: string) => {
    switch (type) {
      case 'announcement': return 'Anuncio';
      case 'event': return 'Evento';
      case 'discussion': return 'Discusión';
      case 'resource': return 'Recurso';
      case 'achievement': return 'Logro';
      default: return type;
    }
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para formatear número
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Portal de Miembros</h1>
              <span className="text-sm text-gray-500">{config.organization.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificaciones
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Crear Post
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Miembros Activos</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeUsers}</div>
              <p className="text-xs text-gray-600">En línea ahora</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.engagementRate}%</div>
              <p className="text-xs text-gray-600">Tasa de participación</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalPosts}</div>
              <p className="text-xs text-gray-600">{stats.totalComments} comentarios</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recursos</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.totalResources}</div>
              <p className="text-xs text-gray-600">{formatNumber(stats.totalDownloads)} descargas</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar posts, recursos, miembros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="forums">Foros</TabsTrigger>
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          {/* Feed Tab */}
          <TabsContent value="feed" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {post.author_avatar ? (
                              <img src={post.author_avatar} alt={post.author_name} className="w-10 h-10 rounded-full" />
                            ) : (
                              <Users className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{post.author_name}</p>
                            <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPostTypeColor(post.type)}>
                            {getPostTypeText(post.type)}
                          </Badge>
                          {post.is_pinned && (
                            <Badge className="bg-yellow-100 text-yellow-800">Fijado</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600">{post.content}</p>
                      </div>
                      
                      {post.image_url && (
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                      
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{formatNumber(post.likes)}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">{formatNumber(post.comments)}</span>
                          </button>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">{formatNumber(post.views)}</span>
                          </div>
                        </div>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Actividad Reciente</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Posts hoy</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Comentarios</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Likes</span>
                      <span className="font-medium">128</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Temas Populares</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {['#startup', '#financiamiento', '#networking', '#tecnología', '#mentoría'].map((tag) => (
                      <div key={tag} className="flex items-center justify-between">
                        <span className="text-sm text-blue-600">{tag}</span>
                        <Badge variant="outline" className="text-xs">24 posts</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Forums Tab */}
          <TabsContent value="forums" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forums.map((forum) => (
                <Card key={forum.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{forum.name}</span>
                      {forum.is_private && (
                        <Badge className="bg-red-100 text-red-800">Privado</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{forum.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Temas</span>
                      <span className="font-medium">{forum.topics_count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Posts</span>
                      <span className="font-medium">{forum.posts_count}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Última actividad</span>
                      <span className="text-gray-500">{formatDate(forum.last_activity)}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      Ver Foro
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{resource.title}</span>
                      {resource.is_featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">Destacado</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span className="capitalize">{resource.type}</span>
                      {resource.file_size && (
                        <span>• {(resource.file_size / 1024 / 1024).toFixed(1)} MB</span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Download className="h-4 w-4" />
                        <span>{formatNumber(resource.downloads)} descargas</span>
                      </div>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Próximos Eventos
              </h3>
              <p className="text-gray-600 mb-4">
                Los eventos aparecerán aquí cuando se programen
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Evento
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 