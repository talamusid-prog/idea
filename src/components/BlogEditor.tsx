import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Save, Eye, EyeOff } from "lucide-react";
import { createPost, updatePost } from "@/lib/blogService";
import { CreateBlogPost, BlogPost } from "@/lib/supabase";
import { showSuccess, showError, showWarning } from "@/lib/sweetAlert";

interface BlogEditorProps {
  post?: BlogPost; // Jika ada, mode edit
  onSave?: (post: BlogPost) => void;
  onCancel?: () => void;
}

const BlogEditor = ({ post, onSave, onCancel }: BlogEditorProps) => {
  const [formData, setFormData] = useState<CreateBlogPost>({
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    slug: post?.slug || "",
    featured_image: post?.featured_image || "",
    author: post?.author || "",
    tags: post?.tags || [],
    status: post?.status || "draft"
  });

  const [loading, setLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: keyof CreateBlogPost, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    handleInputChange("title", title);
    if (!post?.slug) {
      handleInputChange("slug", generateSlug(title));
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      handleInputChange("tags", [...(formData.tags || []), newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange("tags", formData.tags?.filter(tag => tag !== tagToRemove) || []);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.content || !formData.excerpt || !formData.slug || !formData.author) {
      showWarning("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    setLoading(true);
    try {
      let savedPost;
      if (post) {
        // Update existing post
        savedPost = await updatePost(post.id, formData);
      } else {
        // Create new post
        savedPost = await createPost(formData);
      }

      if (savedPost) {
        onSave?.(savedPost);
        showSuccess(post ? "Artikel berhasil diperbarui!" : "Artikel berhasil dibuat!");
      } else {
        showError("Terjadi kesalahan saat menyimpan artikel");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      showError("Terjadi kesalahan saat menyimpan artikel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                {post ? "Edit Artikel" : "Buat Artikel Baru"}
              </CardTitle>
              <CardDescription>
                {post ? "Perbarui artikel yang sudah ada" : "Buat artikel baru untuk blog Anda"}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {previewMode ? "Edit" : "Preview"}
              </Button>
              {onCancel && (
                <Button variant="outline" size="sm" onClick={onCancel}>
                  Batal
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!previewMode ? (
            // Edit Mode
            <>
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Judul Artikel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Masukkan judul artikel..."
                  className="text-lg"
                />
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="judul-artikel"
                  className="font-mono"
                />
                <p className="text-sm text-muted-foreground">
                  URL: /blog/{formData.slug}
                </p>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Ringkasan Artikel *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Ringkasan singkat artikel (akan ditampilkan di preview)..."
                  rows={3}
                />
              </div>

              {/* Featured Image */}
              <div className="space-y-2">
                <Label htmlFor="featured_image">Gambar Utama</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => handleInputChange("featured_image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">Penulis *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Nama penulis..."
                />
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Tambahkan tag..."
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button type="button" size="sm" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "draft" | "published") => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Konten Artikel *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Tulis konten artikel Anda di sini..."
                  rows={15}
                  className="font-mono"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="gradient-primary text-white"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {post ? "Update Artikel" : "Simpan Artikel"}
                </Button>
              </div>
            </>
          ) : (
            // Preview Mode
            <div className="space-y-6">
              {formData.featured_image && (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img
                    src={formData.featured_image}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div>
                <h1 className="text-3xl font-bold text-secondary mb-4">
                  {formData.title || "Judul Artikel"}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>Oleh: {formData.author || "Penulis"}</span>
                  <span>Status: {formData.status}</span>
                </div>

                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="prose max-w-none">
                  <p className="text-lg text-muted-foreground mb-6">
                    {formData.excerpt || "Ringkasan artikel..."}
                  </p>
                  
                  <div className="whitespace-pre-wrap">
                    {formData.content || "Konten artikel akan ditampilkan di sini..."}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogEditor;
