FROM node:current as builder

RUN mkdir /var/www/
WORKDIR /var/www/
COPY package.json /var/www/
RUN npm i

COPY . /var/www/
RUN npm run build
CMD ["npm", "run", "build"]

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /var/www/build /usr/share/nginx/html

