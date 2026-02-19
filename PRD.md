# **PRD v2.1 — Provision Plataforma de Educação e Consultoria Pública**

Versão: 2.1 (Robusta)
Escopo: Institucional + CRM + Presencial + EAD escalável

# **1. VISÃO DO PRODUTO**

Provision será:

Plataforma técnica de capacitação e suporte estratégico para gestores públicos municipais.

Modelo híbrido:

1. Consultoria técnica especializada
2. Cursos presenciais
3. Plataforma EAD institucional
4. CRM B2G integrado
5. Base normativa ativa

Preparada para evoluir para:

* Marketplace de cursos públicos
* Assinaturas institucionais
* Multi-prefeitura
* Multi-instrutor

# **2. ARQUITETURA GERAL**

**Frontend:**
*   React (Antigravity)
*   Área pública (Institutional)
*   Área admin (Backoffice)
*   Área aluno (LMS)

**Backend:**
*   **Supabase (BaaS)**: Auth, Postgres, Storage, Realtime.
*   **Edge Functions**: Lógica de negócio sensível, assinaturas de URL, webhooks.

**Streaming & CDN:**
*   **Bunny Stream**: Hospedagem segura de vídeo com DRM tokenizado.
*   **CDN**: Entrega de assets estáticos.

# **3. MÓDULOS DO SISTEMA**

## **MÓDULO 1 — SITE INSTITUCIONAL**

**Objetivo**: Posicionar a marca, captar leads e divulgar conteÃºdo.

### **Sitemap**
1.  Home
2.  A Provision
3.  Consultoria & Assessoria
4.  Cursos Presenciais
5.  Cursos Online (Vitrine)
6.  Conteúdos & Atualizações Normativas (Blog)
7.  Portfólio de Municípios
8.  Contato
9.  Política de Privacidade e LGPD

### **Funcionalidades Chave**
*   **Hero e CTAs**: Foco em conversão para WhatsApp ou Formulário de Lead.
*   **Agenda de Cursos**: Listagem dinâmica de `products` (tipo presencial).
*   **Blog Normativo**: Artigos técnicos com categorização.
*   **Captura de Leads**: Download de PDFs (conteúdo programático) exige cadastro simplificado (exige consentimento LGPD).

---

## **MÓDULO 2 — CRM B2G & GESTÃO DE ORGANIZAÇÕES**

**Objetivo**: Gerenciar o ciclo de vida complexo de vendas para órgãos públicos (B2G).

### **Entidades Principais:**
*   **Leads**: Contatos individuais (interessados).
*   **Organizações**: Prefeituras, Câmaras, Autarquias.
*   **Membros**: Vínculo entre Usuário/Lead e Organização.

### **Fluxos:**
*   **Lead Individual**: Pessoa física interessada.
*   **Lead Institucional**: Solicitação de inscrição via empenho/órgão.
*   **Conversão**: Lead -> Usuário (Account) quando há matrícula efetiva.

---

## **MÓDULO 3 — CURSOS (HÍBRIDO)**

### **Presencial**
*   Gestão de turmas, datas, locais.
*   Emissão de lista de presença.
*   Geração de certificados (após evento).

### **Online (EAD)**
*   Estrutura de *LMS* (Learning Management System).
*   Vídeos seguros (Bunny).
*   Progresso de aula.
*   Certificação automática.

---

# **4. MODELAGEM DE DADOS (SCHEMA ROBUSTO)**

Abaixo, a estrutura consolidada do banco de dados para suportar todos os módulos.

## **4.1 Identity & Access Management (IAM)**

### `profiles` (extends auth.users)
*   `id`: uuid (PK, FK auth.users)
*   `full_name`: text
*   `avatar_url`: text
*   `cpf`: text (unique)
*   `phone`: text
*   `role`: enum ('admin', 'student', 'instructor')
*   `created_at`: timestamp

### `organizations`
*   `id`: uuid (PK)
*   `name`: text (ex: Prefeitura Municipal de Toledo)
*   `cnpj`: text (unique)
*   `type`: enum ('prefeitura', 'camara', 'autarquia', 'privada')
*   `city`: text
*   `state`: text
*   `contact_email`: text
*   `status`: enum ('active', 'inactive', 'pending')

### `organization_members`
*   `organization_id`: uuid (FK)
*   `user_id`: uuid (FK)
*   `role`: enum ('admin', 'member')
*   `pk`: (organization_id, user_id)

## **4.2 Produtos e Conteúdo**

### `products` (Cursos Presenciais e Online)
*   `id`: uuid (PK)
*   `title`: text
*   `slug`: text (unique)
*   `description`: text
*   `thumbnail_url`: text
*   `type`: enum ('online', 'presential')
*   `status`: enum ('draft', 'published', 'archived')
*   `price`: decimal
*   `settings`: jsonb (Ex: `{ "local": "Auditório X", "data_inicio": "2024-10-10" }` para presenciais)

### `modules` (Apenas para Online)
*   `id`: uuid (PK)
*   `product_id`: uuid (FK)
*   `title`: text
*   `order_index`: int

### `lessons`
*   `id`: uuid (PK)
*   `module_id`: uuid (FK)
*   `title`: text
*   `description`: text
*   `video_id`: text (Bunny Stream ID)
*   `duration_seconds`: int
*   `is_free_preview`: boolean
*   `order_index`: int

### `articles` (Blog/Normas)
*   `id`: uuid (PK)
*   `title`: text
*   `slug`: text
*   `content`: text (Markdown/HTML)
*   `category`: text
*   `published_at`: timestamp
*   `author_id`: uuid (FK profiles)

## **4.3 CRM & Vendas**

### `leads`
*   `id`: uuid (PK)
*   `name`: text
*   `email`: text
*   `phone`: text
*   `organization_name`: text (se não houver vínculo formal ainda)
*   `role_title`: text (cargo)
*   `source`: text (utm_source, form_id)
*   `status`: enum ('new', 'contacted', 'qualified', 'converted')
*   `lgpd_consent`: boolean
*   `created_at`: timestamp

### `enrollments` (Matrículas Unificadas)
*   `id`: uuid (PK)
*   `user_id`: uuid (FK, nullable - se lead não converteu ainda)
*   `lead_id`: uuid (FK, nullable)
*   `product_id`: uuid (FK)
*   `organization_id`: uuid (FK, nullable)
*   `status`: enum ('pending', 'awaiting_payment', 'active', 'completed', 'cancelled')
*   `access_type`: enum ('individual', 'institutional')
*   `expires_at`: timestamp (null = vitalício)
*   `created_at`: timestamp

### `lesson_progress`
*   `enrollment_id`: uuid (FK)
*   `lesson_id`: uuid (FK)
*   `status`: enum ('started', 'completed')
*   `watched_seconds`: int
*   `last_updated`: timestamp

### `certificates`
*   `id`: uuid (PK)
*   `enrollment_id`: uuid (FK)
*   `validation_code`: text (unique hash para validação pública)
*   `pdf_url`: text
*   `issued_at`: timestamp

## **4.4 Webhooks & Logs**

### `webhook_logs`
*   `id`: uuid (PK)
*   `event_type`: text (lead.created, enrollment.updated)
*   `payload`: jsonb
*   `response_status`: int
*   `created_at`: timestamp

---

# **5. REGRAS DE NEGÓCIO E FLUXOS CRÍTICOS**

## **5.1 Ciclo de Vida: Lead B2G -> Aluno**
1.  **Captura**: Servidor preenche formulário de interesse ou baixa PDF. Sistema cria `lead`.
2.  **Venda Institucional**: Prefeitura solicita 10 vagas. Admin cria `organization` e gera 10 `enrollments` com status `pending` vinculados ao email dos servidores (leads).
3.  **Ativação/Convite**:
    *   Sistema envia email: "Você foi matriculado no curso X pela Prefeitura Y".
    *   Link leva para "Definir Senha".
    *   Ao definir senha -> Cria `auth.user` + `profile` -> Atualiza `enrollment.user_id`.
4.  **Acesso**: Aluno faz login e acessa o curso.

## **5.2 Proteção de Conteúdo (Bunny + Edge)**
*   O frontend **nunca** tem a URL direta do vídeo.
*   O player solicita token à Edge Function: `GET /api/video-token?lesson_id=XYZ`.
*   Edge Function valida:
    1.  Usuário logado?
    2.  Possui `enrollment` ativo para o produto desta lição?
    3.  `enrollment` não expirou?
*   Se OK, gera URL assinada do Bunny (validade de 1 hora) e retorna.

## **5.3 Certificação Dinâmica**
*   Gatilho: `lesson_progress` 100% completo em todas as aulas obrigatórias.
*   Ação: Edge Function gera PDF usando template HTML + Dados do Aluno.
*   Persistência: Salva PDF no Storage, cria registro em `certificates`.
*   Validação: Todo certificado tem QR Code apontando para `provision.com.br/validar/{validation_code}`.

---

# **6. REQUISITOS TÉCNICOS ADICIONAIS**

1.  **SEO**: Implementar SSR ou SSG (Next.js ou Vike) ou Meta Tags dinâmicas robustas no React (React Helmet/Head).
2.  **Performance**: Imagens otimizadas (WebP), Lazy loading de componentes pesados (Player).
3.  **Segurança**: RLS (Row Level Security) rigoroso no Supabase. Ninguém lê dados de outra organização/aluno.
4.  **Auditoria**: Logs de acesso e download de materiais (tabela `activity_logs` opcional, mas recomendada para LGPD).

---

# **7. ROADMAP DE IMPLEMENTAÇÃO**

## **Fase 1: Institucional + CRM (MVP)**
*   Landing Page, Blog, Páginas de Cursos (Vitrine).
*   Formulários integrados ao Supabase (Leads).
*   Painel Admin básico para ver Leads.

## **Fase 2: Gestão de Cursos Presenciais**
*   CRUD de Produtos (Presencial).
*   Gestão de Inscritos (Enrollments).
*   Emissão de lista de Presença e Certificados manuais.

## **Fase 3: EAD Completo**
*   Integração Bunny Stream.
*   Área do Aluno (Player, Progresso).
*   Certificação automática.
*   Venda Online (Integração Stripe/Asaas - Futuro).
