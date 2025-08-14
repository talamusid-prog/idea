import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star,
  StarOff,
  ArrowLeft,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  Download
} from "lucide-react";
import { getAllPortfolios, createPortfolioWithSlug, updatePortfolioBySlug, deletePortfolio } from "@/lib/portfolioService";
import { savePortfolioImage, getPortfolioImage } from "@/lib/portfolioImageService";
import { Portfolio, CreatePortfolio } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { showSuccess, showError, showWarning, showConfirm } from "@/lib/sweetAlert";

const AdminPortfolio = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    category: "",
    technologies: [] as string[],
    project_url: "",
    github_url: "",
    featured_image: "",
    status: "draft" as "draft" | "published",
    featured: false
  });

  const [technologyInput, setTechnologyInput] = useState("");

  useEffect(() => {
    loadPortfolios();
    // Cleanup unused local images on component mount
    cleanupUnusedLocalImages();
  }, []);

  // Fungsi untuk menyimpan gambar menggunakan service baru
  const saveImageToLocal = async (file: File): Promise<string | null> => {
    return await savePortfolioImage(file);
  };

  // Fungsi untuk mengambil gambar dari storage
  const getImageFromLocal = (imageKey: string): string | null => {
    try {
      const image = getPortfolioImage(imageKey);
      return image;
    } catch (error) {
      console.error('❌ Error getting image from storage:', error);
      return null;
    }
  };

  // Fungsi untuk handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validasi file type
      if (!file.type.startsWith('image/')) {
        showWarning('Pilih file gambar yang valid!');
        return;
      }

      // Validasi file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showWarning('Ukuran file maksimal 5MB!');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi untuk trigger file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Fungsi untuk handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        if (file.size <= 5 * 1024 * 1024) {
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          showWarning('Ukuran file maksimal 5MB!');
        }
      } else {
        showWarning('Pilih file gambar yang valid!');
      }
    }
  };

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      const data = await getAllPortfolios();
      setPortfolios(data);
      // Cleanup unused local images after loading portfolios
      setTimeout(() => cleanupUnusedLocalImages(), 100);
    } catch (error) {
      console.error("❌ Error loading portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      showWarning("Judul dan deskripsi harus diisi!");
      return;
    }

    try {
      setIsUploading(true);
      
      let imageUrl = formData.featured_image;
      
      // Save image to local storage if file is selected
      if (selectedFile) {
        const imageKey = await saveImageToLocal(selectedFile);
        if (imageKey) {
          imageUrl = imageKey; // Simpan key sebagai URL
        } else {
          console.error('❌ Failed to save image to local storage');
          showError("Gagal menyimpan gambar. Silakan coba lagi.");
          setIsUploading(false);
          return;
        }
      }
      
      const portfolioData: Omit<CreatePortfolio, 'slug'> = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        client: formData.client.trim(),
        category: formData.category.trim(),
        technologies: formData.technologies,
        project_url: formData.project_url.trim() || undefined,
        github_url: formData.github_url.trim() || undefined,
        featured_image: imageUrl || undefined,
        status: formData.status,
        featured: formData.featured
      };

      let success = false;
      
      if (editingPortfolio) {
        // Update existing portfolio
        success = await updatePortfolioBySlug(editingPortfolio.slug, portfolioData);
        if (success) {
          showSuccess("Portofolio berhasil diperbarui!");
        }
      } else {
        // Create new portfolio
        success = await createPortfolioWithSlug(portfolioData);
        if (success) {
          showSuccess("Portofolio berhasil dibuat!");
        }
      }

      if (success) {
        setIsModalOpen(false);
        resetForm();
        loadPortfolios();
      } else {
        console.error('❌ Failed to save portfolio');
        showError("Gagal menyimpan portofolio. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      showError("Terjadi kesalahan saat menyimpan portofolio.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      title: portfolio.title,
      description: portfolio.description,
      client: portfolio.client,
      category: portfolio.category,
      technologies: portfolio.technologies,
      project_url: portfolio.project_url || "",
      github_url: portfolio.github_url || "",
      featured_image: portfolio.featured_image || "",
      status: portfolio.status,
      featured: portfolio.featured
    });
    // Set image preview if portfolio has featured image
    if (portfolio.featured_image) {
      // Check if it's a local storage key or external URL
      if (portfolio.featured_image.startsWith('portfolio-image-')) {
        const localImage = getImageFromLocal(portfolio.featured_image);
        setImagePreview(localImage || "");
      } else {
        setImagePreview(portfolio.featured_image);
      }
    } else {
      setImagePreview("");
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus portofolio ini?")) {
      try {
        // Find portfolio to get featured_image
        const portfolio = portfolios.find(p => p.id === id);
        
        const success = await deletePortfolio(id);
        if (success) {
          // Clean up local storage if image was stored locally
          if (portfolio?.featured_image?.startsWith('portfolio-image-')) {
            localStorage.removeItem(portfolio.featured_image);
          }
          
          showSuccess("Portofolio berhasil dihapus!");
          loadPortfolios();
        } else {
          showError("Gagal menghapus portofolio.");
        }
      } catch (error) {
        console.error("Error deleting portfolio:", error);
        showError("Terjadi kesalahan saat menghapus portofolio.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      client: "",
      category: "",
      technologies: [],
      project_url: "",
      github_url: "",
      featured_image: "",
      status: "draft",
      featured: false
    });
    setTechnologyInput("");
    setEditingPortfolio(null);
    setSelectedFile(null);
    setImagePreview("");
  };

  // Fungsi untuk membersihkan local storage yang tidak terpakai
  const cleanupUnusedLocalImages = () => {
    try {
      const keys = Object.keys(localStorage);
      const imageKeys = keys.filter(key => key.startsWith('portfolio-image-'));
      
      // Get all portfolio image keys from database
      const portfolioImageKeys = portfolios
        .map(p => p.featured_image)
        .filter(img => img?.startsWith('portfolio-image-'));
      
      // Remove unused image keys
      imageKeys.forEach(key => {
        if (!portfolioImageKeys.includes(key)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error cleaning up local storage:', error);
    }
  };

  // Fungsi untuk export data portfolio dengan gambar
  const exportPortfolioData = () => {
    try {
      const exportData = portfolios.map(portfolio => {
        let imageData = null;
        if (portfolio.featured_image?.startsWith('portfolio-image-')) {
          imageData = getImageFromLocal(portfolio.featured_image);
        }
        
        return {
          ...portfolio,
          localImageData: imageData
        };
      });
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
      showSuccess('Data portfolio berhasil di-export!');
    } catch (error) {
      console.error('Error exporting data:', error);
      showError('Gagal export data portfolio.');
    }
  };

  const addTechnology = () => {
    if (technologyInput.trim() && !formData.technologies.includes(technologyInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, technologyInput.trim()]
      }));
      setTechnologyInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat portofolio...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-secondary">Kelola Portofolio</h1>
              <p className="text-muted-foreground">Kelola semua portofolio proyek</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={exportPortfolioData} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button onClick={openModal} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tambah Portofolio
            </Button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  {portfolio.featured_image ? (
                    <div className="aspect-video overflow-hidden rounded-lg mb-4">
                                             {(() => {
                         const imageSrc = portfolio.featured_image.startsWith('portfolio-image-') 
                           ? getImageFromLocal(portfolio.featured_image) || ''
                           : portfolio.featured_image;
                         return (
                           <img
                             src={imageSrc}
                             alt={portfolio.title}
                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                           />
                         );
                       })()}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center rounded-lg mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                      {portfolio.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Client: {portfolio.client}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {portfolio.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    {portfolio.status === 'published' ? (
                      <Eye className="h-4 w-4 text-green-500" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {portfolio.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {portfolio.category}
                  </Badge>
                  {portfolio.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {portfolio.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{portfolio.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>Dibuat: {formatDate(portfolio.created_at)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(portfolio)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(portfolio.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {portfolios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Belum ada portofolio yang dibuat.
            </p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-secondary">
                    {editingPortfolio ? "Edit Portofolio" : "Tambah Portofolio"}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={closeModal}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Judul Proyek *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Masukkan judul proyek"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="client">Client</Label>
                      <Input
                        id="client"
                        value={formData.client}
                        onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                        placeholder="Nama client"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Deskripsi proyek"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Kategori</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        placeholder="Web Development, Mobile App, dll"
                      />
                    </div>
                    <div>
                      <Label>Gambar Portfolio</Label>
                      <div className="space-y-3">
                        {/* Hidden file input */}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        
                        {/* Drag & Drop Area */}
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          onClick={isUploading ? undefined : triggerFileInput}
                          className={`
                            border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300
                            ${isUploading 
                              ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                              : selectedFile || imagePreview 
                                ? 'border-primary bg-primary/5 cursor-pointer' 
                                : 'border-gray-300 hover:border-primary hover:bg-primary/5 cursor-pointer'
                            }
                          `}
                        >
                          {isUploading ? (
                            <div className="space-y-2">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                              <p className="text-sm font-medium text-primary">
                                Uploading...
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Mohon tunggu sebentar
                              </p>
                            </div>
                          ) : selectedFile || imagePreview ? (
                            <div className="space-y-2">
                              <ImageIcon className="h-8 w-8 mx-auto text-primary" />
                              <p className="text-sm font-medium text-primary">
                                {selectedFile ? selectedFile.name : 'Gambar dipilih'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Klik untuk ganti gambar atau drag & drop
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                              <p className="text-sm font-medium">
                                Klik untuk pilih gambar atau drag & drop
                              </p>
                              <p className="text-xs text-muted-foreground">
                                JPG, PNG, WebP, GIF (max 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Image preview */}
                        {(imagePreview || selectedFile) && (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setSelectedFile(null);
                                setImagePreview("");
                                setFormData(prev => ({ ...prev, featured_image: "" }));
                              }}
                              className="absolute top-2 right-2"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                        
                        {/* File info */}
                        <div className="text-xs text-muted-foreground">
                          <p>Format yang didukung: JPG, PNG, WebP, GIF</p>
                          <p>Ukuran maksimal: 5MB</p>
                          <p className="text-blue-600">💾 Gambar akan disimpan di browser Anda</p>
                        </div>
                        
                        {/* URL input as fallback */}
                        <div>
                          <Label htmlFor="featured_image" className="text-sm text-muted-foreground">
                            Atau masukkan URL gambar
                          </Label>
                          <Input
                            id="featured_image"
                            value={formData.featured_image}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                            disabled={!!selectedFile}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project_url">URL Proyek</Label>
                      <Input
                        id="project_url"
                        value={formData.project_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, project_url: e.target.value }))}
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github_url">URL GitHub</Label>
                      <Input
                        id="github_url"
                        value={formData.github_url}
                        onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Teknologi</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={technologyInput}
                        onChange={(e) => setTechnologyInput(e.target.value)}
                        placeholder="React, Node.js, dll"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                      />
                      <Button type="button" onClick={addTechnology} variant="outline">
                        Tambah
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(tech)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: "draft" | "published") => 
                          setFormData(prev => ({ ...prev, status: value }))
                        }
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
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                      />
                      <Label htmlFor="featured">Featured</Label>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          {editingPortfolio ? "Update Portofolio" : "Simpan Portofolio"}
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" onClick={closeModal}>
                      Batal
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortfolio;
