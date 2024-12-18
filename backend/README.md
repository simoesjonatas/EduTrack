# Backend

Neste módulo, você encontra o backend da PoC. Para executá-lo, primeiro você deve ter o Node (a partir do 14) e o npm instalados na sua máquina. Então, execute o comando:

```bash
npm i
```

Este projeto se conecta com um banco MongoDB. Esse banco está rodando em uma instância de nuvem e você receberá os dados de acesso no seu email. Esses dados são pessoais, e o acesso será revogado assim que a PoC terminar. Para incluir os dados de acesso, modifique as linhas 6 a 8 do arquivo `./src/db/mongoose.js`.

Depois, execute o comando:

```bash
npm run dev
```

O backend deve subir na porta padrão, onde você poderá acessá-lo. Caso necessite, altere a porta no arquivo `./src/app.js` na linha 24. Não esqueça de alterar também a URL no frontend.

O entrypoint do projeto, onde você pode avaliar a organização do template e descobrir como tudo foi programado até aqui, está no arquivo `./src/app.js`. Mais especificamente, as linhas 27 e 28 configuram as rotas do sistema. Tente continuar o trabalho que está iniciado. Apenas modifique a estrutura, as rotas existentes e o modelo do Mongoose caso seja necessário. Utilize as rotas existentes como um guia para a construção das novas. Como o foco principal desta PoC é o frontend, o código do backend possui mais comentários. Comente também o que desenvolver.