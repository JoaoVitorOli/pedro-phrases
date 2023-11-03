# pedro-phrases

Um gerador de imagens que gera uma imagem com uma frase que você escolher e adiciona uma imagem do meu amigo Pedro ao lado


1. Clone este repositório em seu sistema local:

```bash
https://github.com/JoaoVitorOli/pedro-phrases.git
```
2. Navegue até o diretório do projeto:

```bash
cd pedro-phrases
```

3. Construa a imagem Docker:

```bash
docker build -t pedro-phrases .
```

4. Execute o contêiner:

```bash
docker run -p 3000:3000 pedro-phrases
```
