import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PotionList() {
  const [potions, setPotions] = useState([]);
  const navigate = useNavigate();

  // Charger les potions depuis l'API
  useEffect(() => {
    fetch("http://localhost:8000/potions/")
      .then((res) => res.json())
      .then((data) => setPotions(data));
  }, []);

  // Supprimer une potion
  const deletePotion = (id) => {
    if (!confirm("Supprimer cette potion ?")) return;
    fetch(`http://localhost:8000/potions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPotions(potions.filter((p) => p.id !== id));
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des potions</h1>
      <button onClick={() => navigate("/edit")}>➕ Ajouter une potion</button>

      <ul>
        {potions.map((potion) => (
          <li key={potion.id} style={{ marginBottom: "1rem" }}>
            <strong>{potion.nom}</strong> – {potion.type_potion} –{" "}
            {potion.puissance_magique}/100
            <br />
            Ingrédient : {potion.ingredient_principal}
            <br />
            <button onClick={() => navigate(`/edit/${potion.id}`)}>✏️ Modifier</button>{" "}
            <button onClick={() => deletePotion(potion.id)}>🗑️ Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
