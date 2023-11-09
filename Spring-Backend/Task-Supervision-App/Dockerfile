# Stage 1: Build the Java application with Maven:- Goals-Package
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . ./
RUN mvn clean package -DskipTests

# Stage 2: Create a lightweight Java runtime image
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=build /app/target/Task-Supervision-App-0.0.1-SNAPSHOT.jar Task-Supervision-App.jar
EXPOSE 8888
CMD ["java", "-jar", "Task-Supervision-App.jar"]
