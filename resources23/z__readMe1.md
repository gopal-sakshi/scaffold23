Skaffold 
- local CI/CD pipeline
- it watches your code
- automatically builds the Docker image
- pushes it straight into Minikube (minikube == AWS EKS cluster)
- manages your Helm deployment

<!-- **************************************************************** -->


`how to run`
start this = containers23-postgres45-1
minikube start
skaffold dev
-- open postman & hit endpoints
-- use k8s commands