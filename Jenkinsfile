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

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}"
                    sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
}
