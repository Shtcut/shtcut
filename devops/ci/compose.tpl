version: '3.8'

services:
    app:
     image: {IMAGE}
     environment:
        NODE_ENV: {NODE_ENV}
        VIRTUAL_HOST: {VIRTUAL_HOST}
    env_file:
        - ./.env
    ports:
        - "8000:{PORT}"
    networks:
        - app-network
    
    nginx-proxy:
        image: jwilder/nginx-proxy:alpine
        container_name: nginx-proxy
        ports:
            - "80:80"
        volumes:
            - "/var/run/docker.sock:/tmp/docker:sock:ro"
        networks:
            - app-network

networks:
    app-network:
        name: nginx-proxy
        external: true