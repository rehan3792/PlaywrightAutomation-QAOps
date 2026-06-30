pipeline {
    agent any

    environment {
        CI = 'true'
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npm run test:jenkins'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])

            junit allowEmptyResults: true, testResults: 'test-results/junit.xml'
        }

        failure {
            echo 'Playwright tests failed'
        }
    }
}
