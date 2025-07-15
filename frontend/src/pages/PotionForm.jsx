import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PotionForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // si id existe, on est en "modification"

  const [form, setForm] = useState({
    nom: "",
    ingredient_principal: "",
    puissance_magique: 50,
    type_potion: "Curative",
  });

  // Charger les données si on édite une potion existante
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/potions/`)
        .then((res) => res.json())
        .then((data) => {
          const potion = data.find((p) => p.id === parseInt(id));
          if (potion) setForm(potion);
        });
    }
  }, [id]);

  // Gestion des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:8000/potions/${id}`
      : "http://localhost:8000/potions/";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => navigate("/"));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{id ? "Modifier" : "Ajouter"} une potion</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input
          type="text"
          name="nom"
          placeholder="Nom de la potion"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ingredient_principal"
          placeholder="Ingrédient principal"
          value={form.ingredient_principal}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="puissance_magique"
          placeholder="Puissance magique (1-100)"
          value={form.puissance_magique}
          onChange={handleChange}
          min={1}
          max={100}
          required
        />
        <select name="type_potion" value={form.type_potion} onChange={handleChange}>
          <option value="Curative">Curative</option>
          <option value="Offensive">Offensive</option>
          <option value="Protectrice">Protectrice</option>
        </select>
        <button type="submit">💾 {id ? "Enregistrer les modifications" : "Créer la potion"}</button>
        <button type="button" onClick={() => navigate("/")}>↩️ Retour</button>
      </form>
    </div>
  );
}
