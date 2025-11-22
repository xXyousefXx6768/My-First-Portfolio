"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "@/utils/SupaBase/ServerClient";
import "../globals.css";

const techSuggestions = [
  "React", "Next.js", "Tailwind CSS", "Bootstrap", "Framer Motion",
  "Node.js", "Express.js", "MongoDB", "Firebase", "Laravel", "PHP",
  "MySQL", "TypeScript", "JavaScript", "Redux", "Vite", "HTML", "CSS",
  'gsap'
];

const AdminPage: React.FC = () => {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [techInput, setTechInput] = useState("");

  const [project, setProject] = useState({
    name: "",
    tech: [] as string[],
    desc: "",
    image: null as File | null,
    github: "",
    preview: "",
  });

  // ✅ جلب المشاريع
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("❌ حدث خطأ أثناء جلب المشاريع");
      return;
    }

    console.log("Fetched projects:", data);
    setProjects(data || []);
  };

  // ✅ استخدم useEffect عشان يتحدث أول ما تسجل دخول أو بعد ما ترفع مشروع
  useEffect(() => {
    if (auth) fetchProjects();
  }, [auth]);

  const handleLogin = async () => {
    if (
      username === process.env.NEXT_PUBLIC_USERNAME &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      toast.success("✅ تم تسجيل الدخول بنجاح!");
      setAuth(true);
    } else {
      toast.error("❌ اسم المستخدم أو كلمة السر غلط");
    }
  };

  // ☁️ رفع المشروع
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!project.image) {
      toast.error("❌ يجب تحميل صورة المشروع");
      return;
    }

    // رفع الصورة
    const formData = new FormData();
    formData.append("file", project.image);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!data.url) {
      toast.error("❌ خطأ في رفع الصورة");
      return;
    }

    // إدخال البيانات
    const { error } = await supabase.from("projects").insert([
      {
        name: project.name,
        tech: project.tech,
        desc: project.desc,
        github: project.github,
        preview: project.preview,
        image: data.url,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("❌ خطأ أثناء الحفظ");
      return;
    }

    toast.success("✅ تم رفع المشروع بنجاح!");
    setShowForm(false);
    fetchProjects(); // ✅ تحدث القائمة فوراً بعد الرفع
  };

  const addTechnology = (tech: string) => {
    if (!project.tech.includes(tech)) {
      setProject({ ...project, tech: [...project.tech, tech] });
    }
    setTechInput("");
  };

  const removeTechnology = (tech: string) => {
    setProject({
      ...project,
      tech: project.tech.filter((t) => t !== tech),
    });
  };

  if (!auth) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <Toaster position="top-center" />
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-80">
          <h2 className="text-2xl mb-6 font-semibold text-center">🔐 Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 mb-3 rounded bg-gray-700"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-5 rounded bg-gray-700"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-amber-500 hover:bg-amber-600 py-2 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
    <Toaster position="top-center" />

    {/* ✅ Header */}
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold text-amber-400">🚀 Admin Dashboard</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-lg font-semibold"
      >
        ➕ Add Project
      </button>
    </div>

    {/* ✅ نموذج إضافة مشروع */}
    {showForm && (
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-10 max-w-lg mx-auto border border-gray-700">
        <h2 className="text-2xl font-semibold text-amber-400 mb-5">📦 Add New Project</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            className="w-full p-2 rounded bg-gray-700"
            onChange={(e) => setProject({ ...project, name: e.target.value })}
          />

          <textarea
            placeholder="Project Description"
            className="w-full p-2 rounded bg-gray-700"
            rows={3}
            onChange={(e) => setProject({ ...project, desc: e.target.value })}
          />

          {/* ✅ التقنيات */}
          <div>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add Technology..."
                className="flex-1 p-2 rounded bg-gray-700"
              />
              <button
                type="button"
                onClick={() => addTechnology(techInput)}
                className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded font-semibold"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="bg-amber-600 text-black px-2 py-1 rounded cursor-pointer hover:bg-red-500"
                  onClick={() => removeTechnology(t)}
                >
                  {t} ✕
                </span>
              ))}
            </div>

            {/* ✅ اقتراحات */}
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              {techSuggestions.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => addTechnology(t)}
                  className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ✅ روابط */}
          <input
            type="url"
            placeholder="GitHub Link"
            className="w-full p-2 rounded bg-gray-700"
            onChange={(e) => setProject({ ...project, github: e.target.value })}
          />
          <input
            type="url"
            placeholder="Live Preview Link"
            className="w-full p-2 rounded bg-gray-700"
            onChange={(e) => setProject({ ...project, preview: e.target.value })}
          />

          {/* ✅ صورة المشروع */}
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 rounded bg-gray-700"
            onChange={(e) =>
              setProject({ ...project, image: e.target.files?.[0] || null })
            }
          />

          {/* ✅ أزرار */}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded font-semibold"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    )}

    {/* ✅ قائمة المشاريع */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {projects.map((p) => (
        <div
          key={p.id}
          className="bg-gray-800 p-5 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border border-gray-700"
        >
          <img
            src={p.image}
            alt={p.name}
            className="rounded-lg w-full h-52 object-cover mb-4"
          />
          <h3 className="text-xl font-bold text-amber-400 mb-2">{p.name}</h3>
          <p className="text-sm text-gray-300 mb-3">{p.tech?.join(", ")}</p>
          <p className="text-gray-400 text-sm mb-4">{p.desc}</p>
          <div className="flex gap-3">
            <a
              href={p.github}
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
            >
              GitHub ↗
            </a>
            {p.preview && (
              <a
                href={p.preview}
                target="_blank"
                className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-black text-sm"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

};

export default AdminPage;
