import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createVent } from "../api/vent";

function CreateVent() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    emotion: "STRESSED",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  try {
    await createVent(formData);

    navigate("/");
  } catch (error) {
    console.error(error);

    alert("Failed to create vent");
  }
  };

  

  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md">
        <h1 className="mb-6 bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
          Create a Vent
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="title"
            placeholder="What's on your mind?"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-violet-500"
          />

          <textarea
            rows="6"
            name="content"
            placeholder="Let it out..."
            value={formData.content}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 outline-none focus:border-violet-500"
          />

          <select
            name="emotion"
            value={formData.emotion}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#111827] p-4 outline-none focus:border-violet-500"
          >
            <option value="HAPPY">😊 Happy</option>
            <option value="SAD">😔 Sad</option>
            <option value="ANGRY">😡 Angry</option>
            <option value="ANXIOUS">😰 Anxious</option>
            <option value="STRESSED">😟 Stressed</option>
          </select>

          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 px-6 py-3 font-medium"
          >
            Publish Vent
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateVent;