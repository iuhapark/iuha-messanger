FROM gradle:8.7.0-jdk17-alpine AS builder
COPY --chown=gradle:gradle . /gradle
WORKDIR /gradle
RUN cd server && gradle bootJar --no-daemon -x test

FROM openjdk:17-alpine
RUN mkdir /app
COPY --from=builder /gradle/server/build/libs/*.jar /app/app.jar
ARG PROFILE
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "/app/app.jar"]