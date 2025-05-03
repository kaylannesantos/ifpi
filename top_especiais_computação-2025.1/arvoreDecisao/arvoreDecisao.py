import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt
from sklearn import tree

# Dados de exemplo para decisão de transporte
dados = {
    'distancia': ['curta', 'média', 'média', 'longa', 'curta', 'longa', 'média', 'curta', 'longa', 'média'],
    'clima': ['bom', 'bom', 'ruim', 'ruim', 'bom', 'bom', 'ruim', 'ruim', 'ruim', 'bom'],
    'orcamento': ['baixo', 'alto', 'alto', 'baixo', 'médio', 'baixo', 'alto', 'baixo', 'baixo', 'médio'],
    'transporte': ['moto', 'carro', 'carro', 'ônibus', 'moto', 'ônibus', 'carro', 'ônibus', 'ônibus', 'moto']
}

# Criar DataFrame
df = pd.DataFrame(dados)

# Codificar atributos categóricos
label_encoders = {}
for coluna in df.columns:
    le = LabelEncoder()
    df[coluna] = le.fit_transform(df[coluna])
    label_encoders[coluna] = le

# Separar dados
X = df.drop(columns=['transporte'])
y = df['transporte']

# Criar modelo e treinar
modelo = DecisionTreeClassifier(criterion='entropy', random_state=42)
modelo.fit(X, y)

# Plotar a árvore de decisão
fig, ax = plt.subplots(figsize=(14, 8))
tree.plot_tree(
    modelo,
    feature_names=X.columns,
    class_names=label_encoders['transporte'].classes_,
    filled=True,
    rounded=True,
    proportion=True,
    precision=2,
    fontsize=10,
    ax=ax
)
plt.title("Árvore de Decisão - Escolha de Transporte", fontsize=14, pad=20)
plt.tight_layout()
plt.savefig("arvore_transporte.png")  # Salva como imagem
plt.show()
