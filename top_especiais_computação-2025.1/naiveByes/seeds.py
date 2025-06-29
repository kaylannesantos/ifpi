import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report

# Carregar o dataset Seeds
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/00236/seeds_dataset.txt"
# Nomes das colunas de acordo com a documentação do UCI
colunas = [
    "area", "perimeter", "compactness", "length", "width",
    "asymmetry", "groove_length", "class"
]
# Ler os dados
seeds = pd.read_csv(url, delim_whitespace=True, names=colunas)

# Separar atributos e rótulos
X = seeds.drop("class", axis=1)
y = seeds["class"] - 1  # Ajusta para 0,1,2 em vez de 1,2,3

# Dividir entre treino e teste
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

# Criar o modelo Naive Bayes
modelo = GaussianNB()

# Treinar o modelo
modelo.fit(X_train, y_train)

# Fazer previsões
y_pred = modelo.predict(X_test)

# Avaliar o modelo
print("Acurácia:", accuracy_score(y_test, y_pred))
print("\nRelatório de Classificação:\n", classification_report(
    y_test, y_pred, target_names=["Kama", "Rosa", "Canadian"]
))
