pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "udoteh/task-api"
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'Tehethan2018', url: 'https://github.com/udoteh/Jenkin-proj.git', branch: 'main'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push Docker Image') {
            when {
                expression { env.DOCKER_USERNAME != null }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker tag $DOCKER_IMAGE $DOCKER_USERNAME/task-api:latest
                        docker push $DOCKER_USERNAME/task-api:latest
                    '''
                }
            }
        }
    }
}
