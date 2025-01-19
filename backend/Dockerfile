FROM openjdk:23-jdk
WORKDIR /home
ENV PATH="$PATH:/home"
COPY . .
EXPOSE 8080
ENTRYPOINT ["mvnw", "clean", "verify", "spring-boot:run"]
