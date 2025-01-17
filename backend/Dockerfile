FROM openjdk:23-jdk
WORKDIR /home
ENV PATH="$PATH:/home"
COPY ./.mvn ./.mvn
COPY ./pom.xml ./pom.xml
COPY ./mvnw ./mvnw
COPY ./mvnw.cmd ./mvnw.cmd
RUN ["mvnw", "clean"]
COPY . .
RUN ["mvnw", "clean", "verify"]
EXPOSE 8080
ENTRYPOINT ["mvnw", "spring-boot:run"]
