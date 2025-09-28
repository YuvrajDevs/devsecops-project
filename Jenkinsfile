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
                sh 'npm audit --audit-level=high'
                sh 'npm test'
            }
        }

        // NEW STAGE for OWASP Dependency-Check
        stage('Dependency Scanning') {
            steps {
                echo '--- SCANNING DEPENDENCIES WITH OWASP ---'
                sh '''
                docker run --rm \
                    -v "${WORKSPACE}":/src \
                    -v "${HOME}/.m2":/root/.m2 \
                    owasp/dependency-check:latest \
                    --scan /src --format HTML --out /src/reports --failOnCVSS 7
                '''
            }
            post {
                always {
                    // Save the HTML report as a build artifact
                    archiveArtifacts artifacts: 'reports/dependency-check-report.html', allowEmptyArchive: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
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
        stage('Deploy Locally') {
            steps {
                sh '''
                docker pull ${IMAGE_NAME}:${IMAGE_TAG}
                docker stop devsecops-app || true
                docker rm devsecops-app || true
                docker run -d -p 8081:8080 --name devsecops-app ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
    }
}
