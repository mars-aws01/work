FROM docker.neg/nginx:1.9.14-confd

MAINTAINER jh3r jay.m.hu@newegg.com

COPY dist /dist

COPY start.sh /start.sh

WORKDIR /

CMD ["./start.sh"]