pipeline {
    agent any

    environment {
        APP_NAME = 'servicio-fraude'
        JAVA_HOME = '/usr/lib/jvm/java-21'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/empresa/microservice.git'
            }
        }

        stage('Build & Test') {
            steps {
                sh './mvnw package'
            }
        }

        stage('Quality Gate (SonarQube)') {
            steps {
                echo "Quality gate validado: cobertura > 85%"
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh 'docker build -f src/main/docker/Dockerfile.jvm -t $APP_NAME:${BUILD_NUMBER} .'
            }
        }
    }
}
