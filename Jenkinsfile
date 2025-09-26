pipeline {
    agent {
        label 'docker-agent'
    }

    stages {
        stage('Initialize') {
            steps {
                echo "Build running on a dynamic Docker agent!"
                sh 'whoami'
                sh 'pwd'
            }
        }
    }
}
