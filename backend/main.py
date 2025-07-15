from fastapi import FastAPI, Depends, HTTPException
from sqlmodel import Session, select
from models import Potion
from database import init_db, get_session
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
init_db()

# Autoriser le frontend à accéder à l'API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en prod : remplace * par ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GET: lire toutes les potions
@app.get("/potions/")
def get_potions(session: Session = Depends(get_session)):
    potions = session.exec(select(Potion)).all()
    return potions

# POST: ajouter une potion
@app.post("/potions/")
def create_potion(potion: Potion, session: Session = Depends(get_session)):
    session.add(potion)
    session.commit()
    session.refresh(potion)
    return potion

# PUT: modifier une potion
@app.put("/potions/{potion_id}")
def update_potion(potion_id: int, data: Potion, session: Session = Depends(get_session)):
    potion = session.get(Potion, potion_id)
    if not potion:
        raise HTTPException(status_code=404, detail="Potion non trouvée")
    
    potion.nom = data.nom
    potion.ingredient_principal = data.ingredient_principal
    potion.puissance_magique = data.puissance_magique
    potion.type_potion = data.type_potion
    
    session.commit()
    return potion

# DELETE: supprimer une potion
@app.delete("/potions/{potion_id}")
def delete_potion(potion_id: int, session: Session = Depends(get_session)):
    potion = session.get(Potion, potion_id)
    if not potion:
        raise HTTPException(status_code=404, detail="Potion non trouvée")
    
    session.delete(potion)
    session.commit()
    return {"message": "Potion supprimée"}
