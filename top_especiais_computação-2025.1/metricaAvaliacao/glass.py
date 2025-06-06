import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
from tabulate import tabulate

# Carregar dados da UCI
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/glass/glass.data"
columns = [
    'Id', 'RI', 'Na', 'Mg', 'Al', 'Si', 'K', 'Ca', 'Ba', 'Fe', 'Type'
]
df = pd.read_csv(url, header=None, names=columns)

# Remover a coluna Id (não é atributo preditivo)
df = df.drop('Id', axis=1)

# Separar X (atributos) e y (classe)
X = df.drop('Type', axis=1)
y = df['Type']

# Dividir dados
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Treinar modelo
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Previsões
y_pred = model.predict(X_test)

# Avaliação
print("Matriz de Confusão:")
print(confusion_matrix(y_test, y_pred))
print("\n")

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred, average='weighted', zero_division=0)
recall = recall_score(y_test, y_pred, average='weighted', zero_division=0)
f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0)

# Exibir resultados
dados = [
    ['Acurácia', 'Precisão', 'Recall', 'F1-Score'],
    [accuracy, precision, recall, f1]
]

print(tabulate(dados, headers="firstrow"))
