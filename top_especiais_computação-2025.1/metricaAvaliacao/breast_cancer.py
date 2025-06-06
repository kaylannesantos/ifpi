import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_score, recall_score, f1_score
from tabulate import tabulate

# Carregar dados
cancer = load_breast_cancer()
X, y = cancer.data, cancer.target

# Dividir dados
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Treinar modelo - Árvore de Decisão
model = DecisionTreeClassifier(random_state=42)
model.fit(X_train, y_train)

# Previsões
y_pred = model.predict(X_test)

# Avaliação
print("Matriz de Confusão:")
print(confusion_matrix(y_test, y_pred))
print("\n")

# Acurácia
accuracy = accuracy_score(y_test, y_pred)
print("Acurácia: ", accuracy)

# Precisão
precision = precision_score(y_test, y_pred, average='weighted')
print("Precisão: ", precision)

# Recall
recall = recall_score(y_test, y_pred, average='weighted')
print("Recall: ", recall)

# F1-Score
f1 = f1_score(y_test, y_pred, average='weighted')
print("F1-Score: ", f1)

# Exibir tabela
dados = [
    ['Acurácia', 'Precisão', 'Recall', 'F1-Score'],
    [accuracy, precision, recall, f1]
]

print("\n")
print(tabulate(dados, headers="firstrow"))
