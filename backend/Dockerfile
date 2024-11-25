# Use a imagem oficial do Node.js
FROM node:16

# Cria e define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./ package-lock.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Exponha a porta que a aplicação vai rodar
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
