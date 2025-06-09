FROM openjdk:17-jdk-slim
LABEL authors="jas06113"

COPY ["./build/libs/api-gateway-*-SNAPSHOT.jar", "/home/root/app.jar"]

RUN mkdir -p /var/www/api-gateway

ENTRYPOINT ["sh", "-c", "java -XX:+UseG1GC -XX:+UseContainerSupport -XX:MaxRAMPercentage=50.0 -XX:InitialRAMPercentage=50.0 -XX:ActiveProcessorCount=1 -XX:MaxGCPauseMillis=200 -XX:+UseStringDeduplication -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/dump.hprof -Dspring.profiles.active=prod -jar /home/root/app.jar"]
