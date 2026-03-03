# MVP CACD — Cards de Tarefas

## Diagnóstico rápido do que já existe no código

### ✅ Já implementado
- **Navegação básica com duas telas**: `Home` e `TinderCard` via stack navigator.
- **Tela inicial com disciplinas**: lista de 8 disciplinas, com ícone e cor por disciplina.
- **Fluxo de seleção de disciplina**: ao tocar em uma disciplina, navega para os desafios com `disciplineId`.
- **Tela de desafios com dinâmica de swipe/match**:
  - cartão com contextualização + questão;
  - swipe para direita (`C`) e esquerda (`E`);
  - feedback imediato de acerto/erro;
  - modal para ler texto completo de contextualização.
- **Base de questões mockada no front-end** por disciplina.
- **Firebase inicializado** (configuração por variáveis de ambiente).

### ❌ Ainda não implementado (gap para o MVP descrito)
- **Tela de Login** e autenticação de usuário.
- **Regra explícita de 5 questões por dia** (atualmente há quantidade variável por disciplina/item).
- **Cálculo de pontuação diária formal** e persistência de resultado.
- **Tela de Ranking do Dia** com top 10, top 5 visível e posição do usuário destacada.
- **Tela de Ranking Completo** com listagem global e rolagem.
- **Botões de ação pós-desafio**:
  - Voltar para Tela Inicial;
  - Ver Ranking Completo.
- **Backend/modelagem de dados para leaderboard** (Firestore/Realtime DB ou API própria).

---

## Cards de tarefas para implementar a documentação do MVP

> Formato sugerido para uso em Jira/Trello/GitHub Projects.

## Épico 1 — Acesso e Identidade

### Card 1.1 — Criar Tela de Login
- **Tipo**: Feature
- **Prioridade**: Alta
- **Descrição**: Implementar tela de login com e-mail/senha para identificação individual.
- **Critérios de aceite**:
  - usuário acessa por e-mail e senha;
  - validação de campos obrigatórios;
  - mensagens de erro amigáveis;
  - redirecionamento para tela inicial após login.
- **Dependências**: Card 1.2.

### Card 1.2 — Integrar autenticação (Firebase Auth)
- **Tipo**: Feature
- **Prioridade**: Alta
- **Descrição**: Conectar fluxo de login ao Firebase Auth e manter sessão.
- **Critérios de aceite**:
  - login/logout funcional;
  - sessão persistida após reinício;
  - rota protegida para telas internas.
- **Dependências**: Nenhuma.

---

## Épico 2 — Desafios Diários

### Card 2.1 — Definir regra “5 questões do dia” por disciplina
- **Tipo**: Regra de negócio
- **Prioridade**: Alta
- **Descrição**: Garantir entrega de exatamente 5 questões por dia, por disciplina.
- **Critérios de aceite**:
  - ao entrar no desafio, sempre recebe 5 questões válidas;
  - fallback quando não houver base suficiente;
  - regra documentada no código.
- **Dependências**: Card 2.2.

### Card 2.2 — Migrar base de questões mock para fonte persistida
- **Tipo**: Feature
- **Prioridade**: Alta
- **Descrição**: Salvar e ler questões de base persistida (Firestore/API).
- **Critérios de aceite**:
  - questões carregadas remotamente por disciplina;
  - tratamento de loading/erro;
  - sem hardcode no componente principal.
- **Dependências**: Nenhuma.

### Card 2.3 — Ajustar UX de fim de desafio
- **Tipo**: UX
- **Prioridade**: Média
- **Descrição**: Ao final das 5 questões, exibir resumo (acertos, aproveitamento, CTA para ranking).
- **Critérios de aceite**:
  - exibe pontuação total;
  - permite ir para ranking do dia;
  - permite voltar para home.
- **Dependências**: Card 2.1 e 3.1.

---

## Épico 3 — Ranking e Competição

### Card 3.1 — Implementar cálculo e persistência da pontuação diária
- **Tipo**: Feature
- **Prioridade**: Alta
- **Descrição**: Calcular desempenho do usuário ao final do desafio e persistir no dia corrente.
- **Critérios de aceite**:
  - score salvo com `userId`, disciplina, data e acertos;
  - atualização idempotente no mesmo dia;
  - pronto para consulta por ranking.
- **Dependências**: Card 1.2.

### Card 3.2 — Criar Tela de Ranking do Dia
- **Tipo**: Feature
- **Prioridade**: Alta
- **Descrição**: Exibir top 10 diário, com top 5 visível imediatamente e destaque do usuário.
- **Critérios de aceite**:
  - lista ordenada por pontuação;
  - top 5 sem scroll;
  - posições 6–10 com rolagem;
  - posição do usuário destacada mesmo fora do top 10;
  - botões “Voltar para Tela Inicial” e “Ver Ranking Completo”.
- **Dependências**: Card 3.1.

### Card 3.3 — Criar Tela de Ranking Completo
- **Tipo**: Feature
- **Prioridade**: Média
- **Descrição**: Exibir ranking global/histórico completo com rolagem e paginação simples.
- **Critérios de aceite**:
  - lista completa ordenada;
  - rolagem fluida;
  - destaque visual para o usuário logado.
- **Dependências**: Card 3.1.

---

## Épico 4 — Qualidade, Métricas e Prontidão

### Card 4.1 — Instrumentar eventos de engajamento
- **Tipo**: Observabilidade
- **Prioridade**: Média
- **Descrição**: Rastrear eventos principais (login, início de desafio, swipe, finalização, abertura de ranking).
- **Critérios de aceite**:
  - eventos enviados com contexto mínimo;
  - dashboard básico de funil.
- **Dependências**: Cards 1.x, 2.x e 3.x.

### Card 4.2 — Cobrir fluxos críticos com testes
- **Tipo**: Teste
- **Prioridade**: Média
- **Descrição**: Criar testes de navegação, regra de 5 questões e cálculo de pontuação.
- **Critérios de aceite**:
  - testes passando em CI;
  - cenários de erro cobertos.
- **Dependências**: Cards 2.1 e 3.1.

### Card 4.3 — Revisão de performance e estabilidade
- **Tipo**: Técnico
- **Prioridade**: Baixa
- **Descrição**: Otimizar renderização dos cartões e listas de ranking.
- **Critérios de aceite**:
  - sem travamentos perceptíveis;
  - renderização consistente em Android/iOS.
- **Dependências**: Cards 2.x e 3.x.

---

## Sugestão de ordem de implementação (sprints)

1. **Sprint 1**: 1.2, 1.1, 2.2  
2. **Sprint 2**: 2.1, 3.1, 2.3  
3. **Sprint 3**: 3.2, 3.3, 4.1  
4. **Sprint 4**: 4.2, 4.3
