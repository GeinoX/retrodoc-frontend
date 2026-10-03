pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')

        DOCKER_IMAGE = 'les190/retrodoc-frontend'

        DEVOPS_JOB = 'RetroDoc/retrodoc-devops/main'
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
                    set -eu

                    npm ci
                '''
            }
        }

        stage('Lint') {
            steps {
                sh '''
                    set -eu

                    npm run lint
                '''
            }
        }

        stage('Tests') {
            steps {
                sh '''
                    set -eu

                    npm test
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                    set -eu

                    npm run build
                '''
            }
        }

        stage('Docker Build') {
            when {
                branch 'main'
            }

            steps {
                sh '''
                    set -eu

                    docker build \
                        -t "$DOCKER_IMAGE:$IMAGE_TAG" \
                        -t "$DOCKER_IMAGE:latest" \
                        .
                '''
            }
        }

        stage('Docker Push') {
            when {
                branch 'main'
            }

            steps {
                sh '''
                    set -eu

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

        stage('Trigger Production Deployment') {
            when {
                branch 'main'
            }

            steps {
                script {
                    build(
                        job: env.DEVOPS_JOB,
                        wait: true,
                        parameters: [
                            string(
                                name: 'BACKEND_VERSION',
                                value: 'latest'
                            ),
                            string(
                                name: 'FRONTEND_VERSION',
                                value: env.IMAGE_TAG
                            )
                        ]
                    )
                }
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
            echo "Frontend CI/CD completed successfully."
            echo "Frontend image: $DOCKER_IMAGE:$IMAGE_TAG"
        }

        failure {
            echo 'Frontend CI/CD failed.'
        }
    }
}