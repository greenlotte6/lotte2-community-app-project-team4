FROM openjdk:17-jdk-slim
LABEL authors="jas06113"

COPY ["./build/libs/integrated-services-*-SNAPSHOT.jar", "/home/root/app.jar"]

RUN mkdir -p /var/www/integrated-services

ENTRYPOINT ["java",
  "-XX:+UseG1GC",
  "-XX:+UseContainerSupport",
  "-XX:MaxRAMPercentage=70.0",
  "-XX:InitialRAMPercentage=70.0",
  "-XX:ActiveProcessorCount=1",
  "-XX:MaxGCPauseMillis=200",
  "-XX:+UseStringDeduplication",
  "-XX:+HeapDumpOnOutOfMemoryError",
  "-XX:HeapDumpPath=/tmp/dump.hprof",
  "-Dspring.profiles.active=prod",
  "-jar",
  "app.jar"
]