export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Nova Lei de Licitações e Contratos (14.133/2021)',
    date: '15/04/2026',
    time: '08:00 - 17:00',
    city: 'Toledo - PR',
    location: 'Auditório ACIT',
    category: 'Jurídico',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Gestão e Fiscalização de Contratos Administrativos',
    date: '28/04/2026',
    time: '08:00 - 17:00',
    city: 'Cascavel - PR',
    location: 'Hotel Copas Verdes',
    category: 'Administrativo',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Planejamento Orçamentário: PPA, LDO e LOA na Prática',
    date: '10/05/2026',
    time: '08:30 - 17:30',
    city: 'Foz do Iguaçu - PR',
    location: 'Rafain Palace',
    category: 'Financeiro',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Impactos da Reforma Tributária na Arrecadação Municipal',
    date: '18/02/2026',
    category: 'Tributário',
    summary: 'Uma análise detalhada sobre como as mudanças no ISS e ICMS afetarão os cofres municipais nos próximos anos.',
    author: 'Dr. Carlos Mendes',
    image: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Encerramento de Mandato: Cuidados Essenciais com a LRF',
    date: '10/02/2026',
    category: 'Contabilidade',
    summary: 'Principais pontos de atenção para gestores públicos em último ano de mandato conforme a Lei de Responsabilidade Fiscal.',
    author: 'Ana Paula Silva',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Digitalização de Processos no Setor Público',
    date: '05/02/2026',
    category: 'Tecnologia',
    summary: 'Como a transformação digital pode reduzir custos e aumentar a transparência na gestão municipal.',
    author: 'Roberto Almeida',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_LEADS = [
  { id: '1', name: 'João Silva', email: 'joao@toledo.pr.gov.br', phone: '(45) 9999-9999', organization: 'Prefeitura de Toledo', role: 'Secretário de Fazenda', status: 'Novo', source: 'Site - Home' },
  { id: '2', name: 'Maria Souza', email: 'maria@camaracascavel.pr.gov.br', phone: '(45) 8888-8888', organization: 'Câmara de Cascavel', role: 'Assessora Jurídica', status: 'Qualificado', source: 'Download PDF' },
  { id: '3', name: 'Carlos Pereira', email: 'carlos@foz.pr.gov.br', phone: '(45) 7777-7777', organization: 'Prefeitura de Foz', role: 'Diretor de Compras', status: 'Contatado', source: 'WhatsApp' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@amuop.pr.gov.br', phone: '(45) 6666-6666', organization: 'AMUOP', role: 'Coordenadora', status: 'Convertido', source: 'Indicação' },
];

export const MOCK_ORGANIZATIONS = [
  { id: '1', name: 'Prefeitura Municipal de Toledo', city: 'Toledo', state: 'PR', cnpj: '76.205.806/0001-88', contacts: 12, status: 'Ativo' },
  { id: '2', name: 'Câmara Municipal de Cascavel', city: 'Cascavel', state: 'PR', cnpj: '78.123.456/0001-99', contacts: 5, status: 'Ativo' },
  { id: '3', name: 'AMUOP - Associação dos Municípios', city: 'Cascavel', state: 'PR', cnpj: '89.123.456/0001-00', contacts: 3, status: 'Inativo' },
];

export const MOCK_ENROLLMENTS = [
  { id: '1', course_id: '1', lead_id: '1', status: 'Confirmado', date: '18/02/2026', course_title: 'Nova Lei de Licitações', lead_name: 'João Silva' },
  { id: '2', course_id: '1', lead_id: '2', status: 'Pendente', date: '19/02/2026', course_title: 'Nova Lei de Licitações', lead_name: 'Maria Souza' },
  { id: '3', course_id: '2', lead_id: '3', status: 'Cancelado', date: '15/02/2026', course_title: 'Gestão de Contratos', lead_name: 'Carlos Pereira' },
];
