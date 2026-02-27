# 🏛️ Relatório de Arquitetura: Projeto Provision

**Gerado em:** 2026-02-21
**Arquiteta Responsável:** Aria (@architect)
**Framework:** AIOS-FullStack 4.0

## 🔭 Visão Geral do Sistema
O projeto **Provision** é uma aplicação moderna construída sobre o stack Vite + React + Supabase. Atualmente, o projeto apresenta uma estrutura sólida para um MVP, mas possui gargalos técnicos que podem dificultar a expansão para os módulos de Cursos Online (EAD) e CRM avançado.

### 🏗️ Pontos Fortes
- **Modernidade**: Uso de React 19 e Vite 7 (última geração).
- **Design System**: Implementação consistente com Tailwind CSS.
- **Persistência**: Integração nativa com Supabase facilitando RLS e tempo real.

---

## ⚠️ Pontos de Melhoria (Recomendações da Aria)

### 1. Camada de Dados e Estado Global (Crítico)
**Problema:** A aplicação carece de um gerenciador de cache e estado assíncrono.
**Risco:** Inconsistência de dados entre Admin e Site Público, e excesso de requests desnecessários ao Supabase.
**Recomendação:** Implementar **TanStack Query (React Query)** para gerenciar as fetches do blog, cursos e leads. Adicionar **Zustand** para o estado do usuário logado e preferências de filtro.

### 2. Estrutura de Serviços (Padrão AIOS)
**Problema:** A lógica de negócio está muito acoplada aos componentes das páginas.
**Recomendação:** Migrar para a estrutura de serviços do AIOS em `.aios-core/infrastructure/services/`.
- `cms-service`: Gerenciar blog e artigos.
- `education-service`: Gerenciar cursos e matrículas.
- `crm-service`: Gerenciar leads e pipeline.

### 3. SEO e Performance (Core Web Vitals)
**Problema:** Falta de meta tags dinâmicas e otimização de imagens para busca orgânica (objetivo do módulo).
**Recomendação:**
- Instalar `react-helmet-async` para metadados dinâmicos por página.
- Implementar **Dynamic Imports** (React.lazy) para as rotas administrativas, reduzindo o bundle inicial do site institucional.

### 4. Segurança e LGPD
**Problema:** Registro de consentimento é manual e não centralizado.
**Recomendação:** Criar um hook `useConsent` e uma tabela dedicada para logs de auditoria de aceite (conforme indicado no PRD anterior).

---

## 🛠️ Plano de Ação Imediato

1.  **Refatoração de Pastas**: Mover chamadas diretas ao Supabase para uma pasta `src/services`.
2.  **Centralização de Tipos**: Criar `src/types/database.ts` para tipagem forte baseada no esquema do Supabase.
3.  **SEO Dashboard**: Criar um componente `<PageHead />` que aceite props de título, descrição e imagem OG.

— Aria, arquitetando o futuro 🏗️
