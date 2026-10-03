pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        DOCKER_IMAGE = 'les190/retrodoc-frontend'
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Version') {
            steps {
                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short=7 HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Frontend version: ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            when {
                branch 'main'
            }

            steps {
                sh '''
                    echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login \
                        -u "$DOCKERHUB_CREDENTIALS_USR" \
                        --password-stdin

                    docker build \
                        -t "$DOCKER_IMAGE:$IMAGE_TAG" \
                        -t "$DOCKER_IMAGE:latest" \
                        .

                    docker push "$DOCKER_IMAGE:$IMAGE_TAG"
                    docker push "$DOCKER_IMAGE:latest"

                    docker logout
                '''
            }
        }

        stage('Trigger Production Deployment') {
            when {
                branch 'main'
            }

            steps {
                build job: 'RetroDoc/retrodoc-devops/main',
                    wait: false,
                    parameters: [
                        string(
                            name: 'BACKEND_VERSION',
                            value: ''
                        ),
                        string(
                            name: 'FRONTEND_VERSION',
                            value: "${env.IMAGE_TAG}"
                        )
                    ]
            }
        }
    }

    post {
        always {
            sh 'rm -rf node_modules || true'
        }

        success {
            echo "Frontend CI completed successfully."
        }

        failure {
            echo "Frontend CI failed."
        }
    }
}