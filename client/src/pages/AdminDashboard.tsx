import { useState } from "react";
import { useLinks, useCreateLink, useUpdateLink, useDeleteLink } from "@/hooks/use-links";
import { Link } from "wouter";
import { 
  Plus, Edit2, Trash2, LayoutDashboard, Settings, Globe, GripVertical, Check, X, Menu, ChevronRight 
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const { data: links, isLoading } = useLinks();
  const createMutation = useCreateLink();
  const updateMutation = useUpdateLink();
  const deleteMutation = useDeleteLink();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState(0);

  const openEdit = (link: any) => {
    setEditingLink(link);
    setTitle(link.title);
    setUrl(link.url);
    setImageUrl(link.imageUrl || "");
    setIsActive(link.isActive);
    setOrder(link.order || 0);
    setIsFormOpen(true);
  };

  const openCreate = () => {
    setEditingLink(null);
    setTitle("");
    setUrl("");
    setImageUrl("");
    setIsActive(true);
    setOrder(links ? links.length : 0);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, url, imageUrl: imageUrl || null, isActive, order: Number(order) };
    
    try {
      if (editingLink) {
        await updateMutation.mutateAsync({ id: editingLink.id, ...payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this link?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const toggleActive = async (link: any) => {
    await updateMutation.mutateAsync({ id: link.id, isActive: !link.isActive });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex relative">

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white dark:bg-slate-900 border-r border-border flex flex-col p-6 shadow-sm
        transform transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 mb-10 text-primary font-display text-xl font-bold">
          <LayoutDashboard className="w-6 h-6" />
          <span>Admin Panel</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <Link href="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Manage Links
          </Link>
          <Link href="/admin/settings" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl font-medium transition-colors">
            <Settings className="w-5 h-5" />
            Profile Settings
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl font-medium transition-colors">
            <Globe className="w-5 h-5" />
            View Public Page
          </Link>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border p-3 flex items-center gap-3 lg:hidden">
          <button 
            data-testid="button-toggle-sidebar"
            onClick={() => setSidebarOpen(true)} 
            className="p-2 rounded-lg hover:bg-secondary"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-display font-bold text-foreground">Manage Links</span>
        </div>

        <div className="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display text-foreground">Manage Links</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">Create and reorder links for your bio page.</p>
            </div>
            
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <button 
                  data-testid="button-add-link"
                  onClick={openCreate}
                  className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  Add New Link
                </button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-[500px] mx-auto">
                <DialogHeader>
                  <DialogTitle>{editingLink ? "Edit Link" : "Create New Link"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Title (Arabic recommended)</label>
                    <input 
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="e.g. تأمين شامل"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">URL</label>
                    <input 
                      required type="url"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Image URL (Optional)</label>
                    <input 
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1.5 block">Order</label>
                      <input 
                        type="number"
                        value={order}
                        onChange={e => setOrder(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div className="flex items-end pb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isActive}
                          onChange={e => setIsActive(e.target.checked)}
                          className="w-5 h-5 rounded text-primary focus:ring-primary"
                        />
                        <span className="font-medium text-sm">Active</span>
                      </label>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="mt-4 w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Link"}
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-border overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">Loading links...</div>
            ) : links?.length === 0 ? (
              <div className="p-8 sm:p-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-secondary rounded-full flex items-center justify-center text-muted-foreground mb-4">
                  <LayoutDashboard className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">No links yet</h3>
                <p className="text-muted-foreground text-sm">Click the button above to add your first link.</p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-border">
                {links?.sort((a,b) => (a.order||0) - (b.order||0)).map((link) => (
                  <div key={link.id} className="p-3 sm:p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-2 sm:gap-4 group">
                    <div className="hidden sm:block cursor-grab text-muted-foreground/50 hover:text-foreground">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    
                    {link.imageUrl ? (
                      <img src={link.imageUrl} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground flex-shrink-0">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-foreground truncate text-sm sm:text-base">{link.title}</h4>
                        {!link.isActive && (
                          <span className="text-[10px] uppercase font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded-full flex-shrink-0">Hidden</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground truncate">{link.url}</p>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => toggleActive(link)}
                        className={`p-1.5 sm:p-2 rounded-lg transition-colors ${link.isActive ? 'text-green-600 hover:bg-green-50' : 'text-muted-foreground hover:bg-secondary'}`}
                        title={link.isActive ? "Hide link" : "Show link"}
                      >
                        {link.isActive ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <X className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                      <button 
                        onClick={() => openEdit(link)}
                        className="p-1.5 sm:p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(link.id)}
                        className="p-1.5 sm:p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
