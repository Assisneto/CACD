# Card 1.2 — Integrar Autenticação (Firebase Auth)

**Tipo:** Feature  
**Prioridade:** Alta  
**Descrição:** Conectar fluxo de login ao Firebase Auth e manter sessão.

**Critérios de aceite:**
- Login/logout funcional
- Sessão persistida após reinício
- Rota protegida para telas internas

---

## Contexto atual do projeto

- Expo SDK 53 com React Navigation (stack navigator)
- Firebase já inicializado em `src/config/firebase/firebase.ts` (apenas `initializeApp`, sem Auth)
- Nenhuma dependência de autenticação instalada ainda
- Navegação atual: Home → TinderCard (sem proteção de rota)

---

## Passo 1 — Habilitar Email/Password no Firebase Console

> Comece por aqui porque é independente de código e desbloqueia os testes de tudo depois.

1. Acessar o [Firebase Console](https://console.firebase.google.com)
2. Ir no projeto → **Authentication** → **Sign-in method**
3. Habilitar o provider **Email/Password**
4. Na aba **Users**, criar ao menos um usuário de teste para validação

---

## Passo 2 — Instalar dependências

Instalar o módulo de autenticação e o adaptador de persistência:

- `firebase` (verificar se já está instalado; caso não, instalar)
- `@react-native-async-storage/async-storage` — necessário para persistir a sessão de autenticação no React Native

> **Por quê?** O Firebase Auth para React Native precisa de um adaptador de persistência. O `getReactNativePersistence` do Firebase usa o AsyncStorage por baixo.

---

## Passo 3 — Configurar Firebase Auth com persistência

**Arquivo:** `src/config/firebase/firebase.ts`

1. Importar `initializeAuth` e `getReactNativePersistence` de `firebase/auth`
2. Importar `AsyncStorage` de `@react-native-async-storage/async-storage`
3. Inicializar o Auth usando `initializeAuth` com `persistence: getReactNativePersistence(AsyncStorage)`
4. Exportar a instância de `auth`

> **Isso garante** que a sessão sobrevive ao reinício do app (critério de aceite).

---

## Passo 4 — Criar um AuthContext (contexto de autenticação)

**Criar arquivo:** `src/contexts/AuthContext.tsx`

1. Criar um React Context que armazene o estado do usuário (`User | null`) e um flag `loading`
2. No provider, usar `onAuthStateChanged(auth, callback)` dentro de um `useEffect` para escutar mudanças no estado de autenticação
3. Enquanto `loading` for `true`, exibir uma tela de splash/carregamento
4. Exportar um hook customizado `useAuth()` para consumir o contexto facilmente

> **Esse contexto** será a fonte única de verdade sobre se o usuário está logado ou não.

---

## Passo 5 — Criar funções de login e logout

Pode ficar no mesmo arquivo do contexto ou num arquivo separado (ex: `src/services/authService.ts`):

1. **Login:** usar `signInWithEmailAndPassword(auth, email, password)`
2. **Logout:** usar `signOut(auth)`
3. **(Opcional para teste):** criar função de registro com `createUserWithEmailAndPassword(auth, email, password)` — útil para criar usuários de teste

---

## Passo 6 — Criar a Tela de Login

**Criar arquivo:** `src/screens/Login.tsx`

1. Dois campos de input: e-mail e senha
2. Botão "Entrar" que chama a função de login do passo 5
3. Tratamento de erros (credencial inválida, campos vazios) com mensagens amigáveis
4. Enquanto o login estiver processando, desabilitar o botão e mostrar indicador de loading

---

## Passo 7 — Implementar navegação condicional (rota protegida)

**Arquivo:** `src/App.tsx`

1. Envolver tudo com o `AuthProvider` criado no passo 4
2. Dentro do `NavigationContainer`, ler o estado do `useAuth()`
3. **Se `loading`** → mostrar splash/loading screen
4. **Se `user` for `null`** → mostrar stack com tela de Login (e opcionalmente Registro)
5. **Se `user` existir** → mostrar stack com Home e TinderCard (as telas atuais)

> Isso cria a **rota protegida**: sem login, não há acesso às telas internas.

---

## Passo 8 — Testar os critérios de aceite

| Critério | Como testar |
|---|---|
| **Login funcional** | Inserir e-mail/senha válidos → deve redirecionar para Home |
| **Logout funcional** | Chamar `signOut` (pode adicionar um botão temporário na Home) → deve voltar para Login |
| **Sessão persistida** | Fazer login, fechar o app completamente (kill), reabrir → deve entrar direto na Home sem pedir login |
| **Rota protegida** | Sem login, tentar acessar Home/TinderCard → deve ser impossível, sempre mostra Login |

---

## Estrutura de arquivos

### Arquivos novos
```
src/
  contexts/
    AuthContext.tsx          ← Passo 4
  services/
    authService.ts           ← Passo 5 (opcional, pode estar no contexto)
  screens/
    Login.tsx                ← Passo 6
```

### Arquivos a modificar
- `src/config/firebase/firebase.ts` ← Passo 3
- `src/App.tsx` ← Passo 7

---

## Ordem recomendada de execução

```
Passo 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
```
