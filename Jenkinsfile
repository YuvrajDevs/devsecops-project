pipeline {
    agent {
        label 'docker-agent'
    }

    tools {
        nodejs 'NodeJS-LTS'
    }

    environment {
        DOCKERHUB_USERNAME = 'yuvrajdevs'
        IMAGE_NAME = "${DOCKERHUB_USERNAME}/devsecops-project"
        IMAGE_TAG = "build-${BUILD_NUMBER}"
    }

    stages {
        stage('Build & Test App') {
            steps {
                echo '--- INSTALLING DEPENDENCIES & RUNNING TESTS ---'
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "--- BUILDING DOCKER IMAGE: ${IMAGE_NAME}:${IMAGE_TAG} ---"
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }
    }
}
