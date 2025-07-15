from sqlmodel import SQLModel, Field
from typing import Optional

class Potion(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str
    ingredient_principal: str
    puissance_magique: int
    type_potion: str  # "Curative", "Offensive", "Protectrice"
