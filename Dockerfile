FROM gradle:8.7.0-jdk17-alpine AS builder
COPY --chown=gradle:gradle . /gradle
WORKDIR /gradle
RUN ./gradlew :server:bootJar -x test

FROM openjdk:17-alpine
RUN mkdir /app
COPY server/build/libs/*.jar /app/app.jar
COPY src/main/resources/application.yml /app/application.yml
ARG PROFILE
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "/app/app.jar", "--spring.config.location=file:/app/application.yml"]