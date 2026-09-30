import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const emptyProduct = {
  name: "",
  description: "",
  brand: "",
  price: "",
  category: "",
  releaseDate: "",
  stockQuantity: "0",
  available: true,
  imageUrl: "",
};

const getErrorMessage = (error) => {
  if (error.response?.status === 403) {
    return "This account does not have permission to manage products.";
  }
  return error.response?.data?.message || error.response?.data || error.message;
};

const AdminProducts = () => {
  const { backendUrl, token, currency, refreshProducts } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    axios
      .get(`${backendUrl}/api/public/products?currency=inr`)
      .then((response) => {
        const productList = Array.isArray(response.data) ? response.data : [];
        if (active) setProducts(productList);
      })
      .catch((error) => {
        if (active) toast.error(String(getErrorMessage(error)));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [backendUrl, refreshCounter]);

  const resetForm = () => {
    setForm(emptyProduct);
    setImageFile(null);
    setEditingId(null);
  };

  const beginEdit = (product) => {
    setForm({
      name: product.name || "",
      description: product.description || "",
      brand: product.brand || "",
      price: String(product.price ?? ""),
      category: product.category || "",
      releaseDate: product.releaseDate || "",
      stockQuantity: String(product.stockQuantity ?? 0),
      available: product.available ?? true,
      imageUrl: product.imageUrl || "",
    });
    setImageFile(null);
    setEditingId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!editingId && !imageFile) {
      toast.error("Choose a product image");
      return;
    }

    const product = {
      name: form.name.trim(),
      description: form.description.trim(),
      brand: form.brand.trim(),
      price: Number(form.price),
      category: form.category.trim(),
      releaseDate: form.releaseDate || null,
      stockQuantity: Number(form.stockQuantity),
      available: form.available,
      imageUrl: form.imageUrl,
    };

    setSaving(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (editingId) {
        await axios.put(
          `${backendUrl}/api/admin/product/update/${editingId}`,
          product,
          { headers }
        );
        toast.success("Product updated");
      } else {
        const formData = new FormData();
        formData.append(
          "product",
          new Blob([JSON.stringify(product)], { type: "application/json" })
        );
        formData.append("image", imageFile);
        await axios.post(`${backendUrl}/api/admin/product/create`, formData, { headers });
        toast.success("Product created");
      }
      resetForm();
      setRefreshCounter((count) => count + 1);
      refreshProducts();
    } catch (error) {
      toast.error(String(getErrorMessage(error)));
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await axios.delete(`${backendUrl}/api/admin/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted");
      if (editingId === productId) resetForm();
      setRefreshCounter((count) => count + 1);
      refreshProducts();
    } catch (error) {
      toast.error(String(getErrorMessage(error)));
    }
  };

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10 text-gray-800">
      <div className="flex items-end justify-between gap-4 border-b border-gray-300 pb-5 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Store administration</p>
          <h1 className="text-3xl font-medium mt-2">Products</h1>
        </div>
        <span className="text-sm text-gray-500">{products.length} items</span>
      </div>

      <section className="grid lg:grid-cols-[minmax(280px,360px)_1fr] gap-10 items-start">
        <form onSubmit={handleSubmit} className="border border-gray-300 p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-medium">{editingId ? "Edit product" : "Add product"}</h2>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-sm underline">
                Cancel
              </button>
            )}
          </div>
          <label className="block text-sm">
            Product name
            <input name="name" value={form.name} onChange={updateField} required className="mt-1 w-full border border-gray-300 px-3 py-2" />
          </label>
          <label className="block text-sm">
            Description
            <textarea name="description" value={form.description} onChange={updateField} rows="3" className="mt-1 w-full border border-gray-300 px-3 py-2" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              Brand
              <input name="brand" value={form.brand} onChange={updateField} className="mt-1 w-full border border-gray-300 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Category
              <input name="category" value={form.category} onChange={updateField} required className="mt-1 w-full border border-gray-300 px-3 py-2" />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              Price (INR)
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} required className="mt-1 w-full border border-gray-300 px-3 py-2" />
            </label>
            <label className="block text-sm">
              Stock
              <input name="stockQuantity" type="number" min="0" step="1" value={form.stockQuantity} onChange={updateField} required className="mt-1 w-full border border-gray-300 px-3 py-2" />
            </label>
          </div>
          <label className="block text-sm">
            Release date
            <input name="releaseDate" type="date" value={form.releaseDate} onChange={updateField} className="mt-1 w-full border border-gray-300 px-3 py-2" />
          </label>
          {editingId ? (
            <label className="block text-sm">
              Image URL
              <input name="imageUrl" type="url" value={form.imageUrl} onChange={updateField} className="mt-1 w-full border border-gray-300 px-3 py-2" />
            </label>
          ) : (
            <label className="block text-sm">
              Product image
              <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} required className="mt-1 block w-full text-sm" />
            </label>
          )}
          <label className="flex items-center gap-2 text-sm">
            <input name="available" type="checkbox" checked={form.available} onChange={updateField} />
            Available for sale
          </label>
          <button disabled={saving} className="w-full bg-black text-white py-2.5 disabled:opacity-50">
            {saving ? "Saving..." : editingId ? "Save changes" : "Create product"}
          </button>
        </form>

        <section aria-label="Product inventory">
          {loading ? (
            <p className="py-8 text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="py-8 text-gray-500">No products found.</p>
          ) : (
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {products.map((product) => (
                <article key={product.id} className="flex items-center gap-4 py-4">
                  <img
                    src={product.imageUrl || ""}
                    alt={product.name}
                    className="w-16 h-16 object-cover bg-gray-100"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.brand || product.category} · {currency}{product.price}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Stock {product.stockQuantity ?? 0} · {product.available ? "Available" : "Unavailable"}
                    </p>
                  </div>
                  <div className="flex gap-3 text-sm shrink-0">
                    <button type="button" onClick={() => beginEdit(product)} className="underline">Edit</button>
                    <button type="button" onClick={() => deleteProduct(product.id)} className="text-red-700 underline">Delete</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default AdminProducts;