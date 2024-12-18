# Frontend

Neste módulo, você encontra o frontend da PoC. Para executá-lo, primeiro você deve ter o Node (a partir do 14) e o npm instalados na sua máquina. Então, execute o comando:

```bash
npm i
```

Depois, execute o comando:

```bash
npm run dev
```

O frontend deve subir em uma porta padrão onde você poderá acessá-lo.

O entrypoint do projeto, onde você pode avaliar a organização do template e descobrir como tudo foi programado até aqui, está no arquivo `./src/App.jsx`. Mais especificamente, dentro do componente Body. Tente continuar o trabalho que está iniciado. Apenas modifique a estrutura ou os componentes se houver real necessidade. O código atual não está comentado de propósito, mas comente as modificações que fizer.

Este projeto se conecta com o backend. Caso necessite modificar a porta padrão ou queira utilizar outra URL para o backend, modifique o arquivo que se encontra em `./src/utils/backend-url.js`.