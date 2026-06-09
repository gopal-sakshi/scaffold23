`Istio (or) Istio service mesh`
- dedicated infrastructure layer
- handles communication between microservices
- traffic mgmt          : load balancing, canary deployment
- security              : automatic mLTS encryption for all service to service communication
- observability         : detailed metrics, logs, tracing

<!-- ******************************************************************** -->


kubectl label namespace default istio-injection=enabled --overwrite
- if your namespace has istio sidecar injection enabled
- sidecar containers are automatically added to your PODs alongside your existing containers

`install Istio on Minikube`

minikube delete             <!-- istio service mesh is resource heavy -->
minikube start --driver=docker --cpus=4 --memory=8192

minikube addons enable istio-provisioner
minikube addons enable istio


