pipeline {
    agent {
        label 'docker-agent'
    }

    stages {
        stage('Verification') {
            steps {
                echo "Build is running inside a dynamic Docker agent!"
                sh 'echo "--- Verifying Tools ---"'
                sh 'node --version'
                sh 'docker --version'
            }
        }
    }
}
