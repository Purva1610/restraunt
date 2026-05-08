FROM alpine
WORKDIR /app
# Add this line to install Node and NPM
RUN apk add --update nodejs npm
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
