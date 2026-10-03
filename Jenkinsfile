pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'les190/retrodoc-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Build Variables') {
            steps {
                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short=7 HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Frontend image tag: ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh '''
                    npm ci
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    npm run lint
                '''
            }
        }

        stage('Tests') {
            steps {
                sh '''
                    npm test
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build \
                        -t "$DOCKER_IMAGE:$IMAGE_TAG" \
                        -t "$DOCKER_IMAGE:latest" \
                        .
                '''
            }
        }

        stage('Docker Push') {
            steps {
                sh '''
                    echo "$DOCKERHUB_CREDENTIALS_PSW" | \
                        docker login \
                        -u "$DOCKERHUB_CREDENTIALS_USR" \
                        --password-stdin

                    docker push "$DOCKER_IMAGE:$IMAGE_TAG"
                    docker push "$DOCKER_IMAGE:latest"

                    docker logout
                '''
            }
        }
    }

    post {
        always {
            sh '''
                rm -rf node_modules
                rm -rf dist
            '''
        }

        success {
            echo "Frontend CI/CD image build passed."
            echo "Image: $DOCKER_IMAGE:$IMAGE_TAG"
        }

        failure {
            echo 'Frontend CI/CD failed.'
        }
    }
}
