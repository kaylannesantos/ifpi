# 📌 Review de Diagramas de Sequência (PlantUML)

Este documento reúne todas as dúvidas esclarecidas e correções feitas nos diagramas de sequência utilizando PlantUML. Ele pode ser usado como um guia de referência rápida.

---

## 🎯 **Conceitos Importantes**

### **1️⃣ Setas em PlantUML**
| Tipo de Seta   | Significado |
|---------------|------------|
| `->`   | Comunicação normal |
| `-->`  | Comunicação síncrona (resposta direta) |
| `-->>` | Comunicação assíncrona (sistema pode continuar rodando sem esperar resposta) |
| `-->` e `-->>` | Diferença: `-->` bloqueia até receber resposta, `-->>` não |

### **2️⃣ Tempo de Ação (`activate` e `deactivate`)**
- **Indica quando um participante está ativo (processando algo).**
- Deve ser usado **somente quando o participante está realizando uma ação/processamento**.
- Não é necessário ativar um ator (como um usuário) porque ele apenas envia comandos.
- Exemplo:
  ```plantuml
  participant "Sistema" as Sys
  activate Sys
  Sys -> "Banco de Dados": Consulta Cliente
  deactivate Sys
  ```

### **3️⃣ Uso de `alt` para decisões**
- Quando há um **fluxo condicional**, usamos `alt`, `else`:
  ```plantuml
  alt Cliente cadastrado
      DB --> Sys: Retorna "Cliente Cadastrado"
  else Cliente não cadastrado
      DB --> Sys: Retorna "Cliente não encontrado"
  end
  ```

---

## ✅ **Correções e Melhorias nos Diagramas**

### **🔹 Correção do "Verificar Cliente"**
**Erros corrigidos:**
- Alteração da seta `-->>` para `-->`.
- Adição de `deactivate Sys` no fluxo "Cliente não cadastrado".

```plantuml
@startuml DSS - Verificar Cliente

    actor Atendente
    participant "Sistema" as Sys
    participant "Banco de Dados" as DB

    ' Atendente insere os dados do cliente
    Atendente -> Sys: Insere dados de Cliente
    Sys --> Atendente: Exibe dados inseridos

    ' Atendente solicita a verificação do cliente
    Atendente -> Sys: Seleciona "Verificar Cliente"
    activate Sys

    ' Sistema envia os dados para consulta no banco
    Sys -> DB: Envia dados de Cliente para Consulta
    activate DB
    DB -> DB: Consulta Cliente

    ' Resposta do banco de dados
    alt Cliente cadastrado
        DB --> Sys: Retorna "Cliente Cadastrado"
        deactivate DB
        Sys --> Atendente: "Cliente cadastrado."
        deactivate Sys
    else Cliente não cadastrado
        DB --> Sys: Retorna "Cliente não encontrado"
        deactivate DB
        Sys --> Atendente: "Cliente não cadastrado."
        deactivate Sys
    end

@enduml
```

---

### **🔹 Correção do "Pagar Pedido"**
**Erros corrigidos:**
- Nome do diagrama estava errado (`Verificar Cliente` → `Pagar Pedido`).
- `activate DB` desnecessário após `DB --> Sys: Pagamento Confirmado`.
- Faltava `deactivate DB` após confirmação do pagamento.

```plantuml
@startuml DSS - Pagar Pedido

    actor Atendente
    participant "Sistema" as Sys
    participant "Banco de Dados" as DB

    ' Atendente registra o pedido do cliente
    Atendente -> Sys: Registra pedido(nome_cliente, telefone, endereco, bairro)
    activate Sys
    Sys -> DB: Envia os dados do pedido
    activate DB
    DB -> DB: Registra o pedido
    DB --> Sys: Retorna "Pedido Criado com Sucesso."
    deactivate DB
    Sys --> Atendente: "Pedido Criado com Sucesso."
    deactivate Sys

    ' Atendente solicita o pagamento do pedido
    Atendente -> Sys: Seleciona "Pagar Pedido"
    Sys --> Atendente: Solicita confirmação de pagamento
    Atendente -> Sys: Confirma Pagamento
    activate Sys
    Sys -> DB: Confirma Pagamento de Pedido
    activate DB
    DB -> DB: Confirma e altera status do pedido para pago
    DB --> Sys: Pagamento Confirmado
    deactivate DB
    Sys --> Atendente: "Pedido Pago com Sucesso."
    deactivate Sys

@enduml
```

---

## 🔥 **Resumo Final**
✅ **Uso correto de setas** (`-->` síncrona, `-->>` assíncrona).
✅ **Aplicação correta de `activate` e `deactivate`**.
✅ **Correção de fluxos condicionais (`alt` e `else`)**.
✅ **Correções nos nomes dos diagramas e melhorias na estrutura**.

Com essas melhorias, seus diagramas estão **bem estruturados, organizados e corretos!** 🚀👏

Se precisar de mais alguma revisão ou tiver novas dúvidas, só chamar! 😃

