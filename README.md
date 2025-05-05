# 📖 Projeto Blog Pessoal

Uma aplicação full-stack de blog, com **CRUD** de postagens e dashboard analítico, desenvolvida com **Angular** no front-end e **Spring Boot 3.4.4** no back-end.

---

## 🌟 Demonstração

- **Front-end (Netlify):** https://dancing-faloodeh-05299f.netlify.app/login
- **Back-end (Azure):** https://blog-backend-azure.azurewebsites.net/api/posts

---

## 🚀 Tecnologias

<table>
  <tr>
    <td align="center">
      <a href="https://angular.io/">
        <img src="https://img.shields.io/badge/Angular_CLI-16.0-red?logo=angular&logoColor=white" alt="Angular CLI" /><br/>
        Angular CLI
      </a>
    </td>
    <td align="center">
      <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/Node.js-v22.14.0-green?logo=node.js&logoColor=white" alt="Node.js" /><br/>
        Node.js
      </a>
    </td>
    <td align="center">
      <a href="https://spring.io/projects/spring-boot">
        <img src="https://img.shields.io/badge/Spring_Boot-3.4.4-6DB33F?logo=spring&logoColor=white" alt="Spring Boot" /><br/>
        Spring Boot
      </a>
    </td>
    <td align="center">
      <a href="https://www.oracle.com/java/">
        <img src="https://img.shields.io/badge/Java-17-007396?logo=java&logoColor=white" alt="Java 17" /><br/>
        Java 17
      </a>
    </td>
    <td align="center">
      <a href="https://code.visualstudio.com/">
        <img src="https://img.shields.io/badge/VS%20Code-1.83-007ACC?logo=visual-studio-code&logoColor=white" alt="VS Code" /><br/>
        VS Code
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/features/actions">
        <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white" alt="GitHub Actions" /><br/>
        GitHub Actions
      </a>
    </td>
  </tr>
</table>


---

## ✨ Funcionalidades

- **CRUD de Postagens**: criar, ler, atualizar e apagar  
- **Dashboard Analítico**:  
  - Gráficos de posts por autor  
  - Total de postagens e últimas publicações  
- **Filtros**: busca por autor e data  
- **Design Responsivo**: com Angular Material  
- **Boas Práticas**: GitFlow, linting e testes unitários/integrados  

---

## 🔧 Pré-requisitos

- **Java 21+**
- **Maven 3.6+** (ou Gradle)
- **Node.js v22.14.0** & **Angular CLI**
- **Git**  
- Conta no **Netlify** e **Azure** (para deploy)

---

## ⚙️ Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/Arthur99Silva/blog-pessoal-2
cd <blog-pessoal-2>
```

### 2. Backend (Spring Boot)

> Na pasta `blog-backend/`

1. Copie o arquivo de exemplo e ajuste variáveis:
   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```
2. Defina sua conexão com o banco em `application.properties`.
3. Rode com Maven ou Gradle:
   ```bash
   # Maven
   mvn spring-boot:run

   # Gradle
   ./gradlew bootRun
   ```

Por padrão, a API estará em `http://localhost:8080/api/posts`.

### 3. Frontend (Angular)

> Na pasta `blog-pessoal/`

1. Instale dependências:
   ```bash
   npm install
   ```
2. Ajuste o endpoint da API em `src/environments/environment.ts`.
3. Execute em modo dev:
   ```bash
   ng serve
   ```
4. Acesse `http://localhost:4200`.

---

## 🧪 Testes

- **Backend**  
  ```bash
  mvn test
  ```
- **Frontend**  
  ```bash
  ng test
  ```

---

## 📦 Deploy

- **CI/CD**: GitHub Actions para build + deploy  
- **Front-end**: Netlify (branch `main` → deploy automático)  
- **Back-end**: Azure App Service via Actions

---
