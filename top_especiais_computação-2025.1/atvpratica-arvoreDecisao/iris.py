import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier, export_text
import matplotlib.pyplot as plt
from sklearn import tree
from ucimlrepo import fetch_ucirepo 

# Buscar o dataset Iris
iris = fetch_ucirepo(id=53)

# Dados
X = iris.data.features
y = iris.data.targets

# Exibir metadados
print(iris.metadata)
print(iris.variables)

# Codificar os targets, se necessário
if y.dtypes[0] == 'O':  # Se for objeto/string
    le = LabelEncoder()
    y = le.fit_transform(y.values.ravel())
    target_names = le.classes_
else:
    target_names = y.unique().astype(str)

# Criar modelo e treinar
modelo = DecisionTreeClassifier(criterion='entropy', random_state=42)
modelo.fit(X, y)

# Plotar a árvore de decisão
fig, ax = plt.subplots(figsize=(14, 8))
tree.plot_tree(
    modelo,
    feature_names=X.columns,
    class_names=target_names,
    filled=True,
    rounded=True,
    proportion=True,
    precision=2,
    fontsize=10,
    ax=ax
)

# Exibir as regras da árvore de decisão
regras = export_text(modelo, feature_names=X.columns.tolist())
print("Regras extraídas da árvore de decisão:\n")
print(regras)

plt.title("Árvore de Decisão - Dataset Iris", fontsize=14, pad=20)
plt.tight_layout()
plt.savefig("arvoreIris.png")  # Salva como imagem
plt.show()
