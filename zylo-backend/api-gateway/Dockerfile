FROM openjdk:17-jdk-slim
LABEL authors="jas06113"

COPY ["./build/libs/api-gateway-*-SNAPSHOT.jar", "/home/root/app.jar"]

RUN mkdir -p /var/www/api-gateway

ENTRYPOINT ["sh", "-c", "java -XX:+UseSerialGC -XX:+UseContainerSupport -Xms32m -Xmx64m -XX:ActiveProcessorCount=1 -XX:MaxGCPauseMillis=200 -XX:+UseStringDeduplication -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/dump.hprof -Dspring.profiles.active=prod -jar /home/root/app.jar"]
