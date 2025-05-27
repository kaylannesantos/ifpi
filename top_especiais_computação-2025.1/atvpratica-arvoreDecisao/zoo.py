import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier, export_text, plot_tree
import matplotlib.pyplot as plt
from ucimlrepo import fetch_ucirepo

# Carregar a base de dados
zoo = fetch_ucirepo(id=111)

# Dados como DataFrame
X = zoo.data.features 
y = zoo.data.targets

# Conferir tipos e valores faltantes
print(X.dtypes)
print(X.isnull().sum())

# Codificar a variável alvo
le_target = LabelEncoder()
y_encoded = le_target.fit_transform(y.values.ravel())

# Converter classes para string
class_names = [str(cls) for cls in le_target.classes_]

# Criar modelo e treinar
modelo = DecisionTreeClassifier(criterion='entropy', random_state=42, max_depth=3)
modelo.fit(X, y_encoded)

# Plotar a árvore de decisão
fig, ax = plt.subplots(figsize=(20, 10))
plot_tree(
    modelo,
    feature_names=X.columns,
    class_names=class_names,
    filled=True,
    rounded=True,
    proportion=True,
    precision=2,
    fontsize=10,
    ax=ax
)

plt.title("Árvore de Decisão - Zoo", fontsize=16, pad=20)
plt.tight_layout()
plt.savefig("zoo.png")
plt.show()

# Exibir as regras da árvore
regras = export_text(modelo, feature_names=X.columns.tolist())
print("Regras extraídas da árvore de decisão:\n")
print(regras)


plt.title("Árvore de Decisão - Dataset Classificação de Animais", fontsize=14, pad=20)
plt.tight_layout()
plt.savefig("zoo.png")  # Salva como imagem
plt.show()